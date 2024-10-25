const express = require("express")

const app = express();
const port = 3000 || process.env.PORT;

const fs = require('fs')
const path = require('path')
const data = require('./data')

const {accounts, users}= data;

// 2nd step
const viewPath = path.join(__dirname, './views');
app.set('views', viewPath)
app.set('view engine', 'ejs')

// 3rd step
const css= path.join(__dirname, './public/css');
const js= path.join(__dirname, './public/js');
app.use(express.static(css))
app.use(express.static(js))

// 4th step
app.get('/', (req, res) => {
    const objj = {
        title: 'Account Summary',
        accounts: accounts
    }
    res.render('index', objj)
})

// 6th step
app.get('/profile', (req, res) => {
    const userobj = {
        user: users[0]
    }
    res.render('profile', userobj)
})

// Add express.urlencoded middleware to handle POST data
app.use(express.urlencoded({ extended: true }));

const accountRoutes= require('./routes/accounts')
app.use('/account', accountRoutes);

const serviceRoutes= require('./routes/services')
app.use('/services', serviceRoutes);

// 5th step
app.listen(port, () => {
    console.log('PS Project Running on port 3000!', port);
})
// https://comic-eel-lpdk--3000.pluralsight.run