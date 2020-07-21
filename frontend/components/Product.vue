<template>
  <main role="main" v-if="product">
    <div class="banner padding-bottom--lg" :class="'bg-' + color">
      <div class="banner-content top-show-sm col-wrap max-width">
        <h1>{{ product.name }}</h1>
      </div>
    </div>

    <section class="product padding-top--lg">
      <div class="max-width col-wrap">
        <div class="col-6 image-preview">
          <img :src="product.image" />
        </div>
        <div class="col-6 details">
          <div class="pricing">
            <span class="amount">24.99</span>
            <span class="currency">kr</span>
          </div>

          <p v-if="product.description">{{ product.description }}</p>
          <p v-else class="description">Notatbøkene fra All Pine Press er trykket i Oslo og papir fra Hellefoss Paper AS i Hokksund. (Notatbøkene er uten linjer)</p>

          <div class="stock" v-if="inStock">
            <i class="icon icon--checkmark-circle"></i>
            På lager
          </div>
          <div class="stock soldOut" v-else>
            <i class="icon icon--close-circle"></i>
            Utsolgt
          </div>

          <div class="actions">
          <!-- Variation picker -->

          <!-- Amount picker -->
          <!-- Buy button -->
            <Button color="black" :small="true" @click="addToCart" :scaleRotate="true">Add to cart</Button>
          </div>

          <div class="meta">
            <span class="categories">
              Kategorier:
            </span>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
import Button from '@/components/ui/Button';
import store from '@/store'

export default {
  components: { Button },
  data() {
    return {
      color: Math.random() > 0.5 ? 'yellow' : 'blue',
      inStock: Math.random() > 0.5,
      product: null
    }
  },
  created() {
    document.querySelector('body').style.backgroundColor = 'white';

    const productSlug = this.$route.params.slug

    fetch(`http://localhost:30010/api/product/${ productSlug }`)
      .then(resp => resp.json())
      .then(product => this.product = product);
  },
  methods: {
    addToCart() {
      store.dispatch('cartModule/addItemToCart', { ...this.product });
    }
  },
  beforeDestroy() {
    document.querySelector('body').style.backgroundColor = '#19171A';
  }
}
</script>

<style lang="scss" scoped>
@import '/frontend//styles/spacing';
@import '/frontend//styles/variables';

main {
  color: var(--color-background);
}

section.product {
  overflow: auto;

  @include mobile {
    .col-6 {
      width: 100%;
    }
  }
}

h1 {
  text-align: center;
}

.image-preview img {
  border-radius: 6px;
  width: 100%;
}

.details {
  margin-top: 1rem;
  font-size: 1.3rem;

  > div, > p {
    margin-bottom: 2.25rem;
  }

  .stock {
    padding: 1rem;
    border: 4px solid var(--color-green);
    width: max-content;

    .icon {
      position: relative;
      top: 2px;
      left: -4px;
    }

    &.soldOut {
      border-color: var(--color-pink);
    }
  }

  .pricing {
    font-size: 2rem;
  }
}

</style>
