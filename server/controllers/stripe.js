const User=require('../models/user')
const Product=require('../models/product')
const Cart=require('../models/cart')
const Stripe=require("stripe")(process.env.STRIPE_SECRET)


module.exports.createPayementIntent=async (req,res)=>{


    const payementIntent=await Stripe.payementIntents.create({
            amount:100,
            currency:"INR"
    })


    res.send({
        clientSecret:payementIntent.client_secret
    })
}