const Item=require('../models/item')
const slugify=require('slugify');
const Sub=require('../models/sub');
const {Capitalize,isValidObjectIds}=require('../helperfunction');
const { isValidObjectId } = require('mongoose');
const { isNumber } = require('lodash');
//const Product=require('../models/product')


exports.create=async (req,res)=>{

try {
    const {name,parent}=req.body;
    const sub=await new Item({name:Capitalize(name),parent,slug:slugify(Capitalize(name," "))}).save();
    res.json(sub);

} catch (error) {
    res.status(400).send('Item not created ');
}


};

exports.getItemsBySub=async(req,res)=>{



if(isValidObjectIds(req.params.subId)){
    const docs=await Sub.findById({_id:req.params.subId}).populate('item')
    res.json(docs.item)
}else{
    try {
        const docs=await Sub.findOne({slug:req.params.subId}).populate('item')
        res.json(docs.item)
    } catch (error) {
        console.log(error.message)
    }
}



}

exports.list=async (req,res)=>{

    res.json(await Item.find({}).sort({createdAt:-1}).exec())
    
};