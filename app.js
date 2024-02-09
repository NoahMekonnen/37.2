const express = require("express")
const shoppingRoutes = require("./Shopping")
const app = express()

app.use(express.json());
app.use("/items", shoppingRoutes)

app.listen(3000, function(){
    console.log("Server starting on port 3000")
})

module.exports = app;