const mongoose =require("mongoose");

const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
});

const adminSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
});

const User=mongoose.model("User",userSchema);
const Admin=mongoose.model("Admin",adminSchema);

module.exports={User,Admin};
