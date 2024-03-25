import mongoose from "mongoose";

const testSchema = new mongoose.Schema({
    random:{type:String,unique:true,index:true} ,
    link: String
});
testSchema.index({random:1})
export const test = mongoose.model('test', testSchema);