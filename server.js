const express = require("express");
const logger = require("morgan");
const monogoose = require("mongoose");
const mongojs = require ("mongojs");
const mongdb = mongojs('workout', ['workouts']);
const path = require("path");


const PORT = process.env.PORT || 3000;

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", {

    useNewUrlParser: true,

    // useFindAndModify: false

});

require("./routes/routes")(app);

app.listen(PORT, () => {
    
    console.log(`App running on port ${PORT}!`);

});