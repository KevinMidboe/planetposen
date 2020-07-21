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
          <img v-if="product.image" :src="product.image" />
          <div v-else role="image" aria-label="no image" class="image-placeholder" ref="placeholder">
            <h3>(no image)</h3>
          </div>
        </div>
        <div class="col-6 details">
          <div class="pricing">
            <span :class="{ sale: selectedVariation.discount }">24.99 kr</span>
            <span v-if="selectedVariation.discount">19.99 kr</span>
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
  props: {
    product: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      placeholderWidth: '0px',
      color: Math.random() > 0.5 ? 'yellow' : 'blue',
      inStock: Math.random() > 0.5,
      selectedVariation: { discount: Math.random() > 0.5 ? true : false }
    }
  },
  mounted() {
    setTimeout(this.squareImagePlaceholder, 10);
  },
  // TODO remove
  watch: {
    product: {
      deep: true,
      handler(newVal) {
        if (this.product.color)
          this.color = this.product.color;
        if (newVal.image == '')
          setTimeout(this.squareImagePlaceholder, 10); 
      }
    }
  },
  methods: {
    addToCart() {
      store.dispatch('cartModule/addItemToCart', { ...this.product });
    },
    squareImagePlaceholder() {
      const { placeholder } = this.$refs;
      if (placeholder)
        placeholder.style.height = placeholder.clientWidth + 'px';
    }
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
.image-preview .image-placeholder {
  width: 100%;
  border: 2px solid var(--color-background);
  border-radius: 6px;

  display: flex;
  align-items: center;

  h3 {
    font-style: italic;
    text-align: center;
    width: 100%;
  }
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

    & .sale {
      text-decoration: line-through;
      color: gray;
    }
  }
}

</style>
