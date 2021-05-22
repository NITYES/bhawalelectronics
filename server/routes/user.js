const express=require('express');
const router=express.Router();

//middleware
const {authCheck} =require('../middlewares/auth');
const{userCart,getUserCart,emptyCart,saveAddress,saveContact,saveProfile} =require('../controllers/user')

// router.get('/user',(req,res)=>{
//     res.json({
//         data:"hey u hit the user api  end point"
//     })
// })


router.post('/user/cart',authCheck,userCart);
router.get('/user/cart',authCheck,getUserCart);
router.delete('/user/cart',authCheck,emptyCart);
router.post('/user/address',authCheck,saveAddress);
router.post('/user/profile',authCheck,saveProfile);



// routes for non signed user , want to contact with retailer
router.post('/user/contact',saveContact);








module.exports=router;