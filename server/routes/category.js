
const express=require('express');
const router=express.Router();

//import controller function
const {create,
    read,
    update,
    remove,
    list,
    getSubs,
}=require('../controllers/category');

//middleware
const {authCheck,adminCheck}=require('../middlewares/auth');

//routes
router.post('/category',authCheck,adminCheck,create);
router.get('/categories',list);
router.get('/category/:slug',read);
router.put('/category/:slug',authCheck,adminCheck,update);
router.delete('/category/:slug',authCheck,adminCheck,remove);
router.get('/category/subs/:field',getSubs)

module.exports=router;