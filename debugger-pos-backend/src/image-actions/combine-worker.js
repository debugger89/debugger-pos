const mergeImg = require("merge-img");
const Jimp = require("jimp");
const FileUtils = require("../utils/FileUtils");
const fs = require("fs");

module.exports = {
  combine_images_add_watermark: async function (
    source_image,
    target_image,
    upload_session_id,
    target_leopard_code,
    nickname,
    res
  ) {
    try {
      fs.unlinkSync("combined_images/" + upload_session_id + ".jpg");
      //console.log("Watermearked file for session exists. Deleting..");
    } catch (err) {
      console.error(
        "combined_images/" +
          upload_session_id +
          ".jpg" +
          " : does not exist to be deleted!"
      );
    }

   // console.log("combine source : " + source_image);
    //console.log("combine target : " + target_image);
    mergeImg([source_image, target_image], { align: "center" }).then((img) => {
      img.write(
        "combined_images/" + upload_session_id + "_temp" + ".jpg",
        callbackmerge
      );
    });

    async function callbackmerge() {
      const ORIGINAL_IMAGE =
        "combined_images/" + upload_session_id + "_temp" + ".jpg";
      const LOGO = "src/img/Logo.png";

      const [image, logo] = await Promise.all([
        Jimp.read(ORIGINAL_IMAGE),
        Jimp.read(LOGO),
      ]);

      logo.resize(image.bitmap.width / 6, Jimp.AUTO);

      const xMargin = (image.bitmap.width * 2) / 100;
      const yMargin = (image.bitmap.width * 2) / 100;

      const X = image.bitmap.width - logo.bitmap.width - xMargin;
      const Y = image.bitmap.height - logo.bitmap.height - yMargin;

      //console.log(" #### Merging the images..")
      image
        .composite(logo, X, Y, [
          {
            mode: Jimp.BLEND_DARKEN,
            opacitySource: 0.1,
            opacityDest: 1,
          },
        ])
        .write(
          "combined_images/" + upload_session_id + "_temp" + ".jpg",
          callbacktext
        );
    }

    function callbacktext() {
      var loadedImage;
     // console.log(" #### Adding text to the images..")
      Jimp.read("combined_images/" + upload_session_id + "_temp" + ".jpg")
        .then(function (image) {
          loadedImage = image;
          return Jimp.loadFont(Jimp.FONT_SANS_16_WHITE);
        })
        .then(function (font) {
          loadedImage
            .print(
              font,
              loadedImage.bitmap.width - 400,
              10,
              target_leopard_code + " - " + nickname
            )
            .write(
              "combined_images/" + upload_session_id + "_temp" + ".jpg",
              callbackwatermark
            );
        })
        .catch(function (err) {
          console.error(err);
        });
    }

    function callbackwatermark() {
      //console.log(" #### Renaming the temp images..")
      fs.rename(
        "combined_images/" + upload_session_id + "_temp" + ".jpg",
        "combined_images/" + upload_session_id + ".jpg",
        callbackconertbase64
      );
    }

    function callbackconertbase64() {
      FileUtils.checkFileExistsRetryingManually(
        "combined_images",
        upload_session_id + ".jpg"
      ).then((fullFilePath) => {
       // console.log(fullFilePath + " :::: EXSISTS !!")
        return res.send({
          status: "success",
          watermarkedImageBase64: FileUtils.convertFileToBase64(fullFilePath),
        });
      });
    }

    //https://www.npmjs.com/package/merge-images
  },
};
