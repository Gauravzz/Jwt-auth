const mongoose  = require("mongoose")
mongoose.connect("mongodb+srv://gaurav:gaurav@cluster0.kvsdij0.mongodb.net/gaurav").then(() => {
    console.log("connection successful");
}).catch((e) => {
    console.log("no connection");
})