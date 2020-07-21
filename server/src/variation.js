const Variation = require('schemas/Variation');
const { nulledSchema } = require('src/utils');

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

const variationSchema = () => {
  const variation = { ...Variation.schema.obj };
  const variationSchema = nulledSchema(variation);

  return Promise.resolve(variationSchema);
}


module.exports = {
  saveNewVariation,
  variationSchema
}
