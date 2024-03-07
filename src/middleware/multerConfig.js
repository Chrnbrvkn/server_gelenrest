const multer = require('multer');
const sharp = require('sharp');
const fs = require('fs');
const util = require('util');
const mkdir = util.promisify(fs.mkdir);
const path = require('path');

// Хранение файлов в памяти для последующей обработки с помощью sharp
const storage = multer.memoryStorage();

// Фильтр для проверки типов файлов
const fileFilter = (req, file, cb) => {
  if (['image/jpeg', 'image/png', 'image/webp', 'image/jpg'].includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Неподдерживаемый тип файла'), false);
  }
};

// Настройка Multer
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 15 * 1024 * 1024 } // 15 МБ
});

// Определение пути для сохранения обработанных изображений
const getUploadPath = (req) => {
  let baseUploadPath = 'public/uploads/';
  if (req.path.includes('/house')) return path.join(baseUploadPath, 'housesPictures');
  if (req.path.includes('/apart')) return path.join(baseUploadPath, 'apartsPictures');
  if (req.path.includes('/room')) return path.join(baseUploadPath, 'roomsPictures');
  return baseUploadPath; // Путь по умолчанию, если не совпадает ни с одним условием
};

// Middleware для обработки и сохранения изображений
const processAndSaveImage = async (req, res, next) => {
  if (!req.files || req.files.length === 0) return next(); // Пропускаем, если файлы не загружены

  try {
    const uploadPath = getUploadPath(req);
    await mkdir(uploadPath, { recursive: true });

    const processedFilesInfo = await Promise.all(req.files.map(async (file) => {
      const filename = `${file.fieldname}-${Date.now()}.webp`;
      const relativeOutputPath = `/public/uploads/${req.path.includes('/house') ? 'housesPictures' : req.path.includes('/apart') ? 'apartsPictures' : 'roomsPictures'}/${filename}`;
      const outputPath = path.join(uploadPath, filename);

      await sharp(file.buffer)
        .resize(800)
        .toFormat('webp', { quality: 95 })
        .toFile(outputPath);

      return { filename, path: relativeOutputPath };
    }));

    req.processedFiles = processedFilesInfo; // Сохраняем информацию об обработанных файлах в req
    next();
  } catch (error) {
    console.error('Error processing image:', error);
    res.status(500).send('Error processing image');
  }
};

module.exports = { upload, processAndSaveImage };
