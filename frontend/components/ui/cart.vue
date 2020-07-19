
<template>
  <router-link to="/cart"
               class="cart"
               :title="cartTitle"
               :class="{ dark: isDark, offScreen: isHeaderOffScreen }">

    <div class="cart-counter">
      {{ cartInventory.length }}
    </div>
    <i class="icon icon--cart-outline"></i>
  </router-link>
</template>

<script>
import store from '@/store'
export default {
  props: {
    isDark: {
      type: Boolean,
      default: false,
      required: false
    }
  },
  data() {
    return {
      isHeaderOffScreen: false
    }
  },
  mounted() {
    let observer = new IntersectionObserver((entry, observer) => {
      if (this.$route.name == 'Shop') {
        const isHeaderIntersecting = entry[0].isIntersecting;
        this.isHeaderOffScreen = !isHeaderIntersecting;
      } else {
        this.isHeaderOffScreen = false;
      }
    })

    observer.observe(document.querySelector('#header'))
  },
  computed: {
    cartInventory() {
      return store.getters['cartModule/inventory']
    },
    cartTitle() {
      let len = this.cartInventory.length;
      return `Cart with ${ len } products`
    }
  }
}
</script>

<style lang="scss" scoped>
.cart {
  display: flex;
  flex-direction: row;
  align-items: center;
  height: min-content;

  cursor: pointer;
  z-index: 3;

  &-counter {
    color: var(--color-background);
    background-color: var(--color-yellow);
    padding: 0.2rem 0.5rem;
    height: min-content;

    margin-right: 0.5rem;
  }

  &.offScreen {
    position: fixed;
    top: 0.5rem;
    right: -6px;
    padding: 0.5rem;
    padding-right: 2.5rem;
    background-color: var(--color-background);
    border-radius: 6px;
    border: 0px solid !important;
  }

  &:hover {
    border-bottom: unset;
  }
}

.dark .icon {
  color: var(--color-background);
}

.icon {
  font-size: 1.5rem;
  color: white;
}
</style>

