const express=require('express')
require('dotenv').config()
const db=require('./database/connection')
const bodyParser=require('body-parser')
const CategoryRoute=require('./route/categoryRoute')
const PropertyRoute=require('./route/propertyRoute')
const AuthRoute=require('./route/authRoute')
const BookingRoute=require('./route/bookingRoute')

const morgan=require('morgan')
const expressValidator=require('express-validator')
const cookieParser=require('cookie-parser')
const cors=require('cors')

const app=express()


//middleware
app.use(bodyParser.json())
app.use('/public/uploads', express.static('public/uploads'))
app.use(morgan('dev'))
app.use(expressValidator())
app.use(cookieParser())
app.use(cors())




//routes
app.use('/api',CategoryRoute)
app.use('/api',PropertyRoute)
app.use('/api',AuthRoute)
app.use('/api',BookingRoute)


const port=process.env.PORT || 5000

// server

app.listen(port,()=>{
    console.log(`Server started on port ${port} successfully`)
})