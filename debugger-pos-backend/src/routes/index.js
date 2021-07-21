var express = require("express");
var router = express.Router();
var fileTools = require("../utils/FileUtils");
var CONFIG = require("../config");

const dbWorker = require("../db/db-worker");
const FileUtils = require("../utils/FileUtils");
const cropWorker = require("../image-actions/crop-worker");
const combineWorker = require("../image-actions/combine-worker");

const fetch = require("node-fetch");
var path = require("path");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index");
});


router.post("/backend/add-products", function (req, res) {
  dbWorker
    .insert_new_product(req.body.data)
    .then((responseData) => {
      return res.send({ results: responseData });
    });
});

router.post("/backend/get-all-products", function (req, res) {
  dbWorker
    .get_all_products()
    .then((responseData) => {
      return res.send({ results: responseData });
    });
});



////////////////////////////////////////////////////////////////////////

router.post("/backend/web/get-images-for-leopard", function (req, res) {
  const fs = require("fs");

  //console.log(JSON.stringify(req.body.relativepath));

  var imgFileList = [];
  var fullFolderPath =
    CONFIG.LEOPARD_IMAGE_FOLDER_RELATIVE + req.body.relativepath;
  try {
    fs.readdirSync(fullFolderPath).forEach((file) => {
      //console.log("File is found " + file);
      var fullFilePath = fullFolderPath + "/" + file;
      // drop the thumbnail.jpg and sub folders
      if (
        !fileTools.is_dir(file) &&
        !file.includes("thumbnail") &&
        !file.includes("front")
      ) {
        // console.log("File is actually a file: " + file);
        imgFileList.push(file);
      }
    });
  } catch (error) {
    console.error(error);
  }

  res.send({ imagefiles: imgFileList });
});

/**
 * Gets all the locations + coordinates for a national park.
 *
 * TODO : Filter by national park. Defaults to Yala
 * Fixed the TODO
 */
router.post("/backend/web/get-locations-in-np", function (req, res) {
  //console.log("National park is : " + JSON.stringify(req.body));

  dbWorker
    .get_all_location_names(req.body.national_park)
    .then((responseData) => {
      return res.send({ matchResults: responseData });
    });
});

/**
 * Gets initial leopard information for the search filter.
 *
 */
router.post("/backend/web/list-leopards-for-filter", function (req, res) {
  dbWorker.list_leopards_for_filter(req.body).then((responseData) => {
    return res.send({ matchResults: responseData });
  });
});

/**
 * Gets initial leopard information for a search query (nickname or codename %LIKE%).
 *
 */
router.post("/backend/web/list-leopards-for-searchquery", function (req, res) {
  dbWorker.list_leopards_for_searchquery(req.body).then((responseData) => {
    return res.send({ matchResults: responseData });
  });
});

/**
 * Gets territory information for a given leopard
 *
 */
router.post(
  "/backend/web/get-territory-for-leopard",
  function (req, res) {
    dbWorker
      .get_territory_for_leopard(req.body.officialnamecode)
      .then((responseData) => {
        return res.send({ matchResults: responseData });
      });
  }
);

/**
 * Gets seen area information for a given leopard
 *
 */
router.post(
  "/backend/web/get-seen-areas-for-leopard",
  function (req, res) {
    dbWorker
      .get_seen_areas_for_leopard(req.body.officialnamecode)
      .then((responseData) => {
        return res.send({ matchResults: responseData });
      });
  }
);

/**
 * Gets location coordinate information for a given national park
 *
 */
router.post(
  "/backend/web/get-all-location-coordinates",
  function (req, res) {
    dbWorker
      .get_all_locaton_coordinates(req.body.national_park)
      .then((responseData) => {
        return res.send({ matchResults: responseData });
      });
  }
);

/**
 * Get ancestory information for a given leopard id.
 *
 */
