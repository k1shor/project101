const express=require('express')
const { postbookings, bookingList, bookingDetails, updateStatus, deletebookings, userbookings } = require('../controller/bookingController')

const router=express.Router()

router.post('/postbookings',postbookings)
router.get('/bookinglist',bookingList)
router.get('/bookingdetails/:id',bookingDetails)
router.put('/updatestatus/:id',updateStatus)
router.delete('/deletebookings/:id',deletebookings)
router.get('/userbookings/:userid',userbookings)

module.exports=router