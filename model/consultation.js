const mongoose = require('mongoose')

const consultationSchema = new mongoose.Schema({
    property_title:{
        type:String,
        required:true
    },
    property_owner:{
        type:String,
        required:true
    },
    consultation_type:{
        type:String,
        required:true
    },
    consultation_with:{
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
        type:String,
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
        type:String,
        required:true,
        ref:'Category'
    }, 
    booked_by:{
        type:String,
        required:true
    },
    property_image:{
        type:String,
        required:true

    },
    
},{timestamps:true})

module.exports=mongoose.model('Consultations',consultationSchema)