const express = require ("express")
const cors = require("cors")
const conn = require("./db/conn")

const app = express()

const port = 3000

app.use(cors())

app.use(express.json())

conn()

app.listen(port, function(){
    console.log("Server running at port: "+port)
})