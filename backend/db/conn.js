const mongoose = require("mongoose")
require('dotenv').config()

async function main(){
    try{
        mongoose.set("strictQuery", true)

        await mongoose.connect(
            `mongodb+srv://root:${process.env.MONGODB_KEY}@cluster0.5a91n1d.mongodb.net/?retryWrites=true&w=majority`
        )

        console.log("DB connected!")
    } catch(error){
        console.log(`Error: ${error}`)
    }
}

module.exports = main