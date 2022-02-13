const mongoose=require('mongoose')
// mongoose.connect('mongodb+srv://test:test123@cluster0.2aidv.mongodb.net/property_dealer?authSource=admin&replicaSet=atlas-f9tung-shard-0&w=majority&readPreference=primary&appname=MongoDB%20Compass&retryWrites=true&ssl=true',{

mongoose.connect('mongodb://localhost:27017/realstate',{

// mongoose.connect(process.env.DATABASE,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
})

.then(()=>console.log('Database Connected'))
.catch((err)=>console.log(err))