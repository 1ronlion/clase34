// ************ Require's ************
const express = require('express');
const router = express.Router();
const multer = require('multer')
const path = require ('path')
const admin = require('../middlewares/admin')



// ************ Controller Require ************
const productsController = require('../controllers/productsController');

// ************ MULTER ************

const storage = multer.diskStorage({
  
  destination: function (req, file, cb) {
    cb(null, 'public/images/products')
  },

  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9) + path.extname(file.originalname)
    cb(null, file.fieldname + '-' + uniqueSuffix)

    // const name = file.originalname
    // cb(null, name)

  }

})

const upload = multer({ storage: storage })


/*** GET ALL PRODUCTS ***/ 

router.get('/', productsController.index); 

// /*** CREATE ONE PRODUCT ***/ 

router.get('/create', admin, productsController.create); 
router.post('/create', upload.any(), productsController.store); 


// /*** GET ONE PRODUCT ***/ 

router.get('/detail/:id/', productsController.detail); 

// /*** EDIT ONE PRODUCT ***/ 

router.get('/edit/:id/', admin, productsController.edit); 
router.patch('/edit/:id/',upload.any(), productsController.update); 


// /*** DELETE ONE PRODUCT***/ 
router.delete('/delete/:id', admin, productsController.destroy); 


module.exports = router;
