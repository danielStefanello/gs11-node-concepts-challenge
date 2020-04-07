const express = require("express");
const cors = require("cors");

const routes = require("./routes");

const logRequests = require("./middlewares/logRequests");
const validateProjectsId = require("./middlewares/validateProjectsId");

const app = express();

app.use(express.json());
app.use(cors());

app.use(logRequests);
app.use("/repositories/:id", validateProjectsId);
app.use(routes);

module.exports = app;
