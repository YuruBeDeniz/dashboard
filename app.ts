require('dotenv').config();

require("./db");

import express = require('express');

const app = express();

const allRoutes = require("./routes/index.routes");
app.use("/api", allRoutes);

export = app;
