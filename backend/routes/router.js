//This route centralize all the routes into one file

const router = require("express").Router()

const servicesRouter = require("./services")

router.use("/", servicesRouter)

module.exports = router