const express = require('express')
// var mongodb = require('mongodb'),
//     assert = require('assert');
var Db = require('mongodb').Db,
    Server = require('mongodb').Server;
var bodyParser = require('body-parser')
var cookieParser = require('cookie-parser')
var session = require('express-session')

const app = express()


app.set('view engine', 'jade')

app.use(cookieParser())

// app.use(bodyParser.urlencoded({
//     extended: false
// }))

app.use(bodyParser());

// parse application/json
app.use(bodyParser.json())



app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: true
    }
}))


app.get('/', function (req, res) {
    res.render('index', {
        authenticated: false
    })
});

app.get('/login/:signupEmail', (req, res) => {
    res.render('login', {
        signupEmail: req.params.signupEmail || ''
    })
})

app.get('/signup', (req, res) => {
    res.render('signup')
})

app.post('/signup', (req, res, next) => {

    console.log(req.body)
    // console.log(app.users.insert)
    // app.users.find()
    app.users.insert(req.body, (err, doc) => {
        console.log('doc')
        console.log(doc)
        if (err) return next(err)
        res.redirect('/login/' + doc.ops[0].email)
    })


})

// const server = new mongodb.Server('127.0.0.1', 27017)

// new mongodb.Db('my-website', server).open((err, client) => {
//     if (err) throw err
//     console.log('\033[96m  +  \033[39m connected to mongodb')

//     app.users = new mongodb.Collection(client, 'users')

//     app.listen(3000, () => {
//         console.log('listening at port 3000')
//     });

// })

var db = new Db('my-website', new Server('localhost', 27017));

db.open(function (err, client) {
    if (err) throw err;
    console.log('connected to server');
    app.users = db.collection('users');

    app.listen(3000, () => {
        console.log('listening at port 3000')
    });

});

// Connection URL
// var url = 'mongodb://localhost:27017/myproject';
// Use connect method to connect to the Server
// MongoClient.connect(url, function (err, db) {
//     assert.equal(null, err);
//     console.log("Connected correctly to server");

//     db.close();


//     app.listen(3000, () => {
//         console.log('listening at port 3000')
//     });
// });