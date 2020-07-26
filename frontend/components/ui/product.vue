<template>
  <main role="main" v-if="product">
    <div class="banner padding-bottom--lg" :class="'bg-' + product.color">
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
            <span :class="{ sale: selectedVariation.discount }">
              {{ selectedVariation.price }} kr
            </span>
            <span v-if="selectedVariation.discount">
              {{ selectedVariation.discount }} kr</span>
          </div>

          <p v-if="product.description">{{ product.description }}</p>
          <p v-else class="description">Notatbøkene fra All Pine Press er trykket i Oslo og papir fra Hellefoss Paper AS i Hokksund. (Notatbøkene er uten linjer)</p>

          <div class="stock" v-if="selectedVariation.stock > 0">
            <i class="icon icon--checkmark-circle"></i>
            På lager
          </div>
          <div class="stock soldOut" v-else>
            <i class="icon icon--close-circle"></i>
            Utsolgt
          </div>

          <div class="actions">
          <!-- Variation picker -->
            Size:
            <size-picker class="variationPicker" :sizes="availableSizes"
                         @selectedSize="sizeSelected" :sizeVariable="selectedVariation.size" />

          <!-- Amount picker -->

            <div v-if="selectedVariation.stock > 0">
              Quantity:
              <input type="number" value="1" min="1" :max="selectedVariation.stock" />
            </div>
          <!-- Buy button -->

            <Button color="black" :small="true" @click="addToCart" :scaleRotate="true" :disabled="selectedVariation.stock == 0">Add to cart</Button>
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
import SizePicker from '@/components/ui/sizePicker';
import store from '@/store'

export default {
  components: { Button, SizePicker },
  props: {
    product: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      placeholderWidth: '0px',
      availableSizes: undefined,
      selectedVariation: { discount: Math.random() > 0.5 ? true : false }
    }
  },
  beforeMount() {
    this.selectedVariation = this.product.variations[0];

    if (this.product.variations.length)
      this.availableSizes = this.product.variations.map(el => el.size)

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
        if (this.product.variations.length) {
          this.availableSizes = this.product.variations.map(el => el.size)

          if (this.selectedVariation == undefined)
            this.selectedVariation = this.product.variations[0];
        }
      }
    }
  },
  methods: {
    sizeSelected(size) {
      const variationIndex = this.product.variations.findIndex(variation => variation.size == size)
      this.selectedVariation = this.product.variations[variationIndex];
    },
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
    font-size: 3rem;

    & .sale {
      text-decoration: line-through;
      color: gray;
    }
  }
}

button {
  margin-top: 1rem;
}

.variationPicker {
  margin-bottom: 1rem;
}

input {
  border-width: 4px;
  border-color: black;
  padding: 0.5rem;
  font-size: 2rem;
  display: block;

  &[type=number] {
    width: 5rem;
  }
}

</style>
