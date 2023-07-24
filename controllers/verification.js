const multer = require('multer');
const fs = require('fs');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const path = 'public/verification/';
    
    // Creates Directory to the path if it does not exist 
    if (!fs.existsSync(path)) { // found the solution here: https://stackoverflow.com/questions/21194934/node-how-to-create-a-directory-if-doesnt-exist
      fs.mkdirSync(path);
    }
    cb(null, path)
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
})

const upload = multer({ storage: storage })

module.exports = upload