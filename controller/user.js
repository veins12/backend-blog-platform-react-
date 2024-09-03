// const User = require('../models/blog.model')

const { User } = require("../models/blog.model");

const getLogin =async(req,res)=>{
    const {email,password} = req.body;
    console.log(email,password)
    try {
        const token = await User.matchPasswordAndGenerateToken(email,password);
        // console.log('token',token)
        return res.cookie('token',token).redirect('/');
    }  
    catch(error){
        return res.render("login",{
            error:"Incorrect Email or Password"
        })
    } 
}
const getSignup =async(req,res)=>{
    return res.render("signup");
}
const createSignup = async(req,res)=>{
    const {fullName, email,password}=req.body;
    await User.create({
        fullName,
        email,
        password,
    });
    return res.redirect('/');
}


module.exports={
    getLogin,
    getSignup,
    createSignup,
}