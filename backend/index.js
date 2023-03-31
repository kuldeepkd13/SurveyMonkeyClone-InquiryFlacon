const express = require("express")
const {connection} = require("./config/db")
const {userRoute} = require("./route/user.route")
const {auth} = require("./middleware/auth.middleware")
const cors = require("cors")
const app = express()
require("dotenv").config()
app.use(cors())
app.use(express.json())
app.use("/users",userRoute)


app.listen(process.env.Port,async()=>{

    try {
        await connection
        console.log("Connected to mongoose");
    } catch (error) {
        console.log(error)
        console.log("Not connected to mongoose")
    }
    console.log(`server is running at port ${process.env.Port}`)
})