const mongoose = require("mongoose");
const config = require("config");
const db = config.get("mongoURI");
// const db = config.get("mongoURIDebug");

const connectDB = async () => {
    try{
        await mongoose.connect(db, {
            useNewUrlParser: true, 
            useUnifiedTopology: true
        });
        console.log("Connected to the database!");
    }catch(err){
        console.error("Error: ", err.message);
    }
}

module.exports = connectDB;