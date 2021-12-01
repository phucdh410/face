const fs = require("fs");
const moment = require("moment");

require('./global');

const readFile = function (path) {
  return new Promise((resolve, reject) => {
    fs.readFileSync(path, function (err, data) {
      if (err) {
        console.log("#utils/index - readFile() - error: " + err);
        return reject(err);
      }

      console.log("#utils/index - readFile() - log: " + data);
      return resolve(data);
    });
  });
};

const writeFile = function (path, data) {
  const now = moment(Date.now()).format("YYYYMMDD");
  log = now + ".lg";
  path = "./logs/" + log;

  if (fs.existsSync(path)) {
    // Append new data into log file!
    fs.appendFileSync(path, data, function (err) {
      if (err) {
        console.log("#utils/index - writeFile() - error: " + err);
      }
    });
  } else {
    // Delete old files in log directory!
    deleteFiles(31);

    // Create a new log file!
    fs.writeFileSync(path, data, function (err) {
      if (err) {
        console.log("#utils/index - writeFile() - error: " + err);
      }
    });
  }
};

const deleteFiles = function (expired) {
  const path = global.project + "/logs/";

  fs.readdir(path, function (err, items) {
    if (err) console.log("#utils/index - deleteFiles() - error: " + err);
    else {
      const n = new Date();
      const now = moment(new Date(n.getFullYear(), n.getMonth(), n.getDate()));

      for (var i = 0; i < items.length; i++) {
        const filename = path + "/" + items[i];
        fs.stat(filename, function (err, stats) {
          if (err) {
            console.log("#utils/index - deleteFiles() - error: " + err);
            return;
          }

          //   console.log(filename);
          //   console.log("created: ", new Date(stats["ctime"]));

          const c = new Date(stats["ctime"]);
          const created = moment(
            new Date(c.getFullYear(), c.getMonth(), c.getDate())
          );

          var duration = moment.duration(now.diff(created));
          var days = duration.asDays();
          console.log(Math.floor(days));

          if (days >= expired) {
            fs.unlink(filename, function (err) {
              console.log("#utils/index - readFile() - error: " + err);
            });
          }
        });
      }
    }
  });
};

const getDaysInMonth = function (month, year) {
  return new Date(year, month, 0).getDate();
}

const getMonth = function (myDate) {
  var yy = new Date().getFullYear()
  var fmm = new Date().getMonth() + 1
  if (fmm < 10) {
    fmm = '0' + fmm
  }
  var tmm = new Date().getMonth() + 2
  if (tmm < 10) {
    tmm = '0' + tmm
  }
  return {
    fromDate: moment(new Date(yy + "-" + fmm)).format("YYYY-MM-DD"),
    toDate: moment(new Date(new Date(yy + "-" + tmm).setDate(new Date(yy + "-" + tmm).getDate() - 1))).format("YYYY-MM-DD")
  }
}

async function sleep(millis) {
  return new Promise(resolve => setTimeout(resolve, millis));
}

module.exports = { readFile, writeFile, getDaysInMonth, getMonth, sleep };
