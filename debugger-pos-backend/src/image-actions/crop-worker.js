const Jimp = require("jimp");
const fs = require("fs");

module.exports = {
  crop_uploaded_image: function (
    file_path,
    crop_coords,
    scale_factors,
    upload_session_id
  ) {
    //scaleFactors
    //("Coordinates for crop : " + JSON.stringify(crop_coords));
    var x =
      (crop_coords.x * scale_factors.naturalWidth) / scale_factors.clientWidth;
    var y =
      (crop_coords.y * scale_factors.naturalHeight) /
      scale_factors.clientHeight;
    var width =
      (crop_coords.width * scale_factors.naturalWidth) /
      scale_factors.clientWidth;
    var height =
      (crop_coords.height * scale_factors.naturalHeight) /
      scale_factors.clientHeight;
    Jimp.read(file_path, (err, image) => {
      if (err) throw err;
      image
        .crop(x, y, width, height) // crop
        .resize(400, Jimp.AUTO)
        .write(
          "cropped_uploaded_files/" + upload_session_id + "_temp",
          callbackrename
        ); // save to cropped img folder
    });

    function callbackrename() {
      fs.rename(
        "cropped_uploaded_files/" + upload_session_id + "_temp",
        "cropped_uploaded_files/" + upload_session_id,
        callbackrenamecomplete
      );
    }

    function callbackrenamecomplete() {
      return true;
    }
  },
};
