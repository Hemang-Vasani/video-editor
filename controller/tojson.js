const csv = require("csvtojson");

 function ZSM(jsonObj, div) {
  var zsmArray = [];
  if (jsonObj) {
    for (var i = 0; i < jsonObj.length; i++) {
      var obj = jsonObj[i];
      for (var key in obj) {
        if (key === "state") {
          if (!zsmArray.includes(obj[key])) {
            // console.log(obj[key]);
            zsmArray.push(obj[key]);
          }
        }
      }
    }
    // console.log(zsmArray);
    return zsmArray;
  }
};

const RM = function (jsonObj, ZSM) {
  var rmArray = [];
  if (jsonObj) {
    for (var i = 0; i < jsonObj.length; i++) {
      var obj = jsonObj[i];
      for (var key in obj) {
        if (key === "state" && obj[key] === ZSM) {
          if (!rmArray.includes(obj["rm"])) {
            // console.log(obj[key]);
            rmArray.push(obj["rm"]);
          }
        }
      }
    }
    // console.log(zsmArray);
    return rmArray;
  }
};

const TM = function (jsonObj, ZSM, RM) {
  console.log(ZSM,RM)
  var tmArray = [];
  if (jsonObj) {
    for (var i = 0; i < jsonObj.length; i++) {
      var obj = jsonObj[i];
      for (var key in obj) {
        if (key === "state" && obj[key] === ZSM && obj["rm"] === RM) {
          if (!tmArray.includes(obj["te"])) {
              // console.log(obj[key]);
              tmArray.push(obj["te"]);
            }
        }
      }
    }
    // console.log(zsmArray);
    return tmArray;
  }
};

const HQ = function (jsonObj, ZSM, RM, TM) {
  console.log(ZSM, RM, TM)
  var hqArray = [];
  if (jsonObj) {
    for (var i = 0; i < jsonObj.length; i++) {
      var obj = jsonObj[i];
      for (var key in obj) {
        // console.log(key)
        if (key === "state" && obj[key] === ZSM && obj["rm"] === RM && obj["te"] === TM) {
          if (!hqArray.includes(obj["hq"])) {
            console.log(obj[key]);
            hqArray.push(obj["hq"]);
          }
        }
      }
    }
    // console.log(zsmArray);
    return hqArray;
  }
};


module.exports = {
  ZSM,
  RM,
  TM,
  HQ
};
