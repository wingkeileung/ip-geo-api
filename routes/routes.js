var appRouter = function (app) {
  app.get("/", function(req, res) {
    res.status(200).send("Welcome to our restful API");
  });

  app.get("/ip/", function (req, res) {
    res.status(200).send("IP To country API");
  })

  app.get("/ip/:ip", function(req, res) {
    var ip = req.params.ip;
    const Ip2cc = require('../index.js');
    const ip2cc = new Ip2cc('./IP2LOCATION-LITE-DB1.CSV');

    let result = ip2cc.lookup(ip)
    res.status(200).send(result);
  })

}

module.exports = appRouter;