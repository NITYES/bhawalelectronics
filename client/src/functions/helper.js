

exports.slugify=(value,obj)=>{
   value.trim(value)
   let splits=[" ","/",".",":",",","-","_","|","\\"];
   let splitter=splits[splits.map(s=>value.includes(s)).indexOf(true)];
   if(obj.join==undefined){
       obj.join=splitter
   }
  if(obj.case==undefined){
   return value.toLowerCase().split(splitter).join(obj.join)

  }
  if(obj.case=="capitalize"){
   return value.toLowerCase().split(splitter).map(s=>s.charAt(0).toUpperCase()+s.slice(1)).join(obj.join)

  }

  if(obj.case=="uppercase"){
   return value.toUpperCase().split(splitter).join(obj.join)

  }


}


exports.countProduct=async(product)=>{
   return product.length
}