<template>
  <div class="container">
    <div>image: {{ image }}</div>
    <div>text: {{ text }}</div>
  </div>
</template>

<script>
export default {
  name: 'ImageBlock',
  props: {
    image: {
      type: String,
      required: false
    },
    text: {
      type: String,
      required: false
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  background-color: NavajoWhite;
}
</style>
