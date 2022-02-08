const express=require('express')
const { requireSignin } = require('../controller/authController')
const { categoryValidation} = require('../validation')

const { postCategory, showCategories, deleteCategory, categoryDetails, updateCategory} = require('../controller/categoryController')
const router=express.Router()



router.post('/postcategory',categoryValidation,requireSignin, postCategory)
router.get('/categorylist', showCategories)
router.delete('/deletecategory/:id',requireSignin, deleteCategory)
router.get('/findCategory/:id', categoryDetails)
router.put('/updateCategory/:id', categoryValidation,requireSignin, updateCategory)



module.exports=router
