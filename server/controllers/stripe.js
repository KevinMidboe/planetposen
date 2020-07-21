const config = require('../config')
const Stripe = require('stripe')
const stripe = Stripe(config.stripe.secretKey)

const createPaymentIntent = async (req, res) => {
  const { items, currency } = req.body;

  const paymentIntent = await stripe.paymentIntents.create({
    amount: 1009,
    currency: 'NOK'
  })
  console.log('created payment intent:', paymentIntent);

  return res.send({
    publishableKey: config.stripe.publicKey,
    clientSecret: paymentIntent.client_secret 
  })
}

module.exports = {
  createPaymentIntent
}
