//This route centralize all the routes into one file

const router = require("express").Router()

const servicesRouter = require("./services")

const partiesRouter = require("./parties")

router.use("/", servicesRouter)

router.use("/", partiesRouter)

module.exports = router