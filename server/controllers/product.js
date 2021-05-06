const Product = require("../models/product");
const slugify = require("slugify");
const User = require("../models/user");
const sub = require("../models/sub");
const   Category=require('../models/category')
const   Item=require('../models/item')
const {Capitalize}=require('../helperfunction')



exports.create = async (req, res) => {
  try {
    //add slug to req.body
      let {category,subs,item,title}=req.body;
      const categoryString=await Category.findById({_id:category}).exec();
      const subString=await sub.findById({_id:subs}).exec();
      const itemString=await Item.findById({_id:item}).exec();

        req.body.category=Capitalize(categoryString.name," ");
        req.body.subs=Capitalize(subString.name," ");
        req.body.item=Capitalize(itemString.name," ");
        req.body.title=Capitalize(title) 
        req.body.slug = slugify(req.body.title);

    const newProduct = await new Product(req.body).save();
    res.json(newProduct);
  } catch (error) {
    // res.status(400).send('Create product failed');
    res.status(400).json({
      err: error.message,
    });
  }
};



//update products
exports.update = async (req, res) => {
  try {
const {title}=req.body;
req.body.title=Capitalize(title)
   req.body.slug = slugify(req.body.title);
   

    const updated = await Product.findOneAndUpdate(
      { slug: req.params.slug },
      req.body,
      { new: true }
    );
    res.json(updated);
  } catch (error) {
    // res.status(400).send('Create product failed');
    console.log(error);
    res.status(400).json({
      err: error.message,
    });
  }
};

exports.listAll = async (req, res) => {
  let products = await Product.find({})
    .limit(parseInt(req.params.count))
    .sort([["createdAt", "desc"]])
    .exec();
  res.status(200).json(products);
};

exports.remove = async (req, res) => {
  try {
    const deleted = await Product.findOneAndRemove({
      slug: req.params.slug,
    }).exec();
    res.json(deleted);
  } catch (error) {
    return res.status(400).send("Product delete Failed");
  }
};

exports.read = async (req, res) => {
  const product = await Product.findOne({ slug: req.params.slug })
    .exec();
  res.json(product);   
};

//Without pagination
// exports.list=async (req,res)=>{

//     try {

//         //createdAt/updatedAt, desc/asc, 3
//         const {sort,order,limit}=req.body
//         const products=await Product.find({})
//         .populate('category')
//         .populate('subs')
//         .sort([[sort,order]])
//         .limit(limit)
//         .exec();

//         res.json(products)

//     } catch (error) {
//         console.log(error)
//     }
// }

//with page
exports.list = async (req, res) => {
  try {
    //createdAt/updatedAt, desc/asc, 3
    const { sort, order, page } = req.body;
    const currentPage = page || 1;
    const perPage = 3;
    const products = await Product.find({})
      .skip((currentPage - 1) * 3)
      .sort([[sort, order]])
      .limit(perPage)
      .exec();

    res.json(products);
  } catch (error) {
  }
};

exports.productsCount = async (req, res) => {
  let total = await Product.find({}).estimatedDocumentCount().exec();
  res.json(total);
};

exports.productsCountWithFilter = async (req, res) => {
  const{color,price,star,shipping}=req.body
  let filter=req.body.query;
  filter=filter.split("-").join(" ");
let match={}
  if(color){
    match.color=color
  }
  if(shipping){
    match.shipping=shipping
  }
  if(price){
    match.price={$gte:price[0],$lte:price[1]}
  }
  if(star){
    match.avgRating=star
  }

       let products=await Product.aggregate([
         {$match:{$text:{$search:filter}}},
         { $sort: { score: { $meta: "textScore" } } },
         {$project:{
           color:1,
           shipping:1,
           price:1,
           avgRating:{$floor:{$avg:"ratings.star"}}
         }},
          {$match:{...match}},
          {$count:"total"}
       ])
  let total;
  if(products.length>0){
    total=products[0].total
  }else{
 total=0
  }
  res.json(total);
};


exports.productStar = async (req, res) => {
  const product = await Product.findById(req.params.productId).exec();
  const user = await User.findOne({ email: req.user.email }).exec();
  const { star } = req.body;

  //who is updating?
  //check if currently logged in user have already added rating to this product?
  //
  let existingRatingObject = product.ratings.find(
    (ele) => ele.postedBy.toString() === user._id.toString()
  );

  //if user havent left rating yet, push it
  if (existingRatingObject === undefined) {
    let ratingAdded = await Product.findByIdAndUpdate(
      product._id,
      {
        $push: { ratings: { star: star, postedBy: user._id } },
      },
      { new: true }
    ).exec();
    res.json(ratingAdded);
  } else {
    //if user have already left rating ,update it
    //user have already rated the product
    const ratingUpdated = await Product.updateOne(
      {
        ratings: { $elemMatch: existingRatingObject },
      },
      { $set: { "ratings.$.star": star } },
      { new: true }
    ).exec();

    res.json(ratingUpdated);
  }
};

//list the realted product excluding the product in the view
exports.listRelated = async (req, res) => {
  const product = await Product.findById(req.params.productId).exec();
  const related = await Product.find({
    _id: { $ne: product._id }, //exclude the product in search with _id
    category: product.category,
  })
    .limit(6)
    .exec();

  res.json(related);
};

//search/filter products
//1. if searched using query
const handleQuery = async (req, res) => {
  const{color,price,star,shipping,page,pageSize}=req.body
  let filter=req.body.query;
  filter=filter.split("-").join(" ");
let match={}
  if(color){
    match.color=color
  }
  if(shipping){
    match.shipping=shipping
  }
  if(price){
    match.price={$gte:price[0],$lte:price[1]}
  }
  if(star){
    match.avgRating=star
  }
       let products=await Product.aggregate([
         {$match:{$text:{$search:filter}}},
         { $sort: { score: { $meta: "textScore" } } },
         {$project:{
           title:1,
           color:1,
           shipping:1,
           slug:1,
           price:1,
           description:1,
           images:1,
           ratings:1,
           avgRating:{
             $floor:{$avg:"$ratings.star"}
            }}},
          {$match:{...match}},
          {$skip:(page-1)*pageSize},
         {$limit:pageSize},
       ])

  res.json(products);
};


exports.searchFilters = async (req, res) => {
  const {query}=req.body
  if (query) {
    await handleQuery(req, res);
  }

};

exports.getCategoryCount=async (req,res)=>{
let totalSub=[];

  const totalCount=await Product.aggregate([
    {
      $group:{"_id":"$subs",
      total:{$sum:1}
  }}
  ]);

  totalCount.map(async (s)=>{
    Product.findOne({subs:s._id},{images:1,category:1,subs:1}).exec((err,p)=>{
            totalSub.push({sub:s._id,total:s.total,image:p.images[0]});
            if(totalSub.length==totalCount.length){
              console.log("total subs",totalSub)
              res.json(totalSub);
            }
   })
  })



}