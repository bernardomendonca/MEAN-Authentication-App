// BRINGING ON ALL THE DEPENDENCIES
const express    = require("express");
const path       = require("path");
const bodyParser = require("body-parser"); // parsers incoming request bodies. to "grab" the data.
const cors       = require("cors");
const passport   = require("passport");
const mongoose   = require("mongoose");
const config     = require("./config/database");


// CONNECTING THE DATABASE CONFIGURATION FOR MONGOOSE
mongoose.connect(config.database, {useNewUrlParser: true});

// ON CONNECTION
mongoose.connection.on('connected', function(){
    console.log('connected to database ' + config.database);
})

mongoose.connection.on('error', function(err){
    console.log('Database error: ' + err);
})

// INITIALIZING THE APP
const app = express();
const port = 3000;
const users = require("./routes/users");

// CORS middleware
app.use(cors());

// STATIC FOLDER
app.use(express.static(path.join(__dirname, "public")));

// BODYPARSER middleware
app.use(bodyParser.json());

// PASSPORT MIDDLEWARE
app.use(passport.initialize());
app.use(passport.session());

require("./config/passport")(passport);

// 
app.use("/users", users);

// INDEX ROUTE
app.get("/", function(req, res){
    res.send("invalid endpoit");
});

// CALLING A LISTEN FUNCTION - STARTING THE SERVER
app.listen(port, function(){
    console.log("Server has started");
});



// CALLING A LISTEN FUNCTION - STARTING THE SERVER  - IF ON CLOUD9
// app.listen(process.env.PORT, process.env.IP, function(){
//     console.log("Server has started");
// });