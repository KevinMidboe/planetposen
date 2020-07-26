const { saveNewVariation, variationSchema } = require('src/variation.js')
const Products = require('src/products');
const products = new Products();

// HELPERS
const handleError = (error, res) => {
  const { message, status, success } = error;

  return res.status(status || 500).send({
    success: success || false,
    message: message || 'Unable to find product.'
  })
}

const handleReturnProduct = (product, res) => {
  return res.send({
    success: true,
    product
  })
}

// ROUTES
const addNewVariationToProduct = async (req, res) => {
  const productId = req.params.id;
  const { variation } = req.body;

  console.log('id: ', productId);
  console.log('variation: ', variation);

  return saveNewVariation(variation)
    .then(newVariation => products.addVariationToProduct(newVariation, productId))
    .then(() => res.send('New relation added to product'))
    .catch(err => handleError(err, res))
}


const getVariationSchema = (req, res) => {
  return variationSchema()
    .then(schema => res.json(schema))
}

module.exports = {
  addNewVariationToProduct,
  getVariationSchema
};
