<template>
  <header class="flex space-between">
    <div>
      <img class="logo" src="https://planetposen.no/Planetposen/Hjem_files/shapeimage_1.png" />

      <router-link to="/" class="header-element">
        <span>Hjem</span>
      </router-link>
      <router-link to="/" class="header-element">
        <span>Om oss</span>
      </router-link>
      <router-link to="/" class="header-element">
        <span>Produkter</span>
      </router-link>
    </div>
    <div>
      <!-- <i class="icon icon--profile"></i> -->
      <router-link to="/cart">
        <i class="icon icon--cart-outline header-element"></i>
      </router-link>
    </div>
  </header>
</template>

<script>
export default {
  name: 'Header'
}
</script>

<style lang="scss" scoped>
@import "./frontend/styles/variables";

$header-height: 80px;

header {
  display: flex;
  justify-content: space-between;
  background-color: #3b945e; // 3
  height: $header-height;
  color: #f2f2f2; // 3

  > div {
    display: flex;
    align-items: center;
    height: $header-height;

    a {
      text-decoration: unset;
      color: inherit;
      height: 100%;
    }

    // background-color: $green; // 1
    // background-color: #3aafa9; // 2
    // background-color: #3b945e; // 3
    // color: $text-color; // 1
    // color: white; // 2
    // color: #f2f2f2; // 3

    .logo {
      display: block;
      height: 100%;
      width: auto;
    }

    .header-element {
      display: flex;
      align-items: center;
      padding: 0 0.7rem;
      height: 100%;
      cursor: pointer;

      &:hover {
        // background-color: #379683; // 1
        background-color: #def2f1; // 2
        // background-color: #57ba98; // 3
        color: white; // 1
        color: $text-color; // 2
        color: #182628; // 3
        // background-color: #8ee4af;
      }

      // &:first-of-type {
      //   margin-left: 5rem;
      // }

      span {
        letter-spacing: 2.5px;
        text-transform: lowercase;
        font-weight: 300;
        align-items: center;
      }
    }

    .icon {
      font-size: 1.75rem;
      font-weight: 700;
    }
  }
}
</style>