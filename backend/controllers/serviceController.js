const {Service: ServiceModel} = require("../models/Service")

const serviceController = {
    create: async(req, res) => {
        try {
            const service = {
                name: req.body.name,
                description: req.body.description,
                price: req.body.price,
                image: req.body.image
            }

            const response = await ServiceModel.create(service)

            res.status(201).json({ response, msg: "Service successfully created"})
        } catch (error) {
            console.log(error)
        }
    },

    getAll: async(req, res) => {
        try {
            const response = await ServiceModel.find()

            //Http status 200 is the msg pattern
            res.json(response)
        } catch (error) {
            console.log(error)
        }
    },

    get: async(req, res) => {
        try {
            const id = req.params.id;
            const response = await ServiceModel.findById(id)
            
            //Avoid a common error from Mongo
            //This error show the status 200 even if the
            //response is null
            if(!response){
                res.status(404).json({msg: "Service not Founded"})
                return
            }

            res.json(response)
        } catch (error) {
            console.log(error)
        }
    },

    update: async(req, res) => {
        try {
            const id = req.params.id

            const service = {
                name: req.body.name,
                description: req.body.description,
                price: req.body.price,
                image: req.body.image
            }

            const response = await ServiceModel.findByIdAndUpdate(id, service)

            if(!response){
                res.status(404).json({msg: "Service not Founded"})
                return
            }

            res.status(200).json({service, msg: "Service successfully updated"})
        } catch (error) {
            console.log(error)
        }
    },

    delete: async(req, res) => {
        try {
            const id = req.params.id
            const response = await ServiceModel.findById(id)

            if(!response){
                res.status(404).json({msg: "Service not founded"})
                return
            }

            const responseFromDelete = await ServiceModel.findByIdAndDelete(id)

            res.status(200).json({responseFromDelete, msg: "Service successfully deleted"})
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = serviceController