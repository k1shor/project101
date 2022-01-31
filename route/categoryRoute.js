const express=require('express')
const { requireSignin } = require('../controller/authController')

const { postCategory, showCategories, deleteCategory, categoryDetails, updateCategory} = require('../controller/categoryController')
const router=express.Router()



router.post('/postcategory',requireSignin, postCategory)
router.get('/categorylist', showCategories)
router.delete('/deletecategory/:id',requireSignin, deleteCategory)
router.get('/findCategory/:id', categoryDetails)
router.put('/updateCategory/:id',requireSignin, updateCategory)



module.exports=router
