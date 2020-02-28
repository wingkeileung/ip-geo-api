const appRouter = function (app) {
  app.get("/", function(req, res) {
    res.status(200).send("Welcome to our restful API")
  })

  app.get("/ip/", function (req, res) {
    res.status(200).send("IP To country API")
  })

  app.get("/ip/:ip", function(req, res) {
    const ip = req.params.ip;
    const Ip2cc = require("../index.js");
    const ip2cc = new Ip2cc("./IP2LOCATION-LITE-DB1.CSV")

    let result = ip2cc.lookup(ip)
    res.status(200).send(result)
  })

  app.get("/ip/2cc/", function(req,res){
    res.status(200).send("IP To country code API")
  })

  app.get("/ip/2cc/:ip", function(req,res){
    const ip = req.params.ip;
    const Ip2cc = require("../index.js");
    const ip2cc = new Ip2cc("./IP2LOCATION-LITE-DB1.CSV")

    let result = ip2cc.lookup(ip)
    res.status(200).send(result.code)
  })

  app.get("*", function(req, res){
    res.status(404).send("Please refer back to documentation");
  });
}

module.exports = appRouter