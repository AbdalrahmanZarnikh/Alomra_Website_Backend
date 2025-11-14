const express =require("express");
const cors=require("cors");
const dotenv=require("dotenv").config();
const app=express();




// Database Connect
const ConnectDB=require("./DB/ConnectDB")

// routes

const OmraRoutes=require("./routes/omraRoutes");
const userRoutes=require("./routes/userRoutes");
const contactsRoutes = require("./routes/contacts")





app.use(cors({
    origin:"*",
    methods:["GET","POST","DELETE","PUT"],
    
}))

// Error MiddleWare
const GolbalError=require("./middlewares/ErrorMiddleware")

// This MiddleWare For body parser
app.use(express.json());

// routes
app.use("/api/omras",OmraRoutes);
app.use("/api/users",userRoutes);
app.use("/api/contacts",contactsRoutes);


// Error MiddleWare
app.use(GolbalError);

app.listen(process.env.PORT,()=>{
    console.log(`listening on port:${process.env.PORT}....`)
    ConnectDB();
})