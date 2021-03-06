const Sub=require('../models/sub')
const slugify=require('slugify');
const Product=require('../models/product');
const { Capitalize } = require('../helperfunction');


exports.create=async (req,res)=>{

try {
    const {name,parent}=req.body;
    const sub=await new Sub({name:Capitalize(name),parent,slug:slugify(Capitalize(name," "))}).save();
    res.json(sub);

} catch (error) {
    res.status(400).send('Create category failed');
}
};


exports.list=async (req,res)=>{

    res.json(await Sub.find({}).sort({createdAt:-1}).exec())
    
};


exports.read=async (req,res)=>{
    let sub=await Sub.findOne({slug:req.params.slug}).exec();
    // res.json(sub);
            
     //find th eproduct based on sub 
     const products=await Product.find({subs:sub})
     .populate('category')
     .exec();

     res.json({
         sub,
         products
     });
};


exports.update=async (req,res)=>{
    const {name,parent}=req.body;
    try {
        const update=await Sub.findOneAndUpdate(
            {slug:req.params.slug},
            {name:Capitalize(name),parent:parent,slug:slugify(Capitalize(name," "))},
            {new:true})
           res.json(update)
    } catch (error) {
        res.status(400).send("Sub update failed")
    }
};

exports.remove=async (req,res)=>{
    try {
        const deleted=await Sub.findOneAndDelete({slug:req.params.slug})
        res.json(deleted)
    } catch (error) {
        res.status(400).send('Sub delete failed')
    }
};