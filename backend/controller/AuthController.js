const asyncHandler = require("express-async-handler")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs");
const User = require("../modules/AuthModel");


const genarateToken = (id) =>{
    return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: "1d"})
}


const registerUser = asyncHandler (async(req,res) =>{
    const {name, Email, password,phone,Address,district,city} = req.body
    //validation
    if(!name || !Email || !password){
        res.status(400)
        throw new Error("Pleace fill in all required filds")
    }
    if(password.length<6){
        res.status(400)
        throw new Error("Password must be up to 6")
    }

    const userExist = await User.findOne({Email})
    if(userExist){
        res.status(400)
        throw new Error("E mail alrady use")
    }

    //create new user
    const user = await User.create(
        {
            name,
            Email,
            password,
            phone,
            Address,
            city,
            district,
            
    })

     //Genarate tokenghghghg
     const token = genarateToken(user._id)

     //sent HTTP-only cookie
     res.cookie("token", token, {
        path:"/",
        httpOnly:true,
        expires: new Date(Date.now()+1000*86400), //1day
        sameSite:"none",
        secure:true

     })

    if(user){
        const {_id, name, Email, password,phone,token,Address,city,district} =user
        res.status(201).json(
            {
                _id,
                name,
                Email,
                password,
                phone,
                Address,
                city,
                district,
                token,
                
            }
        )
    }else {
        res.status(400)
        throw new Error ("Inavalid user data")
    }
});



const loginUser = asyncHandler(
    async(req,res) =>{
        
        const{Email, password} = req.body
        console.log(Email);
        console.log(password);
        //validate
        if(!Email || !password){
            res.status(400)
            throw new Error("Fill this filds")
        }

        //if exist user
        const user = await User.findOne({Email})
        if(!user){
            res.status(400)
            throw new Error("User not exist")
        }

        //user exist check pwd
        const passwordIsCorrect = await bcrypt.compare(password, user.password)

        //Genarate token
        const token = genarateToken(user._id)

        //sent HTTP-only cookie
        res.cookie("token", token, {
            path:"/",
            httpOnly:true,
            expires: new Date(Date.now()+1000*86400), //1day
            sameSite:"none",
            secure:true

        })
        console.log(token);

        if(user &&  passwordIsCorrect){
            const {_id, name, Email, password,phone,token,Address,city,district}=user
            res.status(200).json(
            {
                _id,
                name,
                Email,
                password,
                phone,
                Address,
                city,
                district,
                token,
                
            }
           
        )
        console.log(token);
            
        }else{
            res.status(400)
            throw new Error ("Password incorrect") 
        }


    }
)




const logout = asyncHandler (async(req,res)=>{
    res.cookie("token", "", {
        path:"/",
        httpOnly:true,
        expires: new Date(0), //expire
        sameSite:"none",
        secure:true

    })
    console.log("log out");
    return res.status(200).json({message: "Successfuly log out"});

})


const getAllUser = asyncHandler(async(req, res) =>{
    const user = await User.find()
    res.status(200).json(user)
})



module.exports = {
    registerUser,
    loginUser,
    logout,
    getAllUser,
}