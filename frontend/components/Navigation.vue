<template>
  <header :class="{ dark: showDarkText }" id="header">
    <div class="main col-wrap max-width">

      <!-- Desktop menu -->
      <div class="main-content" v-if="!isMobile">
        <div class="logo">
          <router-link to="/" class="noHover">
            <logo :isDark="showDarkText"/>
          </router-link>
        </div>

        <ul class="main-nav-items">
          <li v-for="item in leftNavItems">
            <router-link :to="item.link">{{ item.name }}</router-link>
          </li>
        </ul>

        <ul class="secondary-nav-items">
          <li v-for="item in rightNavItems">
            <router-link :to="item.link">
              <span>{{ item.name }}</span>
            </router-link>
          </li>

          <cart :isDark="showDarkText" />
        </ul>
      </div>

      <!-- Mobile menu -->
      <div class="main-content" v-else>
        <div>
          <router-link to="/">
            <logo :isDark="showDarkText" />
          </router-link>
        </div>

        <div class="menu">
          <cart :isDark="showDarkText" />

          <div class="menu-toggle" :class="{ active: showMenu }" @click="showMenu = !showMenu">
            <span v-if="!showMenu">Menu</span>
            <span v-else>Close menu</span>
          </div>

          <div class="menu-overlay" v-if="showMenu">
            <div class="left"></div>
            <ul class="right">
              <li v-for="item in leftNavItems.concat(rightNavItems)">
                <router-link :to="item.link">
                  <h4>{{ item.name }}</h4>
                  <i class="icon icon--arrow-forward"></i>
                </router-link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import logo from '@/components/ui/logo';
import cart from '@/components/ui/cart';

export default {
  name: 'Navigation',
  components: { logo, cart },
  data() {
    return {
      showDarkText: false,
      isMobile: false,
      showMenu: false,

      leftNavItems: [{
        name: 'Gaveposer',
        link: '/shop'
      },{
        name: 'Om oss',
        link: '/about'
      },{
        name: 'Kontakt oss',
        link: '/contact'
      }],
      rightNavItems: [{
        name: 'Admin',
        link: '/admin'
      }]
    }
  },
  beforeMount() {
    this.isMobile = window.innerWidth < 768;
    this.showDarkText = this.knownLightBackgroundPage();
  },
  watch: {
    $route(to, from) {
      this.showMenu = false;
      this.showDarkText = this.knownLightBackgroundPage(); 
    },
    showMenu(val) {
      if (val == true)
        this.showDarkText = false;
      else if (this.knownLightBackgroundPage())
        this.showDarkText = true;
    }
  },
  methods: {
    knownLightBackgroundPage() {
      const location = window.location.href.split('#')[1]
      return location == '/' || location == '/contact' || location.includes('/shop/');
    }
  }
}
</script>

<style lang="scss" scoped>
@import "frontend/styles/variables";

$nav-height: 60px;

header {
  position: absolute;
  z-index: 10;
  color: black;
  width: 100%;
}

.dark {
  a, span {
    color: var(--color-background);

    &:hover:not(.noHover) {
      border-color: var(--color-background) !important;
    }
  }
}

.main {
  width: 100%;
  padding-top: 1.4rem;
  box-sizing: border-box;

  &-content {
    display: flex;
    justify-content: space-between;

    padding: 0 2rem;

    @include mobile {
      padding: 0 0.5rem;
    }
  }
}

ul {
  list-style: none;
}

a, span {
  text-decoration: none;
  color: white;
  font-size: calc(1.125 * var(--text-base-size));
  border-bottom: 2px solid transparent;
  cursor: pointer;

  &:hover:not(.noHover) {
    border-bottom: 2px solid white;
  }
}

.main-nav-items, .secondary-nav-items {
  display: flex;
  flex-direction: row;
  padding-top: 0rem;

  li {
    float: left;
    margin: 0 1rem;
  }
}


.menu {
  display: flex;

  &-toggle {
    position: relative;
    z-index: 2;
    margin-left: 1rem;

    &.active span {
      border-bottom: 2px solid white;
    }
  }

  &-overlay {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;

    display: flex;
    width: 100vw;
    height: 100vh;
  }

  &-overlay .left {
    height: 100%;
    width: 30vw;
    background-color: black;
  }

  &-overlay .right{
    margin: 0;
    padding-top: 5rem;
    padding-left: 2rem;
    width: 70vw;
    height: 100%;
    background-color: var(--color-background);

    h4 {
      font-size: 1.2em;
      font-weight: 400;
      display: inline-block;
    }

    li:not(:first-of-type) {
      margin-top: 1rem;
    }
  }
}
</style>
