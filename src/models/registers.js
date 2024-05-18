const mongoose = require("mongoose");
 const employeeSchema = new mongoose.Schema({
    username: {
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    }

    
 })

 const Register = new mongoose.model("registers", employeeSchema);

 module.exports = Register;