router.post(
  "/backend/web/get-ancestory-for-leopard",
  function (req, res) {
    dbWorker
      .get_ancestory_for_leopard(req.body.leopard_id)
      .then((responseData) => {
        return res.send({ matchResults: responseData });
      });
  }
);

/**
 * Get all meta information for a given leopard id.
 *
 */
router.post(
  "/backend/web/get-mata-information-for-leopard",
  function (req, res) {
    dbWorker
      .get_mata_information_for_leopard(req.body.officialnamecode)
      .then((responseData) => {
        return res.send({ matchResults: responseData });
      });
  }
);

/**
 * Get all territory coordinate information of all leopards in a given national park
 *
 */
router.post(
  "/backend/web/get-all-leopard-territory-coordinates/:national_park",
  function (req, res) {
    dbWorker
      .get_all_leopard_territory_coordinates(req.params.national_park)
      .then((responseData) => {
        return res.send({ matchResults: responseData });
      });
  }
);

/**
 * Upload image for identifying the leopard
 *
 */
router.post(
  "/backend/web/upload-to-identify/:upload_session_id",
  function (req, res) {
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send("No files were uploaded.");
    }

    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
    let sampleFile = req.files.file;

    // Use the mv() method to place the file somewhere on your server
    sampleFile.mv(
      "uploaded_files/" + req.params.upload_session_id,
      function (err) {
        // console.log(err);
        if (err) return res.status(500).send(err);

        res.send("File uploaded!");
      }
    );
  }
);

/**
 * Wait for the upload image to be completed.
 * Will watch for the file in disk with the correct UUID
 *
 */
router.post(
  "/backend/web/wait-for-file-upload/:upload_session_id",
  function (req, res) {
    try {
      var filePath = req.params.upload_session_id;
      FileUtils.checkExistsWithTimeout("uploaded_files", filePath, 300000).then(
        (fullFilePath) => {
          // console.log("File EXISTS!!!");
          FileUtils.convertFileToBase64(fullFilePath).then((imageAsBase64) => {
            return res.send({
              status: "success",
              filePathInServer: fullFilePath,
              uploadedImageBase64: imageAsBase64,
            });
          });
        }
      );
    } catch (err) {
      //(err);
    }
  }
);

/**
 * Get the uploaded file as abase64 string.
 * Will fetch the file in disk with the correct UUID
 *
 */
router.post(
  "/backend/web/get-uploaded-file/:upload_session_id",
  function (req, res) {
    try {
      var filePath = req.params.upload_session_id;
      FileUtils.checkExistsWithOutTimeout("uploaded_files", filePath).then(
        (fullFilePath) => {
          // console.log("File EXISTS!!!");
          var imageAsBase64 = FileUtils.convertFileToBase64(fullFilePath);
          return res.send({
            status: "success",
            filePathInServer: fullFilePath,
            uploadedImageBase64: imageAsBase64,
          });
        }
      );
    } catch (err) {
      //console.log(err);
      res.status(500).send(error);
    }
  }
);

/**
 *
 * get all female leopards
 *
 */

router.post("/backend/web/get-female-leopards/", function (req, res) {
  //console.log("National park is : " + JSON.stringify(req.body));
  dbWorker.get_all_females(req.body.national_park).then((responseData) => {
    return res.send({ matchResults: responseData });
  });
});

/**
 *
 * insert new leopard
 *
 */
