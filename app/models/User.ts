import mongoose from "mongoose";
const {Schema,model} = mongoose;
const AddressSchema = new Schema({
    house: { type: String},
    street: { type: String},
    city: { type: String},
    state: { type: String},
    phone: { type: String}
});
const UserSchema =new Schema ({
    email:{type:String,required:true},
    username:{type:String,required:true},
    name:{type:String,required:true},
    cartitems:{type:Array,default:[],required:true},
    address:{type:AddressSchema,default:{}},
    createdAt:{type:Date,default:Date.now},
    updatedAt:{type:Date,default:Date.now},
});
export default mongoose.models.User|| model('User',UserSchema);