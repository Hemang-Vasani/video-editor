const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require("path");
const routesA = require("./routes/index.route");
var server = require('http').Server(app);
const cors = require("cors")
//env
const dotenv = require('dotenv')
dotenv.config();

//body-parser
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ limit: '50mb', type: 'application/json' }));

// app.use(express.json());
// test
//ejs
app.set("view engine", "ejs");
app.set('views', path.join(__dirname, 'views'))

//call index.route.js for all apis
app.use("/", routesA);

//for using js and css as static
// app.use(express.static(path.resolve('./public')));
app.use(express.static(path.join(__dirname + '/public')));



mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
const con = mongoose.connection

con.on('open', () => {
    console.log('connection...')
})

app.use(express.json())


app.listen(process.env.port, () => {
    console.log('server is running : ' + process.env.port);
})

// mongoose.connect(process.env.db_url).then(() => {
// const db = mongoose.connection.db;


const Agenda = require('agenda');
// console.log()

const agenda = new Agenda({
    db: { address: process.env.DB_URL , collection: 'Agenda' },
    useNewUrlParser: true,
    reconnectTries: 60,
    reconnectInterval: 1000
});


agenda.define('crash server', async job => {
    // last_login()
    // server.close(()=>{

    //     console.log("server cloessd")
    // })
    // console.log("agenda called")
});
(async function () {
    // await agenda.start(); // Start Agenda instance
    // await agenda.schedule('in 10 seconds', 'crash server');
    // await agenda.every('1 hours', 'delete db job'); // Run the dummy job in 10 minutes and passing data.
    // await agenda.every('59 minutes', 'last_login noti'); // Run the dummy job in 10 minutes and passing data.

})();
// agenda.on(error, (err, job) => {
//     console.log(err)
// });

// }).catch(err => console.log(err.message))
// divsion:req.body.divsion,
// ZSM:req.body.ZSM,
// RM:req.body.RM,
// TM:req.body.TM,
// HQ:req.body.HQ,
// language: req.body.language,
// Doctorname: req.body.Doctorname,
// hospitalname: req.body.hospitalname,
// hospitaladdress: req.body.hospitaladdress,
// city: req.body.city,
