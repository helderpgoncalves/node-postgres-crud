const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
var app = express();
var cors = require("cors");

var corsOptions = {
  origin: "http://localhost:8081",
};

var routes = require("./routes/index");
var pins = require("./routes/pins");

app.set("port", process.env.PORT || 8080);

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// ROUTES
// Reviews
app.get("/api", routes.index);
app.get("/api/pins", pins.getPins);
app.post("/api/pins", pins.getSinglePin);
app.post("/api/pins/use", pins.usePin);
app.delete("/api/pins", pins.deletePin);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
