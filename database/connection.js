const mongoose=require('mongoose')
mongoose.connect('mongodb://localhost:27017/123',{

// mongoose.connect(process.env.DATABASE,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
})

.then(()=>console.log('Database Connected'))
.catch((err)=>console.log(err))