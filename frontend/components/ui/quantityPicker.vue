<template>
  <div class="quantity-picker noSelect">
    <span tabindex="0" class="button"
          @click="decrement" @keyup.enter="decrement">-</span>
    <div class="display">{{ quantity }}</div>
    <span tabindex="0" class="button"
          @click="increment" @keyup.enter="increment">+</span>
  </div>
</template>

<script>
export default {
  props: {
    max: {
      type: String,
      required: true
    }
  },
  watch: {
    quantity(val) {
      if (val <= 0)
        this.quantity = 0;
      else if (val >= this.max)
        this.quantity = this.max;
    }
  },
  data() {
    return {
      quantity: 1
    }
  },
  methods: {
    decrement() {
      this.quantity = this.quantity - 1;
    },
    increment() {
      this.quantity = this.quantity + 1;
    }
    
  }
}
</script>

<style lang="scss" scoped>
.quantity-picker {
  display: flex;
  flex-direction: row;
  align-items: center;
  width: max-content;
  height: 3rem;
  border: 3px solid gray;
  font-size: 2rem;

  .button {
    width: 3rem;
    height: 3rem;
    border: unset;
    padding: 0;
    display: flex;
    justify-content: center;
    cursor: pointer;

    &:hover, &:focus {
      border: 3px solid black;
      margin-left: -3px;
      margin-right: -3px;
    }
  }
 
  .display {
    display: flex;
    justify-content: center;
    width: 3rem;
  }
}
</style>
