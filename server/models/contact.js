const mongoose=require('mongoose');
const {ObjectId} =mongoose.Schema;


const contactSchema=new mongoose.Schema({
    name:{
        type:String
    },
    email:{
        type:String,
    },
    mobile:{
        type:Number,
        required:true
    },
    cart:{
        type:Array,
        default:[],
    },
    address:String,

},{timestamps:true})

module.exports=mongoose.model('Contact',contactSchema)