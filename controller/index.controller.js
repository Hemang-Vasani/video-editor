var sizeOf = require("image-size");
const videoshow = require("videoshow");
const ffmpegPath = require("@ffmpeg-installer/ffmpeg").path;
const ffprobePath = require("@ffprobe-installer/ffprobe").path;
const ffmpeg = require("fluent-ffmpeg");
ffmpeg.setFfmpegPath(ffmpegPath);
ffmpeg.setFfprobePath(ffprobePath);
const fs = require("fs");
const { exec } = require("child_process");
// import model
const Doctor = require("../models/user.model");
const tojson = require("./tojson");
const csv = require("csvtojson");
const aws = require('aws-sdk')
const path = require('path')
const mime = require('mime');
const request = require('request')

const getM = (req, res) => {
  res.render("index");
  // res.render("home");
};
var videoList = {};
var del_img = [];
const addData = async (req, res) => {
  try {

    const doctor = new Doctor(req.body);

    videoList.language = doctor.language;
    if (typeof req.file !== "undefined") {
   
      doctor.image = req.file.key;
    } else {

      doctor.image = "yoga_day_default.png";

    }

    // console.log("file name: > " + req.file.filename);
    await doctor.save((err, docs) => {
      if (err) throw new Error("error in save");
      if (docs) {

        res.send({
          ok: true,
          body: docs,

        });

      }
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};



const uploadImg = async (req, res) => {
  try {

    let file_name;
    if (req.file === "undefined") {
      throw new Error("error in upload img");
    } else {
      file_name = req.file.filename;
      var del_img_path = process.cwd() + "/public/uploads/" + file_name;
      del_img.push(del_img_path);
    }
    setTimeout(() => {

      del_img.forEach((crop_img) => {

        if (fs.existsSync(crop_img)) {
          fs.unlink(crop_img, (err) => {
            if (err) throw err;

          });
        }
      });
      del_img.length = 0;
    }, 20000);

    res.send({
      ok: true,
      result: "res",
      url: "/demo",
      croped_file: file_name,
    });

  } catch (err) {

    res.status(500).json({
      message: err.message,
    });
  }
}

const getData = async (req, res) => {
  try {
    var docs = await Doctor.find().select('-image');
    if (docs) {
      res.status(200).json({
        success: true,
        Data: docs,
      });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const getzsm = async (req, res) => {
  var csvFilePath = __dirname + "/MicroLab_final" + ".csv";
  const jsonObj = await csv().fromFile(csvFilePath);
  var zsmdata = tojson.ZSM(jsonObj, "state");

  res.send({ ok: true, data: zsmdata });
};

const getrm = async (req, res) => {

  var csvFilePath = __dirname + "/MicroLab_final" + ".csv";
  const jsonObj = await csv().fromFile(csvFilePath);

  var rmdata = tojson.RM(jsonObj, req.body.rbm_name);

  res.send({ ok: true, data: rmdata });
};

const gettm = async (req, res) => {


  var csvFilePath = __dirname + "/MicroLab_final" + ".csv";
  const jsonObj = await csv().fromFile(csvFilePath);
  var tmdata = tojson.TM(jsonObj, req.body.rbm_name, req.body.zsm);
 
  res.send({ ok: true, data: tmdata }); 
};

const gethq = async (req, res) => {

  var csvFilePath = __dirname + "/MicroLab_final" + ".csv";
  const jsonObj = await csv().fromFile(csvFilePath);
  var hqdata = tojson.HQ(jsonObj, req.body.rbm_name, req.body.zsm, req.body.rm);
  res.send({ ok: true, data: hqdata });
};

const genVid = async (req, res) => {
  try {


    var matches1 = req.body.start1_base64Data.match(/^data:([A-Za-z-+/]+);base64,(.+)$/)
    var matches2 = req.body.start2_base64Data.match(/^data:([A-Za-z-+/]+);base64,(.+)$/)

      response1 = {};
      response2 = {};

    if (matches1.length !== 3) {
      return new Error('Invalid input string');
    }
    if (matches2.length !== 3) {
      return new Error('Invalid input string');
    }
    response1.type = matches1[1];
    response1.data = new Buffer(matches1[2], 'base64');
    let decodedImg1 = response1;
    let imageBuffer1 = decodedImg1.data;

    response2.type = matches2[1];
    response2.data = new Buffer(matches2[2], 'base64');
    let decodedImg2 = response2;
    let imageBuffer2 = decodedImg2.data;

    let fileName1 = Date.now() + "1.png";
    let fileName2 = Date.now() + "2.png";

    try {
      fs.writeFileSync("./public/uploads/" + fileName1, imageBuffer1, 'utf8');
      fs.writeFileSync("./public/uploads/" + fileName2, imageBuffer2, 'utf8');

    } catch (e) {
      next(e);
    }



    var uid = req.body.uid;

    let user_main_langauge = await Doctor.findOne({ _id: req.body.uid }).select('language');

    var userImg1 = "./public/uploads/" + fileName1;
    var userImg2 = "./public/uploads/" + fileName2;


    //file names: 
    var img_vid_path1 = Date.now() + "_img1.mp4";
    var img_vid_path2 = Date.now() + "_img2.mp4";

    var img_vid = "./public/videos/" + Date.now() + "_img1.mp4";
    var img_vid2 = "./public/videos/" + Date.now() + "_img2.mp4";

    var vid_vid = "./public/videos/" + Date.now() + "_vid.mkv";
    var aud_vid = "./public/videos/" + Date.now() + "_aud.mp4";
    var fil_vid = "./public/videos/" + Date.now() + "_fil.txt";
    var def_vid = user_main_langauge.language + ".mp4";
    var def_aud = "./public/videos/" + user_main_langauge.language + ".mp3";

    var del_vid = [];

    del_vid.push(vid_vid);
    del_vid.push(img_vid);
    del_vid.push(fil_vid);

    file_content = "file " + img_vid_path1 + "\nfile " + def_vid + "\nfile " + img_vid_path2 + "\n";
    fs.writeFileSync(fil_vid, file_content);


    fs.writeFileSync("./public/videos/" +  fileName1 , imageBuffer1, 'utf8');

    console.log("file is " + userImg1)
    var cmd_img = `ffmpeg -loop 1 -i ${userImg1} -c:v libx264 -t 5 -pix_fmt yuv420p -vf scale=1920:1080  ${img_vid}`;
    exec(cmd_img, (error, stdout, stderr) => {
      console.log("img_vid " + img_vid)
      console.log("Process started at cmd_img");
      if (error) {
        console.log("error occurs at cmd_img : " + error);
        // res.send("error: "+ error);
      }
      console.log("success video of img.");

      var cmd_img2 = `ffmpeg -loop 1 -i ${userImg2} -c:v libx264 -t 7 -pix_fmt yuv420p -vf scale=1920:1080  ${img_vid2}`;
      exec(cmd_img2, (error, stdout, stderr) => {
        console.log("img_vid 2" + img_vid2)
        console.log("Process started at cmd_img");
        if (error) {
          console.log("error occurs at cmd_img : " + error);
          // res.send("error: "+ error);
        }


        var cmd_vid = `ffmpeg -safe 0 -f concat -i ${fil_vid} -c copy ${vid_vid}`;
        exec(cmd_vid, (error, stdout, stderr) => {
          console.log("vid_vid " + vid_vid)
          console.log("process started at cmd_vid");
          if (error) {
            console.log("error occurs at cmd_vid: " + error);
            // res.send("error: " + error);
          }


          console.log("success video without audio");
          var cmd_aud = `ffmpeg -i ${vid_vid} -i ${def_aud} -c copy -map 0:v:0 -map 1:a:0 ${aud_vid}`;
          exec(cmd_aud, (error, stdout, stderr) => {
            console.log("process started at smd_auth:" + aud_vid);
            if (error) {
              console.log("error occurs at cmd_aud: " + error);
              // res.send("error: "+ error);
            }
            console.log("aws key is " + aud_vid)
            try {
              const fileContent = fs.readFileSync(aud_vid)
              var aws_key = path.parse(aud_vid).base
              console.log("aws key is " + aws_key)
              var params = {
                Bucket: process.env.S3_BUCKET,
                Key: aws_key,
                Body: fileContent,
                ACL: 'public-read'
                //got buffer by reading file path
              };
              const bucket = new aws.S3({
                accessKeyId: process.env.AWS_ID,
                secretAccessKey: process.env.AWS_SECRET,
                // region: process.env.S3_REGION
              });
              bucket.putObject(params, function (err, data) {
                console.log(err, data);
              });
            } catch (error) {
              console.log(error)
            }
         
            console.log("success video with audio -> deleting");

            res.json({ ok: true, name: aws_key });
              setTimeout(() => {
                console.log("in setinterval video");
                del_vid.forEach(aud_vid => {
                  if (fs.existsSync(aud_vid)) {
                    fs.unlink(aud_vid, (err) => {
                      if (err) throw err;
                      console.log(aud_vid + " was deleted");
                    });
                  }
                });
                del_vid.length = 0;
              }, 300000);
          })
        })
      })
    })

  } catch (error) {
    console.log("error @GEN VID ################################" + error.message);
  }
}

const str = async (req, res) => {
  const data = req.params.url
  res.render('str', { data })
}

const getStream = async (req, res) => {
  const data = req.params.url
  res.render('stream', { data })
}

const stream = async (req, res)=>{
  try {
    const range= req.headers.range
    const url = req.params.url
    if(!range){
      res.send("requies range headers")
    }

    const videopath = `./public/videos/${url}`
    const videosize = fs.statSync(`./public/videos/${url}`).size

    const CHUNK_SIZE = 10 ** 6
    const start = Number(range.replace(/\D/g, ""));
    const end = Math.min(start + CHUNK_SIZE, videosize -1)

    const contentLength = end - start + 1
    const headers = {
      "Content-Range" : `bytes ${start}-${end}/${videosize}`,
      "Accept-Ranges"  : "bytes",
      "Content-Length" : contentLength, 
      "Content-Type" : "video/mp4",
    }
    res.writeHead(206, headers)

    const videoStream = fs.createReadStream(videopath, {start, end})

    videoStream.pipe(res)
  } catch (error) {
    console.log(error.message)
  }
}


//export modules
module.exports = {
  getM,
  addData,
  getData,
  getzsm,
  getrm,
  gettm,
  gethq,
  uploadImg,
  genVid,
  str,
  getStream,
  stream,

};

// VIDEO GENERATION METHOD 1  
// const genVid = (req, res) => {
//   console.log("in genVid");
//   console.log("image " + req.file.filename);
//   console.log("in video post");
//   console.log("file: > " + req.file.path);
//   var imgName = req.file.path;
//   var images = [imgName];

//   var videoOptions = {
//     // output : "./public/images/" + Date.now() + ".mp4",
//     fps: 25,
//     loop: 8,
//     transition: false,
//     videoBitrate: 1024,
//     videoCodec: "libx264",
//     size: "1920x?",
//     audioBitrate: "128k",
//     audioChannels: 2,
//     format: "mp4",
//     pixelFormat: "yuv420p",
//   };
//   var videoname = "./public/videos/" + Date.now() + ".mp4";
//   videoList.video1 = videoname;
//   videoshow(images, videoOptions)
//     .save(videoname)
//     .on("start", function (command) {
//       console.log("Process started for video 1.");
//     })
//     .on("error", function (err, stdout, stderr) {
//       console.error("Error:", err);
//     })
//     .on("end", function (output) {
//       console.error("Video 1 created in: > ", output);
//       console.log("video list" + JSON.stringify(videoList, null, 4));
//       videoList.video2 = "./public/D_videos/" + videoList.language + ".mp4";
//       videoList.audio = "./public/D_videos/" + videoList.language + ".mp3";
//       videoList.video3 = "./public/videos/" + Date.now() + ".mp4";
//       ffmpeg()
//         .addInput(videoList.video2)
//         .addInput(videoList.video1)
//         .on("start", function (command) {
//           console.log("Process started for video 2.");
//         })
//         .on("end", () => {
//           console.log("merge video 2 done: " + videoList.video3);
//           console.log("delete video 1 file");
//           // Assuming that 'path/file.txt' is a regular file.
//           fs.unlink(videoList.video1, (err) => {
//             if (err) throw err;
//             console.log(videoList.video1 + " was deleted");
//           });
//           videoList.video4 = "./public/videos/" + Date.now() + ".mp4";
//           ffmpeg()
//             .addInput(videoList.video3)
//             .addInput(videoList.audio)
//             .on("end", () => {
//               console.log("delete video 3 file");
//               // Assuming that 'path/file.txt' is a regular file.
//               fs.unlink(videoList.video3, (err) => {
//                 if (err) throw err;
//                 console.log(videoList.video3 + " was deleted");
//               });
//               console.log("merge video 3 done: " + videoList.video4);
//               res.json({ ok: true, name: videoList.video4 });
//             })
//             .on("start", function (command) {
//               console.log("Process started for video 3.");
//             })
//             .on("error", (err) =>
//               console.log("error in video 3 : " + err.message)
//             )
//             .saveToFile(videoList.video4);
//         })
//         .on("error", (err) => console.log("error in video 2 : " + err.message))
//         .mergeToFile(videoList.video3);

//       // res.json({ ok: true, name: output });
//     });
//   console.log("exist from video merge");
// };
