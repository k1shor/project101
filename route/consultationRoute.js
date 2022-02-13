const express=require('express')
const { requireSignin } = require('../controller/authController')
const { postConsultations, consultationsList, consultationDetails,  deleteconsultations, userconsultations } = require('../controller/consultationController')

const router=express.Router()

router.post('/postconsultations', postConsultations)
router.get('/consultationslist',consultationsList)
router.get('/consultationsdetails/:id',consultationDetails)
// router.put('/updateconsultation/:id',updateStatus)
router.delete('/deleteconsultations/:id',deleteconsultations)
router.get('/userconsultations/:userid',userconsultations)

module.exports=router