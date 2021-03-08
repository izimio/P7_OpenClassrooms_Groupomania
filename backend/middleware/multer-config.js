const multer = require('multer') //

const MIME_TYPES = { //dict in order to know the file's extension
     'image/jpg': '.jpg',
     'image/jpeg': '.jpg',
     'image/png': '.png',
     'image/gif': '.gif',
     'image/webp': '.webp'
};

const storage = multer.diskStorage({ 
     destination: (req, file, callback) => { 
          callback(null, 'images') //saving the file inside the "images" file
     },
     filename: (req, file, callback) => { 
          const name = file.originalname.split(' ').join('_').split('.')[0]  // removing the white spaces and replacing them with underscores
          const extension = MIME_TYPES[file.mimetype]
          callback(null, name + "_" + Date.now() + extension) //calling our file with his name + the date in order to avoid any duplicate
     }
})

module.exports = multer({ storage: storage }).single('file') //exporting the module