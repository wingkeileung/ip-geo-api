const express = require("express")
const bodyParser = require("body-parser")
const Ip2cc = require("./cidr2ip.js");
const ip2cc = new Ip2cc("./IP2LOCATION-LITE-DB1.CSV")
const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get("/", function(req, res) {
res.status(200).send("Welcome to our restful API")
})

app.get("/ip/", function (req, res) {
res.status(200).send("IP To country API")
})

app.get("/ip/:ip", function(req, res) {
console.log("start")

let ip = req.params.ip;
let result = ip2cc.lookup(ip)
console.log("end")

res.status(200).send(result)
})

app.get("/ip/2cc/", function(req,res){
res.status(200).send("IP To country code API")
})

app.get("/ip/2cc/:ip", function(req,res){
let ip = req.params.ip;
let result = ip2cc.lookup(ip)
res.status(200).send(result.code)
})

const server = app.listen(3000, function () {
    console.log("app running on port", server.address().port)
})