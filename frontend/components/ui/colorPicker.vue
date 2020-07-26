<template>
  <div class="wrapper">
    <button class="color-card"
            :class="'bg-' + (selectedColor || 'blue')"
            @click="showPicker = !showPicker"></button>

    <div class="picker" v-if="showPicker">
      <div v-for="color in availableColors"
           class="color-card" :class="'bg-' + color"
           @click="colorSelected(color)"></div> 
    </div>
  </div>
</template>

<script>
export default {
  props: {
    color: {
      type: String,
      required: false
    }
  },
  data() {
    return {
      showPicker: false,
      selectedColor: undefined,
      availableColors: [
        'yellow',
        'blue',
        'green',
        'pink'
      ]
    }
  },
  beforeMount() {
    if (this.color)
      this.selectedColor = this.color;
  },
  methods: {
    colorSelected(color) {
      this.showPicker = false;
      this.selectedColor = color;
      this.$emit('selectedColor', color);
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'frontend/styles/variables';

.wrapper {
  position: relative;
}

.color-card {
  width: 3rem;
  height: 3rem;

  border-style: solid;
  border-width: 4px;
  border-radius: 6px;
  cursor: pointer;
}

.picker {
  position: absolute;
  width: 11.1rem;
  display: flex;
  flex-wrap: wrap;
  top: 0;
  left: 4rem;
  background-color: var(--color-background);
  border: 2px solid rgba(0,0,0,.7);
  border-radius: 6px;
  padding: 0.2rem;

  > div {
    margin: 0.1rem;
    z-index: 2;
  }

  &::before {
    content: '';
    width: 1rem;
    height: 1rem;
    background-color: var(--color-background);
    position: absolute;
    left: -0.5rem;
    top: 1rem;
    transform: rotate(45deg);
  }
}

@include mobile {
  .picker {
    top: 4rem;
    left: unset;
    right: 0;

    &::before {
      top: -0.5rem;
      left: 9.5rem;
    }
  }
}
</style>
