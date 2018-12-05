// Imports
require('dotenv').config()
let { SERVER_PORT, SECRET } = process.env
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');

// MiddleWare
const checkForSession = require('./middlewares/checkForSession')

// Controllers
const swag_controller = require('./controller/swag_controller')
const authCtrl = require('./controller//auth_controller')
const cartCtrl = require('./controller/cart_controller')
const searchCtrl = require('./controller/search_controller')

// Define
const app = express();

// USE
app.use(bodyParser.json())
app.use(session({
    secret: SECRET,
    resave: false,
    saveUninitialized: false
}))
app.use(checkForSession)

// GET
app.get('/api/swag', swag_controller.read)

// AUTH
app.get('/api/user', authCtrl.getUser)
app.post('/api/login', authCtrl.login)
app.post('/api/register', authCtrl.register)
app.post('/api/signout', authCtrl.signout)

// CART
app.post('/api/cart', cartCtrl.add)
app.post('/api/cart/checkout', cartCtrl.checkout)
app.delete('/api/cart', cartCtrl.delete)

// SEARCH
app.get('/api/search', searchCtrl.search)

const port = SERVER_PORT;
app.listen(port, () => { console.log(`Im here on ${port}`) })





