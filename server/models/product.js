const mongoose=require('mongoose');
const {ObjectId}=mongoose.Schema;
const Item=require('./item')

const productSchema=new mongoose.Schema({

    title:{
        type:String,
        trim:true,
        required:true,
        maxlength:100,
    },
    slug:{
        type:String,
        unique:true,
        lowercase:true,
    },
    description:{
        type:String,
        required:true,
        maxlength:2000,
    },

    details:{
        type:String,
        required:true,
        maxlength:2000,
    },
    price:{
        type:Number,
        required:true,
        maxlength:32,
    },
    category:{
       type:String,
    },
    subs:{
        type:String,
    },
    item:{
        type:String,
    },
    quantity:{
        type:Number
    },
    sold:{
        type:Number,
        default:0,
    },
    images:{
        type:Array
    },
    shipping:{
        type:String,
        enum:['Yes','No']
    },
    color:{
        type:String,
        enum:["Black","Brown","Silver","White","Blue",'Red']
    },
    brand:{
        type:String,
        enum:["HP","Asus","Samsung","Lenovo","Microsoft",'Apple',"LG"]
    },
    ratings:[
        {
            star:Number,
            postedBy:{
                type:ObjectId,
                ref:"User"
            }
        }
    ]
},{timestamps:true})


productSchema.index({
    title:"text",
    description:"text",
    details:"text",
    category:"text",
    subs:"text",
    item:"text"
},{weights:{
    title:9,
    description:7,
    details:2,
    item:5,
    category:4,
    subs:6 
}})    



module.exports=mongoose.model('Product',productSchema)