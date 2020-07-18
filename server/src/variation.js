const Variation = require('schemas/Variation');

const updateVariation = () => {
  return
}

const saveNewVariation = async (variation) => {
  const newVariation = new Variation({
    size: variation.size,
    description: variation.description,
    stock: variation.stock || 0,
    price: variation.price,
    discount: null
  })

  await newVariation.save();
  return newVariation;
}

module.exports = {
  saveNewVariation
}
