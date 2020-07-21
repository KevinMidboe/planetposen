const Product = require('schemas/Product');
const Variation = require('schemas/Variation');
const { slugify, nulledSchema } = require('src/utils');

class Products {
  constructor() {
  }

  async addVariationToProduct(variation, id) {
    return Product.findById(id)
      .then(product => {
        product.variations.push(variation);
        return product.save();
      })
  }

  async saveNewProduct(product) {

    const newProduct = new Product({
      name: product.name,
      description: product.description,
      urlSlug: slugify(product.name),
      image: product.image
    })

    return newProduct.save();
  }

  allProducts() {
    return Product.find().populate('variations');
  }

  productSchema() {
    const product = { ...Product.schema.obj };
    const productSchema = nulledSchema(product);

    return Promise.resolve(productSchema);
  }

  getBySlug(slug) {
    return Product.findOne({ urlSlug: slug }).populate('variations');
  }
}

module.exports = Products;
