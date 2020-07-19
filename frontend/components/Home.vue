<template>
  <main id="content" role="main">
    <div class="banner green-background">
      <div class="banner-content top-show col-wrap max-width">
        <div>
          <h1 class="margin-bottom--sm">Sommersalg</h1>
          <div class="text-container accent--lg">
            <p>Kjøp en pose for verden</p>
          </div>
        
          <router-link to="/shop">
            <Button color='yellow' :scaleRotate="true">View items for sale</Button>
          </router-link>
        </div>

        <div>
          <img src="https://planetposen.no/no/Hjem_files/shapeimage_3.png" />
        </div>
      </div>
    </div> 

    <Shop />
  </main>
</template>

<script>
import Shop from '@/components/Shop';
import Button from '@/components/ui/Button';

export default {
  name: 'Home',
  components: { Shop, Button }
}
</script>

<style lang="scss" scoped>
@import 'frontend/styles/variables';
@import 'frontend/styles/spacing';

#content {
  overflow: hidden;
  width: 100vw;
}

.banner {
  height: 100%;
  width: 100%;

  &.green-background {
    background-color: #D6F5E3;
    color: black;
  }

  &-content {
    display: flex;
    justify-content: space-around;

    @include mobile {
      flex-direction: column-reverse;
    }
  }
}

img {
  padding-top: 1.5rem;

  @include mobile {
    display: block;
    margin: auto;
    width: 80%;
  }
}

</style>
