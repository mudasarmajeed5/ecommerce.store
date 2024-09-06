import mongoose from "mongoose";
const {Schema,model,models} = mongoose

const ProductSchema = new Schema({
    title:{type:String,required:true},
    tag:{type:String,required:true},
    price:{type:Number,required:true},
    desc:{type:String,required:true},
    image:{type:String,required:true},
    Stock:{type:Number,required:true},
    isAvailable:{type:Boolean,required:true,default:true},
    id:{type:String,required:true}
})
const ProductsData = models.ProductsData || model("ProductsData", ProductSchema);
export default ProductsData;
