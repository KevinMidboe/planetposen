const Products = require('src/products.js')
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
const allProducts = (req, res) => {
  return products.allProducts()
    .then(products => res.json(products))
}

const productBySlug = (req, res) => {
  const { slug } = req.params;

  if (slug != null) {
    return products.getBySlug(slug)
      .then(product => res.json({ ...product._doc }))
      .catch(err => handleError(err, res))
  } else {
    return res.status(422).send({
      success: true,
      message: 'Product slug name must be included. Invalid request.'
    })
  }
}

const addNewProduct = (req, res) => {
  const { product } = req.body;

  return products.saveNewProduct(product)
    .then(resp => res.send(resp))
}

const getProductSchema = (req, res) => {
  return products.productSchema()
    .then(schema => res.json(schema))
}

module.exports = {
  allProducts,
  productBySlug,
  addNewProduct,
  getProductSchema
};
