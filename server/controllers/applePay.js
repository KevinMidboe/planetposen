const fetch = require('node-fetch')
const fs = require('fs')
const path = require('path')
const https = require('https')

const validateWithApple = (appleUrl) => {
  const httpsAgent = new https.Agent({
    rejectUnauthorized: false,
    cert: fs.readFileSync(path.join(__dirname, '../assets/certificate_sandbox.pem')),
    key: fs.readFileSync(path.join(__dirname, '../assets/certificate_sandbox.key'))
  })

  const options = {
    method: 'POST',
    body: JSON.stringify({
      merchantIdentifier: 'merchant.com.planetposen.sandbox',
      domainName: 'planet.kevinmidboe.com',
      displayName: 'Planetposen'
    }),
    agent: httpsAgent
  }

  return fetch(appleUrl, options)
    .then(resp => resp.json())
}

const validateSession = async (req, res) => {
  const { validationURL } = req.body;

  const appleData = await validateWithApple(validationURL)
  return res.json(appleData)
}

const pay = (req, res) => {
  const { payment } = req.body;

  const { token } = payment;
  console.log('payment data: ', token);

  res.send({ approved: true })
}

module.exports = {
  validateSession,
  pay
}
