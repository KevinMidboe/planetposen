
<template>
  <router-link to="/cart" class="cart" :class="{ dark: isDark }">
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
      cartItems: [0,0,0,0]
    }
  },
  computed: {
    cartInventory() {
      return store.getters['cartModule/inventory']
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

