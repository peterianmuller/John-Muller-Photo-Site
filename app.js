const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mysql = require("mysql");
const dotenv = require("dotenv");
dotenv.config();
console.log(`Your user is ${process.env.user}`);

const dbInfo = {
  connectionLimit: 10,
  host: process.env.host,
  user: process.env.user,
  password: process.env.password,
  database: process.env.database
};

let pool = mysql.createPool(dbInfo);

// for parsing application/json
app.use(bodyParser.json());

// for parsing application/xwww-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  pool.query("SELECT * FROM photos", function(error, results, fields) {
    if (error) throw error;
    res.render("photos.ejs", { photos: results });
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
