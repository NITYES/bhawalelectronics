const express=require('express');
const router=express.Router();

//middleware
const {authCheck,adminCheck} =require('../middlewares/auth');
const{addSlider,getSlider} =require('../controllers/slider')

router.post('/admin/addslider',authCheck,adminCheck,addSlider);
router.get('/getslider',getSlider);










module.exports=router;