
const express=require('express');
const router=express.Router();

//import controller function
const {create,
    list,
    getItemsBySub,
    remove
    
}=require('../controllers/item');

//middleware
const {authCheck,adminCheck}=require('../middlewares/auth');

//routes
router.post('/item',authCheck,adminCheck,create);
router.get('/items',list);
router.get('/items/:subId',getItemsBySub)
// router.get('/sub/:slug',read);
// router.put('/sub/:slug',authCheck,adminCheck,update);
router.delete('/item/:slug',authCheck,adminCheck,remove);


module.exports=router;