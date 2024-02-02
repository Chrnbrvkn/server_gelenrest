const multer = require('multer');
const sharp = require('sharp');
const fs = require('fs');
const util = require('util');
const mkdir = util.promisify(fs.mkdir);
const path = require('path');

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' ||
      file.mimetype === 'image/png' ||
      file.mimetype === 'image/webp' ||
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
    fileSize: 1024 * 1024 * 15 // Ограничение размера файла до 15 МБ
  }
});

const getUploadPath = (req) => {
  let uploadPath = 'public/uploads/';
  if (req.path.includes('/house')) {
    uploadPath += 'housesPictures';
  } else if (req.path.includes('/apart')) {
    uploadPath += 'apartsPictures';
  } else if (req.path.includes('/room')) {
    uploadPath += 'roomsPictures';
  }
  return uploadPath;
};

const processAndSaveImage = async (req, res, next) => {
  if (!req.files || req.files.length === 0) {
    return next(); // Пропускаем middleware, если файлы не загружены
  }

  try {
    const uploadPath = getUploadPath(req);
    await mkdir(uploadPath, { recursive: true });

    await Promise.all(req.files.map(async (file) => {
      const filename = file.fieldname + '-' + Date.now() + '.webp';
      const outputPath = path.join(uploadPath, filename);

      await sharp(file.buffer)
        .resize(800)
        .toFormat('webp', { quality: 80 })
        .toFile(outputPath);

      // Опционально: добавление информации о файле в req для дальнейшего использования
      if (!req.processedFiles) {
        req.processedFiles = [];
      }
      req.processedFiles.push({ filename, path: outputPath });
    }));

    next();
  } catch (error) {
    console.error('Error processing image:', error);
    res.status(500).send('Error processing image');
  }
};

module.exports = { upload, processAndSaveImage };
