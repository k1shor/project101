const express=require('express')
const { requireSignin } = require('../controller/authController')
const { postProperty, showProperties, showProperty,findProperty, deleteProperty, updateProperty, listRelated , listBySearch} = require('../controller/propertyController')
const router=express.Router()
const upload=require('../middleware/fileUpload')
const { propertyValidation } = require('../validation')

router.post('/postproperty',requireSignin, upload.single('property_image'), propertyValidation,  postProperty)
router.get('/showproperty',showProperties)
router.get('/findproperty/:id',findProperty)
router.delete('/deleteproperty/:id',requireSignin, deleteProperty)
router.put('/updateproperty/:id',propertyValidation,requireSignin, updateProperty)
router.get('/findbycategory/:id', showProperty)
router.get('/property/related/:id',listRelated)
router.post('/list/by/search',listBySearch)



module.exports=router