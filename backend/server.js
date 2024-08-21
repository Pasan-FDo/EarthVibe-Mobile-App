const express = require("express")
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require("dotenv").config();
const cors = require("cors");
const cookieParser = require("cookie-parser")
const AuthRoutes = require ("./routes/AuthRoutes")


const app = express();

//middleware
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());

app.use(express.urlencoded({extended:false}));

app.use(cors(
    {
        origin: ["http://localhost:8081"],
        credentials: true,
    }
));

//routes
app.use("/api/auth",AuthRoutes)


//DB connection
const PORT = process.env.PORT || 5000;
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(PORT, () =>{
            console.log(`server Running is port ${PORT} 🚀 `);
        })
    })
    .catch((err)=>console.log(err))
