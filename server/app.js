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
const applePayController = require('./controllers/applePay.js');
const stripeController = require('./controllers/stripe.js');

app.use(express.json());
// app.use(express.urlencoded());

router.get('/products', productsController.allProducts)
router.get('/product/schema', productsController.getProductSchema)
router.get('/product/:slug', productsController.productBySlug)
router.post('/product', productsController.addNewProduct)

router.get('/variation/schema', variationsController.getVariationSchema)
router.post('/variation/:id', variationsController.addNewVariationToProduct);

router.post('/applepay/validateSession', applePayController.validateSession)
router.post('/applepay/pay', applePayController.pay)
router.post('/stripe/create-payment-intent', stripeController.createPaymentIntent)

app.use("/public", express.static(path.join(__dirname, "public")));
app.use("/dist", express.static(path.join(__dirname, "/../public/dist")));
app.use('/.well-known', express.static(path.join(__dirname, "/../frontend/assets/well-known")));

app.use('/api', router);

app.use('/', (req, res) => res.sendFile(path.join(__dirname + "/../public/index.html")));

console.log(`Planetposen backend running on port: ${PORT}`)
server.listen(PORT);
