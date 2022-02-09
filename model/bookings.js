const mongoose = require('mongoose')

const{ObjectId}=mongoose.Schema

const bookingSchema = new mongoose.Schema({
    property_title:{
        type:String,
        required:true
    },
    property_location:{
        type:String,
        required:true
    },
    property_availability:{
        type:Boolean,
        required:true
    },
    property_price:{
        type:Number,
        required:true
    }, 
    property_status:{
        type:String,
        required:true

    },
    listing_type:{
        type:String,
        required:true
    },
    category:{
        type:ObjectId,
        required:true,
        ref:'Category'
    }, 
    booked_by:{
        type:String,
        required:true
    }
    
},{timestamps:true})

module.exports=mongoose.model('Bookings',bookingSchema)