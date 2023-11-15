const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");

if (process.env.NODE_ENV !== "production") {
    require("dotenv").config({ path: "backend/config/config.env" });
}

//using middlewares
//Used for parsing req data/object
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cookieParser());

//importing routes
const quizRoutes = require("./routes/quiz");
const userRoutes = require("./routes/user");

//using routes
app.use("/api/v1", userRoutes);
app.use("/api", quizRoutes);

module.exports = app;