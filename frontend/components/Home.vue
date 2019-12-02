<template>
  <div class="container">
    <!-- <div class="img" :style="{'background-image': 'url(https://i.imgur.com/GTPZgje.jpg)'}"></div> -->
    <div class="img" :style="{'background-image': 'url(./frontend/assets/images/IMG_1122.jpeg)'}"></div>

    <h1>Welcome home</h1>
  </div>
</template>

<script>
export default {
  name: 'Home',
}
</script>

<style lang="scss" scoped>
.container {
  height: 200vh;
}

.img {
  height: calc(80vh - 80px);
  width: 100vw;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}

h1 {
  font-weight: 500;
  padding: 1rem;
  margin: 0;
}
</style>