const express = require("express");

const logger = require("kiki");

const monogoose = require("mongoose");

const PORT = process.env.PORT || 3000;

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.use(express.static("public"));

monogoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", {

    useNewUrlParser: true,

    useFindAndModify: false

});

require("./routes/routes")(app);

app.listen(PORT, () => {
    
    console.log(`App running on port ${PORT}!`);

});