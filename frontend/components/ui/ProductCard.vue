<template>
  <div class="product-card">
    <div class="product-card-container">

      <div class="image">
        <img :src="product.image" />
      </div>

      <div class="content" :class="'bg-' + color">
        <div class="content-top">
          <router-link :to="'edit/' + product.urlSlug">
            <h3 class="h3-alt">{{ product.name }}</h3>
          </router-link>
        </div>
        <div class="content-bottom">
          <div class="content-bottom-info">
            <div><b>I dag</b></div>
            <div>18.juli</div>
            <div><b>19:30</b></div>
            <div>Hovedscenen</div>
          </div>

          <div class="content-bottom-actions">
            <Button :small="true" :color="color" @click="addItemToCart">Add to cart</Button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import store from '@/store'
import Button from '@/components/ui/Button';

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
      color: null
    }
  },
  beforeMount() {
    const r = Math.random();

    if (r < 0.25)
      this.color = 'green';
    else if (r < 0.5)
      this.color = 'pink';
    else if (r < 0.75)
      this.color = 'blue';
    else
      this.color = 'yellow';
  },
  methods: {
    addItemToCart() {
      store.dispatch('cartModule/addItemToCart', { ...this.product });
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../styles/variables';

.product-card {
  position: relative;
  height: 100%;

  &-container {
    height: 100%;
    display: flex;
    flex-direction: column;

    .image img {
      border-radius: 6px 6px 0 0;
      max-height: 250px;
      object-fit: cover;

      width: 100%;
      float: left;
    }
  }
}

.content {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
 
  margin-top: -1px;
  border-radius: 0 0 6px 6px;
  color: black;

  &-top {
    padding: var(--space-md);

    h3 {
      font-weight: 400;
    }
  }

  &-bottom {
    > div {
      padding: var(--space-md);
    }

    &-info {
  
    }

    &-actions {
      border-top: 1px solid rgba(0,0,0,0.1);
    }
  }
}
</style>
