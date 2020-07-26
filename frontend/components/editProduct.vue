<template>
  <div>
    <main v-if="!hide">
      <div class="header">
      </div>
      <div class="edit max-width col-wrap">
        <h2>Edit mode</h2>
        <div class="edit-product" v-if="product">
          <h4>Product</h4>
          <div class="row">
            <div class="row-item">
              Name:
              <input v-model="product.name" placeholder="name" />
            </div>
            <div class="row-item">
              Color:
              <color-picker @selectedColor="colorSelected" :color="product.color" />
            </div>
          </div>

          <div class="row">
            <div class="row-item">
              Description:
              <input v-model="product.description" placeholder="description" />
            </div>
            <div class="row-item">
              Image:
              <input v-model="product.image" placeholder="image" />
            </div>
            <div class="row-item">
              Slug (default empty):
              <input v-model="product.urlSlug" placeholder="slug" />
            </div>
          </div>
        </div>

        <div v-if="product && product.variations">
          <h4>Variations</h4>

          <div v-for="(variation, index) in product.variations" class="variation">
            <div class="variation-controls">
              <i class="icon icon--arrow-dropup" @click="moveVariation(variation, -1)"
                 v-if="index != 0"></i>
              <i v-else class="icon"></i>

              <i class="icon icon--close-circle-outline" @click="removeVariation(variation)"></i>

              <i class="icon icon--arrow-dropdown" @click="moveVariation(variation, 1)"
                 v-if="index + 1 < product.variations.length"></i>
              <i v-else class="icon"></i>
            </div>
            <div>
              <div class="row">
                <div class="row-item">
                  Stock:
                  <input v-model="variation.stock" type="number" placeholder="0" min="0" />
                </div>

                <div class="row-item">
                  Price (NOK):
                  <input v-model="variation.price" type="number" placeholder="0.00" min="0" />
                </div>
              </div>

              <div class="row">
                <div class="row-item">
                  Discounted price (empty if none):
                  <input v-model="variation.discount" type="number" placeholder="0.00" min="0" />
                </div>
              </div>

              <div class="row">
                <div class="row-item">
                  Available sizes:
                  <size-picker :sizeVariable.sync="variation.size" />
                </div>
              </div>

              <hr />
            </div>
          </div>

         <Button :small="true" color="yellow" @click="addVariation">
            Add variation
            <i class="add-variation icon icon--add-circle"></i>
          </Button>
         </div>

        <Button :small="true" @click="hide = !hide">Preview</Button>
        <Button :small="true" color="green">Update</Button>
      </div>

      <product v-if="product" :product="product" />
    </main>
    <main v-else>
      <Button @click="hide = !hide" class="pos-abs" :small="true">Close preview</Button>
      <product :product="product" v-if="product" />
    </main>
  </div>
</template>

<script>
import ColorPicker from '@/components/ui/colorPicker';
import SizePicker from '@/components/ui/sizePicker';
import Product from '@/components/ui/product';
import Button from '@/components/ui/Button';

export default {
  components: {
    ColorPicker,
    SizePicker,
    Product,
    Button
  },
  data() {
    return {
      hide: false,
      product: undefined,
      productTemplate: undefined,
      variationTemplate: undefined
    }
  },
  created() {
    document.querySelector('body').style.backgroundColor = 'white';

    const slug = this.$route.params.slug; 
    if (slug) {
      this.getAndSetProductBySlug(this.$route.params.slug);
    } else {
      this.getProductSchema()
    }
  },
  methods: {
    colorSelected(color) {
      this.product.color = color;
    },
    moveVariation(variation, direction) {
      let variations = [ ...this.product.variations ];
      const variationIndex = variations.findIndex(el => el == variation);

      variations = variations.filter(el => el != variation);
      variations.splice(variationIndex + direction, 0, variation);
      this.product.variations = variations;
    },
    removeVariation(variation) {
      this.product.variations = this.product.variations.filter(el => el != variation);
    },
    async addVariation() {
      if (this.variationTemplate == undefined)
        await this.getVariationSchema();
      this.product.variations.push({ ...this.variationTemplate })
    },
    getProductSchema() {
      let url = '/api/product/schema';
      if (window.location.href.includes('localhost'))
        url = 'http://localhost:30010'.concat(url)

      fetch(url)
        .then(resp => resp.json())
        .then(product => this.product = product)
        .then(this.getVariationSchema)
    },
    getVariationSchema() {
      let url = '/api/variation/schema';
      if (window.location.href.includes('localhost'))
        url = 'http://localhost:30010'.concat(url)

      fetch(url)
        .then(resp => resp.json())
        .then(variation => {
          this.variationTemplate = variation;
          if (this.product.variations.length == 0)
            this.product.variations = [{ ...variation }];
        })
    },
    getAndSetProductBySlug(slug) {
      let url = `/api/product/${ slug }`;
      if (window.location.href.includes('localhost'))
        url = 'http://localhost:30010'.concat(url)

      fetch(url)
        .then(resp => resp.json())
        .then(product => this.product = product);
    }
  },
  beforeDestroy() {
    document.querySelector('body').style.backgroundColor = '#19171A';
  }
}
</script>

<style lang="scss" scoped>
.header {
  background-color: var(--color-background);
  width: 100%;
  height: 8rem;
}

h2 {
  margin-bottom: 1rem;
}
.edit > div:not(:first-of-type) {
  margin-top: 0.75rem;
}


.row:not(:first-of-type) {
  margin-top: 0.5rem;
}

.row-item {
  display: flex;
  flex-direction: column;
  display: inline-flex;

  &:not(:first-of-type) {
    margin-left: 0.5rem;
  }
}
.heading {
//  display: block;
}

input {
  border-color: black;
  padding: 0.5rem;
  font-size: 1rem;

  &[type=number] {
    width: 5rem;
  }
}

button {
  margin-top: 0.5rem;
} 

.variation {
  display: flex;
}

.variation-controls {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  margin-right: 1rem;

  .icon {
    font-size: 2em;
    cursor: pointer;
  }
}

.add-variation {
//  font-size: 1.5em;
}

.edit {
  color: var(--color-background);
  margin: 2rem auto;
}
</style>
