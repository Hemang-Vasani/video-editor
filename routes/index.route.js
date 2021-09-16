const express = require("express");
const indexR = express.Router();


//import modules
const indexC = require("../controller/index.controller");

//multer
const upload = require("../services/index.user");
 


//apis
indexR.get("/", indexC.getM);
indexR.post('/addData', upload.single('image'), indexC.addData);
indexR.get("/getData", indexC.getData); 
indexR.post("/getzsm", indexC.getzsm);
indexR.post("/getrm", indexC.getrm);
indexR.post("/gettm", indexC.gettm);
indexR.post("/gethq", indexC.gethq);
indexR.post("/uploadImg",upload.single("croppedImage"), indexC.uploadImg);
indexR.post("/genVid",upload.single("img"), indexC.genVid);
indexR.get('/str/:url', indexC.str)
indexR.get('/getStream/:url', indexC.getStream)
indexR.get('/stream/:url', indexC.stream)

indexR.get('/downloadvideo/:url', function(req, res) {
  const file = `./public/videos/${req.params.url}`;
  console.log(file)
  res.download(file);

});


//export modules
module.exports = indexR;