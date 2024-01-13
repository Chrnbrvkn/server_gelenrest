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
  limits: {
    fileSize: 1024 * 1024 * 15 // Максимальный размер файла (здесь 5 МБ)
  }
});

module.exports = upload;

// оптимизация, сжатие картинок
// const sharp = require('sharp');

// multer.diskStorage({
//   // ... ваша текущая настройка ...
//   filename: function (req, file, cb) {
//     const filename = file.fieldname + '-' + Date.now() + path.extname(file.originalname);
//     cb(null, filename);

//     // Изменение размера и сжатие изображения
//     sharp(file.buffer)
//       .resize(800) // Меняем размер до ширины 800px, высота изменится пропорционально
//       .toFormat('jpeg', { quality: 80 }) // Конвертируем в JPEG с качеством 80%
//       .toFile(`public/uploads/${filename}`);
//   }
// });
// изменение формата картинок
// sharp(file.buffer)
//   .toFormat('webp', { quality: 80 })
//   .toFile(`public/uploads/${filename}`);
