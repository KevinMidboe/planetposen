<template>
  <main id="content">
    <div class="top-show-sm col-wrap max-width">
      <div class="page-header">
        <h1>Add and edit products</h1>
        <p>Det Andre Teatrets faste stall med utøvere – improvisatorer med lang fartstid og stor kompetanse. De holder kurs for næringslivet, spiller forestillinger på arbeidsplassen din, dukker opp på film og tv, og spiller i nesten samtlige av husets forestillinger.</p>
      </div>
      <div v-if="products && products.length" class="products">
          <product-card v-for="product in products" :product="product" />
      </div>

      <span v-else>
        No products found
      </span>
    </div>
  </main>
</template>

<script>
import ProductCard from '@/components/ui/ProductCard';

export default {
  components: { ProductCard },
  data() {
    return {
      products: []
    }
  },
  created() {
    fetch('http://localhost:30010/api/products')
      .then(resp => resp.json())
      .then(products => this.products = products)
  }
}
</script>

<style lang="scss" scoped>
@import '../styles/variables';

.page-header {
  max-width: 840px;
  margin: auto;
  text-align: center;
}

.products {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 48px 0;

  @include tablet {
    grid-template-columns: 1fr 1fr;
  }
  @include mobile {
    grid-template-columns: 1fr;
  }

  > div {
    padding: 0 32px;

    @include tablet {
      padding: 0 16px;
    }

    @include mobile {
      padding: 0 8px;
    }
  }
}

</style>
