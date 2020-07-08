require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const {CLIENT_ORIGIN} = require("./config")
const helmet = require("helmet");
const { NODE_ENV } = require("./config");
// const validateBearerToken = require("./validate-bearer-token");
// const loginAuth = require("./login/login")
const errorHandler = require("./error-handler");
const streamlineRouter = require("./streamline/streamline-router");

const app = express();

app.use(
    morgan(NODE_ENV === "production" ? "tiny" : "common", {
        skip: () => NODE_ENV === "test",
    })
);
app.use(
    cors({
        origin: CLIENT_ORIGIN
    })
);
app.use(helmet());

// ONE OR THE OTHER
// app.use(validateBearerToken);
// app.use(loginAuth);

app.use(streamlineRouter);

app.get("/", (req, res) => {
    res.send("Hello, world!");
});

app.use(errorHandler);

module.exports = app;