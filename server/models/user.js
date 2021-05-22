const mongoose=require('mongoose');
const {ObjectId} =mongoose.Schema;


const userSchema=new mongoose.Schema({
    profilePictures:{},
    name:{
        type:String
    },
    email:{
        type:String,
        required:true,
        index:true,
    },
    role:{
        type:String,
        default:"subscriber",
    },
    cart:{
        type:Array,
        default:[],
    },
    mobile:Number,
    address:String,
    // wishlist:[{type:ObjectId,ref:"Product"}],

},{timestamps:true})

module.exports=mongoose.model('User',userSchema)