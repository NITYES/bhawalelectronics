const User=require('../models/user');
const Product=require('../models/product');
const Cart=require('../models/cart');
const Contact=require('../models/contact');


exports.userCart=async (req,res)=>{

   const{cart}=req.body;

   let products=[];

   const user=await User.findOne({email:req.user.email}).exec();

   //check if cart with logged user id already exist
   let cartExistByThis=await Cart.findOne({orderdBy:user._id}).exec();

   if(cartExistByThis){
       cartExistByThis.remove();
   };
   for(let i=0;i<cart.length;i++){
       let object={};
       object.product=cart[i]._id;
       object.count=cart[i].count;
       object.color=cart[i].color;

       const productFromDb=await Product.findOne({_id:cart[i]._id}).select('price').exec();

       object.price=productFromDb.price;

       products.push(object)

   };

   let cartTotal=0;
   for(let i=0;i<products.length;i++){

       cartTotal=cartTotal + products[i].price * products[i].count;

   }

const newCart=await new Cart({
    products:products,
    cartTotal:cartTotal,
    orderdBy:user._id
}).save();

console.log('new cart------>',newCart);
res.status(200).json({ok:true});

}

exports.getUserCart=async (req,res)=>{

const user=await User.findOne({email:req.user.email}).exec();
const cart=await Cart.findOne({orderdBy:user._id}).populate('products.product','_id title price totalAfterDiscount')
.exec();

if(cart){
    const {products,cartTotal,totalAfterDiscount}=cart;
    res.json({products,cartTotal,totalAfterDiscount});

}else{
    res.json({products,cartTotal,totalAfterDiscount});

}


};

exports.emptyCart=async (req,res)=>{

    const user=await User.findOne({email:req.user.email}).exec();
    const cart=await Cart.findOneAndRemove({orderdBy:user._id}).exec();
    res.json(cart)
}

exports.saveAddress=async (req,res)=>{

const userAddress=await User.findOneAndUpdate(
    {email:req.user.email},
    {address:req.body.address})
    .exec();

    res.json({ok:true})

}


exports.saveContact=async (req,res)=>{


    const {contact}=req.body;
const newcontact=await new Contact(contact);
newcontact.save((err,newcontact)=>{
    if(err) return res.status(400).json({msg:err.message});
    if(newcontact){
        res.json({msg:"Thank You.We will contact you soon"})
    }
})

    
    }