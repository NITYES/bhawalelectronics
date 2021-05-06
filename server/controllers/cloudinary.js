const cloudinary=require('cloudinary');
const multer=require('multer');
const AWS=require('aws-sdk');

const s3=new AWS.S3({
    accessKeyId:process.env.AWS_ID,
    secretAccessKey:process.env.AWS_SECRET
})



const storage=multer.memoryStorage({
    destination:function(req,file,callback){

    }
})



cloudinary.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET
})


exports.upload= async (req,res,next)=>{

     //upload images to cloudinary
    // let result =await cloudinary.uploader.upload(req.body.image,{
    //     public_id:`${Date.now()}`,
    //     resource_type:'auto'  //jpeg ,png
    // });

    // res.json({
    //     public_id:result.public_id,
    //     url:result.secure_url,
    // })


    //upload image to aws s3 bucket
    const base64Data = new Buffer.from(req.body.image.replace(/^data:image\/\w+;base64,/, ""), 'base64');
    const type = req.body.image.split(';')[0].split('/')[1];
  const params={    
      Bucket:process.env.AWS_BUCKET_NAME,    
      Key:`${Date.now()}.${type}`,   
      ContentEncoding: 'base64',
      ContentType: `image/${type}`,    
      Body:base64Data
  }

    s3.upload(params,(error,data)=>{
        if(error)console.log(error)
        console.log(data)
        res.json({
        public_id:data.key,
        url:data.Location,
    })

    })
    



    
}

exports.remove=  (req,res,next)=>{
    
let image_id=req.body.public_id

cloudinary.uploader.destroy(image_id).then(result=>{
    res.send('ok')
}).catch(err=>{
    res.status(400).json({
        msg:err.message
    })
})
}