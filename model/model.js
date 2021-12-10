const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const todoSchema=new Schema({
    title:{
        type:String,
        required:true
    }, 
    description:String,
    completed:{
        type:Boolean,
        required:true
    }
},{timestamps:true});

module.exports=mongoose.model('Todo',todoSchema);

