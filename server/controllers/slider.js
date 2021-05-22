
const Slider=require('../models/slider')

exports.addSlider=async (req,res)=>{
    const isSlider=await Slider.find().exec();
   
    if(isSlider){
        isSlider.map(slide=>{
            Slider.findByIdAndDelete(slide._id).exec()
        })
    }
    const newSlider=new Slider({
        images:req.body
    })
    newSlider.save((err,saved)=>{
        if(err) return res.json({err:"Image not saved"});
        res.json({msg:"Images saved"})
    })
};


exports.getSlider=async(req,res)=>{

  const images= await Slider.find({}).exec();
  console.log(images)
  res.json(images[0].images)
}