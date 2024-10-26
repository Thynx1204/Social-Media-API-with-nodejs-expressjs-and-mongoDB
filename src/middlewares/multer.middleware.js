const multer = require("multer");
const path = require("path");
const User = require("../models/user.model");
require('dotenv').config();


const profilStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, process.env.UPLOADS_PATH); 
  },
  filename: async function (req, file, cb) {
    const user = await User.findById(req.user.id)
    const name = user.pseudo.replace(/[^a-zA-Z0-9]/g, "");
    const ext = ".jpg";
    cb(null, name + ext);
  },
});

const postStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, process.env.UPLOADS_POST_PATH); 
  },
  filename: async function (req, file, cb) {
    const user = await User.findById(req.user.id)
    const name = `${user._id}-${Date.now()}`;
    const ext = ".jpg";
    cb(null, name + ext);
  },
});

const fileFilter = (req, file, cb) => {
  const filetypes = /.jpg|.jpeg|.png/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

  if (extname) {
    return cb(null, true);
  } else {
    cb("Error: Images Only!");
  }
};

const uploadProfile = multer({
  storage: profilStorage,
  limits: { fileSize: 1024 * 1024 * 10 },
  fileFilter,
});

const uploadPostPicture = multer({
  storage: postStorage,
  limits: { fileSize: 1024 * 1024 * 10 },
  fileFilter,
});

module.exports =  { uploadProfile, uploadPostPicture };
