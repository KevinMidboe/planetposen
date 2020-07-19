<template>
  <button :class="computedClass" @click="$emit('click')"><slot></slot></button>
</template>

<script>
export default {
  props: {
    color: {
      type: String,
      default: 'black',
      required: false
    },
    small: {
      type: Boolean,
      default: false,
      required: false
    },
    xs: {
      type: Boolean,
      default: false,
      required: false
    },
    scaleRotate: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    computedClass() {
      let classNames= [];

      if (this.scaleRotate)
        classNames.push('scale-rotate')
      if (this.small)
        classNames.push('small');
      if (this.xs)
        classNames.push('xs');
      if (this.color)
        classNames.push(this.color);
      return classNames.join(' ');
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../styles/variables.scss';

button {
  padding: 20px 30px;
  font-weight: 500;

  background-color: var(--color-green);
  color: var(--color-background);

  border: unset;
  border-radius: var(--btn-radius);
  font-size: var(--btn-font-size);

  transition: transform .15s ease, -webkit-transform .15s ease;

  &.small {
    padding: var(--space-sm) var(--space-md);
    font-size: var(--btn-sm);
  }

  &.xs {
    padding: var(--space-xs) var(--space-sm);
    font-size: var(--btn-xs);
  }

  @media(hover: hover) and (pointer: fine) {
    &.scale-rotate:hover {
      transform: rotate(4deg) scale(1.05);
    }
  }

  &.black {
    background-color: var(--color-background-highlight);
    color: white;
  }
  &.green {
    background-color: var(--color-green);
  }
  &.yellow {
    background-color: var(--color-yellow);
  }
  &.pink {
    background-color: var(--color-pink);
  }
  &.blue {
    background-color: var(--color-blue);
  }
}

</style>
