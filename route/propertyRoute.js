const express=require('express')
const { requireSignin } = require('../controller/authController')
const { postProperty, showProperty, findProperty, deleteProperty, updateProperty, listRelated , listBySearch} = require('../controller/propertyController')
const router=express.Router()
const upload=require('../middleware/fileUpload')
const { propertyValidation } = require('../validation')

router.post('/postproperty',requireSignin, upload.single('property_image'), propertyValidation,  postProperty)
router.get('/showproperty',showProperty)
router.get('/findproperty/:id',findProperty)
router.delete('/deleteproperty/:id',requireSignin, deleteProperty)
router.put('/updateproperty/:id',requireSignin, updateProperty)
router.get('/findbycategory/:id', showProperty)
router.get('/property/related/:id',listRelated)
router.post('/list/by/search',listBySearch)



module.exports=router