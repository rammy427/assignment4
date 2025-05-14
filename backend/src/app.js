const express = require("express");
const cors = require("cors");
const checkApiKey = require("./middleware/apiKeyHandler");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const skillRoutes = require("./routes/skillRoutes");
const expRoutes = require("./routes/experienceRoutes");
const edRoutes = require("./routes/educationRoutes");
const pRoutes = require("./routes/portfolioRoutes");
const version = "v1";
const app = express();

app.use(cors(
    {
        origin: "*",
        credentials: false
    }
));

app.use(express.json());
app.use(checkApiKey);
app.use(`/api/${version}/auth`, authRoutes);
app.use(`/api/${version}/users`, userRoutes);
app.use(`/api/${version}/skills`, skillRoutes);
app.use(`/api/${version}/experience`, expRoutes);
app.use(`/api/${version}/education`, edRoutes);
app.use(`/api/${version}/portfolio`, pRoutes);

module.exports = app;