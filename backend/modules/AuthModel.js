const mongoose = require("mongoose");
const bcrypt = require("bcryptjs")

const UserSchema = mongoose.Schema(
    {

        name: {
            type: String,
            required: [true, "Add name"]
        }, 

        Email: {
            type: String,
            required: [true, "Please enter email"],
            unique: true,
            trim: true,
            match: [
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                "Please enter a valid email"
            ]
        },

        password: {
            type: String,
            required: [true, "Please enter a password"],
            minLength: [6, "Enter at least 6 characters"],
        },

        phone: {
            type: String,
            default: "+94XXXXXXX"
        }, 

        Address: {
            type: String,
        },
        
        city: {
            type: String,
        },

        district: {
            type: String,
        },
        
    },

    {
        timestamps:true
    }
);

//encrypt pwd
UserSchema.pre("save",async function(next){
if(!this.isModified("password")){
    return next();
}

    //hash pwd
    const salt  = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(this.password, salt);
    this.password = hashPassword;
    next();

})



const User = mongoose.model("User",UserSchema)

module.exports = User;
