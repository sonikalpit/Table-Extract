const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
var engines = require("consolidate");
const path = require('path');


var corsOptions = { origin: "http://localhost:8081"}

const app = express();
app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, "/app/view")));
app.set('views', path.join(__dirname + "/app/view"))
app.enable('html', engines.mustache);
app.set('view engine', 'html');

// Upload File Functionality starts

// const uploadpic = require('./app/middleware/uploadpic');
var multer = require('multer');
var uploadpic = multer({
 storage: multer.diskStorage( 
 {
 destination: function (req, file, callback) {
 callback(null, './app/public/');
 },
 filename: function (req, file, callback) { 
 callback(null, "123" + path.extname(file.originalname));
 }
 }) 
 });
 
app.post('/upload', uploadpic.any(), (req, res) => {
 
 console.log(req.files[0]);
 res.send("upload");
})

//Upload File functionality ends

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log("server is running on port " + PORT);
})