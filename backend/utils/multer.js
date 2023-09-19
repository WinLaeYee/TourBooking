/* import multer from "multer";
import path from "path";

// const DIR = "../client/public/images/";
const profileImg = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "../public/tour-images");
  },
  filename: (req, file, cb) => {
    // console.log("file are",file)
    cb(
      null,
      file.originalname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

// Check File Type
const filefilter = (req, file, cb) => {
  //Allow ext
  const filetypes = /jpeg|jpg|png|gif/;
  //Check ext
  const extname = filetypes.test(
    path.extname(file.originalname).toLocaleLowerCase()
  );
  //Check mime type
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb("Error: Image Only and Check File type!");
  }
};

const profileImgs = multer({
  storage: profileImg,
  limits: { fileSize: 5000000 },
  fileFilter: filefilter,
}).single("profilePicture");
// module.exports = { profileImgs };
console.log(profileImgs);
export const ProfileData = { profileImgs };
 */

'use strict'

/* const multer = require('multer');
const path = require('path'); */
import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
  destination:(req, file, cb) =>{
    cb(null, 'uploads/');
  },
  filename:(req, file, cb) =>{
    cb(null, new Date().toISOString().replace(/:/g, '-') + '-' + file.originalname)
  }
})

const filefilter = (req, file, cb) =>{
  if(file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg'){
    cb(null , true)
  }else{
    cb(null, false)
  }
}

const upload = multer({storage: storage, filefilter: filefilter});

export default  upload

