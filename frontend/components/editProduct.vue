<template>
  <div>
    <main v-if="!hide">
      <div class="header">
      </div>
      <div class="edit max-width col-wrap">
        <h2>Edit mode</h2>
        <div class="edit-product" v-if="product">
          <h4>Product</h4>
          <input v-model="product.color" placeholder="color" />
          <input v-model="product.name" placeholder="name" />
          <input v-model="product.description" placeholder="description" />
          <input v-model="product.image" placeholder="image" />
          <input v-model="product.slug" placeholder="slug (default: empty)" />
        </div>

        <div v-if="variation">
          <h4>Variations</h4>
          <input v-for="key in Object.keys(variation)" v-model="variation[key]" :placeholder="key" />
        </div>

        <Button :small="true" @click="hide = !hide">Preview</Button>
        <Button :small="true" color="green">Submit new bag</Button>
      </div>

      <product :product="product" />
    </main>
    <main v-else>
      <Button @click="hide = !hide" class="pos-abs" :small="true">Close preview</Button>
      <product :product="product" />
    </main>
  </div>
</template>

<script>
import Product from '@/components/ui/product';
import Button from '@/components/ui/Button';

export default {
  components: { Product, Button },
  data() {
    return {
      hide: false,
      product: undefined,
      variation: undefined
    }
  },
  created() {
    document.querySelector('body').style.backgroundColor = 'white';

    const slug = this.$route.params.slug; 
    if (slug) {
      this.getAndSetProductBySlug(this.$route.params.slug);
    } else {
      this.getProductSchema()
      this.getVariationSchema()
    }
  },
  methods: {
    getProductSchema() {
      let url = '/api/product/schema';
      if (window.location.href.includes('localhost'))
        url = 'http://localhost:30010'.concat(url)

      fetch(url)
        .then(resp => resp.json())
        .then(product => this.product = product);
    },
    getVariationSchema() {
      let url = '/api/variation/schema';
      if (window.location.href.includes('localhost'))
        url = 'http://localhost:30010'.concat(url)

      fetch(url)
        .then(resp => resp.json())
        .then(variation => this.variation = variation);
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

input {
  border-color: black;
  padding: 0.5rem;
  font-size: 1rem;
}

button {
  margin-top: 0.5rem;
} 

.edit {
  color: var(--color-background);
  margin: 2rem auto;
}
</style>
