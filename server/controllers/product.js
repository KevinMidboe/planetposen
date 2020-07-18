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

const productById = (req, res) => {
  const { id } = req.params;

  if (id != null) {
    return products.getById(id)
      .then(product => handleReturnProduct(product, res))
      .catch(err => handleError(err, res))
  } else {
    return res.status(422).send({
      success: true,
      message: 'Id must be number. Invalid request.'
    })
  }
}

const addNewProduct = (req, res) => {
  const { product } = req.body;

  return products.saveNewProduct(product)
    .then(resp => res.send(resp))
}

module.exports = {
  allProducts,
  productById,
  addNewProduct
};
