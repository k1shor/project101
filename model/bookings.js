const mongoose = require('mongoose')

const{ObjectId}=mongoose.Schema

const bookingSchema = new mongoose.Schema({
    property:{
        type:ObjectId,
        ref:'Property',
        required:true
    },
    status:{
        type:String,
        default:'pending',
        required:true
    },
    totalPrice:{
        type:Number,
        required:true
    },
    user:{
        type:ObjectId,
        ref:'User',
        required:true
    }
    
},{timestamps:true})

module.exports=mongoose.model('Bookings',bookingSchema)