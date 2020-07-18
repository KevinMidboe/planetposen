const express = require('express');
const app = express();
const router = express.Router();
const server = require('http').Server(app);
const path = require('path');

const mongoose = require('mongoose');
// const MongoStore = require('connect-mongo');
mongoose.promise = global.Promise;
mongoose.connect('mongodb://localhost/planetposen');
mongoose.set('debug', true);

const PORT = 30010;

const productsController = require('./controllers/product.js');
const variationsController = require('./controllers/variation.js');

app.use(express.json());
// app.use(express.urlencoded());

router.get('/products', productsController.allProducts)
router.get('/product/:id', productsController.productById)
router.post('/product', productsController.addNewProduct)

router.post('/variation/:id', variationsController.addNewVariationToProduct);
app.use('/api', router);

console.log(`Planetposen backend running on port: ${PORT}`)
server.listen(PORT);
