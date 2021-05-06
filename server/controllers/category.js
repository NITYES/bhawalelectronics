const Category=require('../models/category')
const slugify=require('slugify');
const Product =require('../models/product')
const Sub=require('../models/sub');
const {Capitalize,isValidObjectIds}=require('../helperfunction');
const { isNumber } = require('lodash');


exports.create=async (req,res)=>{

try {
    const {name}=req.body;
    const category=await new Category({name:Capitalize(name),slug:slugify(Capitalize(name," "))}).save();
    res.json(category);

} catch (error) {
    res.status(400).send('Create category failed');
}
       

};


exports.list=async (req,res)=>{

    res.json(await Category.find({}).sort({createdAt:-1}).exec())
    
};


exports.read=async (req,res)=>{
    let category=await Category.findOne({slug:req.params.slug}).exec();
    // res.json(category);

    //find th eproduct based on category
    const products=await Product.find({category})
    .populate('category')
    .populate('postedBy','_id name')
    .exec();
    
    res.json({
        category,
        products
    });
};


exports.update=async (req,res)=>{
    let {name}=req.body;
    name=Capitalize(name);
   let  slug=slugify(Capitalize(name," "))
    try {
        const update=await Category.findOneAndUpdate({slug:req.params.slug},{
            $set:{
                name:name,
                slug:slug
            }
        },{new:true})
           res.json(update)
    } catch (error) {
        res.status(400).send("update failed")
    }
};

exports.remove=async (req,res)=>{
    try {
        const deleted=await Category.findOneAndDelete({slug:req.params.slug})
        res.json(deleted)
    } catch (error) {
        res.status(400).send('delete failed')
    }
};

exports.getSubs=async (req,res)=>{
     if(isValidObjectIds(req.params.field)){
        Sub.find({parent:req.params.field}).exec((err,subs)=>{
            if(err) console.log(err);
            res.json(subs);
        });
     }else{
         Category.findOne({slug:req.params.field}).populate('subCategory').select("subCategory").exec((err,subs)=>{
             if(err) return console.log(err);
             res.json(subs.subCategory)
         })
     }
}

