const fs = require("fs");
const path = require("path");

const delay = ms => new Promise(res => setTimeout(res, ms));

module.exports = {
  is_dir: function (path) {
    try {
      var stat = fs.lstatSync(path);
      return stat.isDirectory();
    } catch (e) {
      // lstatSync throws an error if path doesn't exist
      return false;
    }
  },

  checkExistsWithTimeout: function (directory, filePath, timeout) {
    return new Promise(function (resolve, reject) {
     // console.log("Waiting for file : " + filePath);
      var timer = setTimeout(function () {
        watcher.close();
        reject(
          new Error(
            "File did not exists and was not created during the timeout."
          )
        );
      }, timeout);

      fs.access(filePath, fs.constants.R_OK, function (err) {
        if (!err) {
          clearTimeout(timer);
          watcher.close();
          resolve();
        }
      });

      var dir = directory;
      var basename = path.basename(filePath);
      //("Watching basename : " + dir);
      //console.log("Watching dir : " + basename);
      var watcher = fs.watch(dir, function (eventType, filename) {
        if (eventType === "rename" && filename.startsWith(basename)) {
          clearTimeout(timer);
          watcher.close();
          // console.log(
          //   "Uploaded filepath : " + directory + "/" + filename.trim()
          // );
          resolve(directory + "/" + filename.trim());
        }
      });
    });
  },

  checkExistsWithOutTimeout: function (directory, filePath) {
    return new Promise(function (resolve, reject) {
      //("Finding file : " + filePath);

      var dir = directory;
      var basename = path.basename(filePath);
      //console.log("Checking basename : " + basename);
      //console.log("Checking dir : " + dir);
      if (fs.existsSync(directory + "/" + basename.trim())) {
       // console.log("Uploaded filepath : " + directory + "/" + filePath.trim());
        resolve(directory + "/" + filePath.trim());
      }
    });
  },

  checkFileExistsRetryingManually: function (directory, filePath) {
    
    return new Promise(async function (resolve, reject) {
      //console.log("Finding file manually : " + filePath);
     
      var basename = path.basename(filePath);
      //console.log("Checking basename : " + basename);
      for(var i = 0; i< 25; i++){
        await delay(200);
        if (fs.existsSync(directory + "/" + basename.trim())) {
          resolve(directory + "/" + filePath.trim());
        }
      }
    });

    
   
  },

  convertFileToBase64: function (filePath) {
    return fs.readFileSync(filePath, "base64");
  },
};
