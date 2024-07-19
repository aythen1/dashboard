// const multer = require('multer')

// const storage = multer.memoryStorage()
// const multerUploads = multer({ storage }).single('image')

// module.exports = { multerUploads }


const multer = require('multer');

const storage = multer.memoryStorage();

const multerUploads = multer({
  storage: storage,
  limits: {
    fieldSize: 10 * 1024 * 1024, // Aumenta el límite del tamaño del campo a 10MB
  },
}).single('image');

module.exports = { multerUploads };