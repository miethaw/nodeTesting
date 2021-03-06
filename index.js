const express = require('express')
const app = express();
const { body }= require('express-validator');

const port = 3000
const userRouter= require("./routes/user");
const peopRoutes=require("./routes");
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql');

// app.use("/api",routes);
app.use("/api",peopRoutes);
app.use(cors());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use('/travel-records', userRouter);

db = mysql.createConnection({
    host: '172.104.40.242',
    port:'3306',
    user: 'miemie',
    password:'209851@ungAkn',
    database:'travel'
})

app.listen(port, () => console.log(`Example app listening on port 3000!`))