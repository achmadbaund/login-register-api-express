const mongoose  = require('mongoose')
const validator = require('validator')
const jwt       = require('jsonwebtoken')
const UserSchema  = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        trim: true
    },
    role:{
        type: String

    },
    password:{
        type:String,
        required:true,
        trim:true,
        minlength: 6,
        validate(value){
            if(validator.isEmpty(value)){
                throw new Error('Please enter your password!')
            }else if(validator.equals(value.toLowerCase(),"password")){
                throw new Error('Password is invalid!')
            }else if(validator.contains(value.toLowerCase(), "password")){
                throw new Error('Password should not contain password!')
            }
        }
    },
    token:{
        type:String
    },
    createdAt:{
        type: Date,
        default: Date.now
    }
});

const User = mongoose.model('users', UserSchema);

module.exports = User;
