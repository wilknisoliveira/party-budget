const PartyModel = require("../models/Party")

const checkPartyBudget = (budget, services) => {
    const priceSum = services.reduce((sum, service) => sum + service.price, 0)

    console.log(priceSum, budget)

    if(priceSum > budget)
        return false
    else
        return true
}

const partyController = {
    create: async(req, res) => {
        try {
            const party = {
                title: req.body.title,
                author: req.body.author,
                description: req.body.description,
                budget: req.body.budget,
                image: req.body.image,
                services: req.body.services
            }

            //Business logic
            //Only add service if has sufficient budget
            if(party.services && !checkPartyBudget(party.budget, party.services)){
                res.status(406).json({msg: "Not acceptable: insufficient budget"})
                return
            }

            const response = await PartyModel.create(party)
            
            res.status(201).json({party, msg: "Party created"})
        } catch (error) {
            console.log(error)
        }
    },

    getAll: async (req, res) => {
        try {
            const response =  await PartyModel.find()

            res.json(response)
        } catch (error) {
            console.log(error)
        }
    },

    get: async (req, res) => {
        try {
            const id = req.params.id
            
            const response = await PartyModel.findById(id)

            if(!response){
                res.status(404).json({msg: "Party not founded"})
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
            const party = {
                title: req.body.title,
                author: req.body.author,
                description: req.body.description,
                budget: req.body.budget,
                image: req.body.image,
                services: req.body.services
            }

            if(party.services && !checkPartyBudget(party.budget, party.services)){
                res.status(406).json({msg: "Not acceptable: insufficient budget"})
                return
            }

            const response = await PartyModel.findByIdAndUpdate(id, party)

            if(!response){
                res.status(404).json({msg: "Party not founded"})
                return
            }

            res.status(200).json({response, msg: "Party updated"})
        } catch (error) {
            console.log(error)
        }
    },

    delete: async(req, res) => {
        try {
            const id = req.params.id
            const response = await PartyModel.findById(id)
            
            if(!response){
                res.status(404).json({msg: "Party not founded"})
                return
            }

            const responseFromDelete = await PartyModel.findByIdAndDelete(id)

            res.status(200).json({responseFromDelete, msg: "Party successfully deleted"})
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = partyController