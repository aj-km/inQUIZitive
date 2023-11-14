const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");

if (process.env.NODE_ENV !== "production") {
    require("dotenv").config({ path: "backend/config/config.env" });
}
//using middlewares
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cookieParser());

//importing routes
const quizRoutes=require("./routes/quiz");
const user = require("./routes/user");
// const groupsRouter = require('./routes/groups');

//using routes
app.use("/api/v1", user);
app.use("/api",quizRoutes);
// app.use('/groups', groupsRouter);

module.exports = app;