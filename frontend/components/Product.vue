<template>
  <product v-if="product" :product="product" />
</template>

<script>
import Product from '@/components/ui/product';

export default {
  components: { Product },
  data() {
    return {
      product: null,
    }
  },
  created() {
    document.querySelector('body').style.backgroundColor = 'white';

    const productSlug = this.$route.params.slug

    let url = `/api/product/${ productSlug }`;
    if (window.location.href.includes('localhost'))
      url = 'http://localhost:30010'.concat(url)

    fetch(url)
      .then(resp => resp.json())
      .then(product => this.product = product);
  },
  beforeDestroy() {
    document.querySelector('body').style.backgroundColor = '#19171A';
  }
}
</script>

<style lang="scss" scoped>
</style>
