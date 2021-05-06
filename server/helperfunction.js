const _=require("lodash");
const ObjectId=require('mongoose').Types.ObjectId

exports.Capitalize=(value,join)=>{
        value.trim(value)
        let splits=[" ","/",".",":",",","-","_"];
        let splitter=splits[splits.map(s=>value.includes(s)).indexOf(true)];
        if(join==undefined){
            join=splitter
        }

        return value.split(splitter).map(s=>_.capitalize(s)).join(join)

}

function hasNumbers(t)
{
var regex = /\d/g;
return regex.test(t);
}   

exports.isValidObjectIds=(id)=>{

if(ObjectId.isValid(id)){

 if(hasNumbers(id)){
     return true
 }else{
     return false
 }

}

return false

}