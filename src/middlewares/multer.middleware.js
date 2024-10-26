const multer = require("multer");
const path = require("path");
const User = require("../models/user.model");


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../uploads"); 
  },
  filename: async function (req, file, cb) {
    const user = await User.findById(req.user.id)
    const uniqueSuffix = user.pseudo.replace(/[^a-zA-Z0-9]/g, "");
    const ext = path.extname(file.originalname);
    cb(null, uniqueSuffix + ext);
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

const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 10 },
  fileFilter,
});

module.exports =  upload;
