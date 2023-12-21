const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let uploadPath = 'public/uploads/';
    if (req.path.includes('/house')) {
      uploadPath += 'housesPictures';
    } else if (req.path.includes('/apart')) {
      uploadPath += 'apartsPictures';
    } else if (req.path.includes('/room')) {
      uploadPath += 'roomsPictures';
    }
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});
const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' ||
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/svg' ||
    file.mimetype === 'image/jpg') {
    cb(null, true);
  } else {
    cb(new Error('Неподдерживаемый тип файла'), false);
  }
};
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
});

module.exports = upload;