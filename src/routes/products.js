// ************ Require's ************
const express = require('express');
const router = express.Router();

const path = require('path');

// ************ Controller Require ************
const productsController = require('../controllers/productsController');
const upload = require('../middlewares/multer')


/*** GET ALL PRODUCTS ***/

router.get('/', productsController.index);

// /*** CREATE ONE PRODUCT ***/ 

router.get('/create', productsController.create);
router.post('/create', upload.single('image'), productsController.store);


// /*** GET ONE PRODUCT ***/ 

router.get('/detail/:id/', productsController.detail);

// /*** EDIT ONE PRODUCT ***/ 

router.get('/edit/:id/', productsController.edit);
router.patch('/edit/:id/', upload.single('image'), productsController.update);


// /*** DELETE ONE PRODUCT***/ 
router.delete('/delete/:id', productsController.destroy);


module.exports = router;