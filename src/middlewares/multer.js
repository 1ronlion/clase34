const path = require('path')
const multer = require('multer');

const storage = multer.diskStorage({

    destination: function (req, file, cb) {
        cb(null, 'public/images/products')
    },

    filename: function (req, file, cb) {

        const uniqueSuffix = Date.now() + path.extname(file.originalname)

        cb(null, file.fieldname + '-' + uniqueSuffix)


    }

})

const upload = multer({storage: storage})

module.exports = upload