const express=require('express');
const router=express.Router();

//middleware
const {authCheck} =require('../middlewares/auth');
const{userCart,getUserCart,emptyCart,saveAddress} =require('../controllers/user')

// router.get('/user',(req,res)=>{
//     res.json({
//         data:"hey u hit the user api  end point"
//     })
// })


router.post('/user/cart',authCheck,userCart);
router.get('/user/cart',authCheck,getUserCart);
router.delete('/user/cart',authCheck,emptyCart);
router.post('/user/address',authCheck,saveAddress);







module.exports=router;