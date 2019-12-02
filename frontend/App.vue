<template>
  <div>
    <Navigation></Navigation>

    <router-view />
  </div>
</template>

<script>
import Navigation from '@/components/Navigation';

export default {
  name: 'App',
  components: { Navigation }
}
</script>

<style lang="scss">
@import './styles/normalize';
@import './styles/icons';
@import './styles/global';
</style>