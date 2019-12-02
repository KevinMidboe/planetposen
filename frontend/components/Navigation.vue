<template>
  <div>
    <nav class="mobile-only">
      <ul class="nav-list">
        <li class="nav-item">
          <router-link to="/cart">
            <i class="icon icon--basket-outline"></i>
          </router-link>
        </li>

        <img class="logo" src="/frontend/assets/images/logo-white.png" />

        <li class="nav-item">
          <router-link to="/cart">
            <i class="icon icon--basket-outline"></i>
          </router-link>
        </li>
      </ul>
    </nav>

    <nav class="desktop-only">
      <ul class="nav-list">
        <img class="logo" src="/frontend/assets/images/logo-black.png" />
        <!-- <img class="logo" src="https://planetposen.no/Planetposen/Hjem_files/shapeimage_1.png" /> -->

        <li class="nav-item">
          <router-link to="/" class="">
            <span>Hjem</span>
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/">
            <span>Om oss</span>
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/">
            <span>Produkter</span>
          </router-link>
        </li>
      </ul>
      <ul>
        <li class="nav-item">
        <!-- <i class="icon icon--profile"></i> -->
          <router-link to="/cart">
            <i class="icon icon--basket-outline"></i>
          </router-link>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'Navigation'
}
</script>

<style lang="scss" scoped>
@import "./frontend/styles/variables";
@import './frontend/styles/global';

$nav-height: 80px;

nav {
  display: flex;
  justify-content: space-between;
  background-color: #3b945e; // 3
  height: $nav-height;
  color: #f2f2f2; // 3

  > ul {
    display: flex;
    align-items: center;
    height: $nav-height;
    margin: 0;
    padding: 0;

    @include mobile {
      width: 100%;
      justify-content: space-between;
    }

    a {
      text-decoration: unset;
      color: inherit;
      // height: 100%;
    }

    li {
      height: 100%;
      display: block;
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

      @include desktop {
        background-color: #def2f1;
      }
    }

    .nav-item {
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