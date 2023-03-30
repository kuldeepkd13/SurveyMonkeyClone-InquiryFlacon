const express = require("express")
const {connection} = require("./config/db")
const {userRoute} = require("./route/user.route")
const {auth} = require("./middleware/auth.middleware")
const app = express()


app.use(express.json())
app.use("/users",userRoute)


app.listen(4500,async()=>{

    try {
        await connection
        console.log("Connected to mongoose");
    } catch (error) {
        console.log(error)
        console.log("Not connected to mongoose")
    }
    console.log("server is running at port 4500")
})