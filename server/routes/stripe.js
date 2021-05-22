const express=require("express");
const router=express.Router();


const{createPayementIntent}=require("../controllers/stripe")


//middleware
const {authCheck}=require('../middlewares/auth')


router.post('/create-payement-intent',authCheck,createPayementIntent)


module.exports=router