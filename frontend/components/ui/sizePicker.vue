<template>
  <div class="wrapper">
    <div class="size-box" :class="{ selected: selectedSize == size }"
         v-for="size in sizes" @click="sizeSelected(size)" tabindex="0" @keyup.enter="sizeSelected(size)">
      <i class="icon icon--bug"></i>
      <span>{{ size }}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    sizes: {
      type: Array,
      default: undefined,
      required: false
    },
    sizeVariable: {
      type: Object,
      required: false
    }
  },
  watch: {
    sizeVariable(newVal) {
      this.selectedSize = newVal;
    }
  },
  data() {
    return {
      selectedSize: undefined,
      defaultSizes: ['set', 'wine', 'sm', 'md', 'large']
    }
  },
  beforeMount() {
    if (this.sizes == undefined)
      this.sizes = this.defaultSizes;
    if (this.sizeVariable)
      this.selectedSize = this.sizeVariable;
  },
  methods: {
    sizeSelected(size) {
      this.selectedSize = size;
      this.$emit('selectedSize', size);

      this.$emit('update:sizeVariable', size)
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'frontend/styles/variables';

.wrapper {
  display: flex;

  @include mobile {
    overflow: scroll;
    max-width: 79vw;
  }
}

.size-box {
  border: 4px solid rgba(0,0,0,.4);
//  border-radius: 6px;

  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0.2rem 0.3rem;

  text-transform: capitalize;
  
  &:not(:first-of-type) {
    margin-left: 0.4rem;
  }

  &.selected ,&:hover {
    border-color: var(--color-darkblue);
    cursor: pointer;
  }
  
  .icon {
    font-size: 3em;
  }
}
</style>

