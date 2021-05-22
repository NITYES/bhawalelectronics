const mongoose=require('mongoose');
const {ObjectId}=mongoose.Schema;


const sliderSchema=new mongoose.Schema({
    images:[]
},{capped:true,max:1,size:4000})

module.exports=mongoose.model('Slider',sliderSchema)