//(responseData) => { return res.send({ matchResults: responseData }) }
router.post("/backend/web/add-leopards", function (req, res) {
  try {
    dbWorker.insert_new_leopard(req.body.leopardData).then((responseData) => {
      var constructedJson = {};
      constructedJson.leopard_id = responseData;
      constructedJson.frequent_zone_id = req.body.locationData.zone;
      constructedJson.lastupdated = req.body.locationData.lastupdated;
      dbWorker.insert_new_leopard_zone(constructedJson).then((responseData) => {
        var allAreas = [];
        for (i = 0; i < req.body.locationData.seenareas.length; i++) {
          var individualLeopardarea = {};
          individualLeopardarea.leopard_id = constructedJson.leopard_id;
          individualLeopardarea.frequent_location_id =
            req.body.locationData.seenareas[i].value;
          allAreas.push(individualLeopardarea);
        }
        dbWorker.insert_new_leopard_seanAreas(allAreas).then((responseData) => {
          return res.send({ matchResults: responseData });
        });
      });
    });
  } catch (error) {
    // console.log("***************************Error captured!!! : " + error);
    res.status(500).send(error);
  }
});

/**
 * Detect and Identify the uploaded image. The crop will be sent by UI
 *
 */
router.post(
  "/backend/web/identify-given-leopard/:upload_session_id",
  function (req, res) {
    //("In method => identify-given-leopard");
    //console.log(JSON.stringify(req.body));
    var jsonRequestData = {};
    // jsonRequestData.crop = req.body.crop;
    var absolute_image_path = path.resolve("cropped_uploaded_files/" + req.params.upload_session_id);
    jsonRequestData.server_image_path = absolute_image_path;
    jsonRequestData.filtered_leopards = req.body.filtered_leopards;
    // jsonRequestData.scale_factors = req.body.scale_factors;
    console.log(JSON.stringify(jsonRequestData));
    (async () => {
      try {
        const response = await fetch(
          CONFIG.PYTHON_BACKEND_SERVER + "/identify-leopard",
          {
            method: "post",
            body: JSON.stringify(jsonRequestData),
            headers: {
              "Content-Type": "application/json",
              Connection: "Keep-Alive",
            },
          }
        );
        const json = await response.json();
        var responseFromPython = json;
        console.log(
          "Response from Python : " + JSON.stringify(responseFromPython)
        );
        return res.send(responseFromPython);
      } catch (error) {
        //console.log("Error captured!!! : " + error);
        res.status(500).send(error);
      }
    })();
  }
);

/**
 *
 * Crop an uploaded image from the user
 *
 */
router.post(
  "/backend/web/identify-given-leopard/:upload_session_id/crop",
  function (req, res) {
    // console.log("In method => identify-given-leopard : CROP ");
    //console.log(JSON.stringify(req.body));

    cropWorker.crop_uploaded_image(
      req.body.serverFilePath,
      req.body.imageCrop,
      req.body.scaleFactors,
      req.params.upload_session_id
    );

    try {
      var filePath = req.params.upload_session_id;
      FileUtils.checkFileExistsRetryingManually(
        "cropped_uploaded_files",
        filePath
      ).then((fullFilePath) => {
        // console.log("CROPPED FILE EXISTS!!!");
        var imageAsBase64 = FileUtils.convertFileToBase64(fullFilePath);
        return res.send({
          status: "success",
          filePathInServer: fullFilePath,
          croppedImageBase64: imageAsBase64,
        });
      });
    } catch (err) {
      //console.log(err);
      res.status(500).send(error);
    }
  }
);

/**
 *
 * Combine source and target images
 *
 */
router.post(
  "/backend/web/identify-given-leopard/:upload_session_id/combine-images",
  function (req, res) {
    // console.log("In method => identify-given-leopard : COMBINE ");
    //console.log(JSON.stringify(req.body));

    try {
      var source = "cropped_uploaded_files/" + req.params.upload_session_id;
      var target =
        CONFIG.LEOPARD_IMAGE_FOLDER_RELATIVE +
        "assets/img/identified-leopards/YALA_NP/" +
        req.body.target_leopard_code +
        "/thumbnail.jpg";
      return combineWorker.combine_images_add_watermark(
        source,
        target,
        req.params.upload_session_id,
        req.body.target_leopard_code,
        req.body.nickname,
        res
      );
    } catch (err) {
      //(err);
      res.status(500).send(error);
    }
  }
);

module.exports = router;
