const mongoose = require("mongoose")

//Skeleton of the model
const {Schema} = mongoose

const serviceSchema = new Schema({
        name: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        image: {
            type: String,
            required: true
        },
    },
    {timestamps: true}
)

//Create the model
const Service = mongoose.model("Service", serviceSchema)

//The serviceSchema was exported because another model need it
module.exports = {
    Service,
    serviceSchema
}