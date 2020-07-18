<template>
  <main class="container cart">
    <div class="max-width col-wrap top-show">

      <div class="page-header">
        <h1>Handlekurv</h1>
      </div>


      <div class="row header">
        <h2>Product</h2>
        <h2>Pris</h2>
        <h2>Quantity</h2>
        <h2>Delsum</h2>
      </div>

       <div class="row">
        <div class="product">
          <img src="https://planetposen.no/no/Kjp_na_files/Media/IMG_1244/IMG_1244.jpg" />
          
          <div class="flex-direction-column">
            <h3>Christmas joy</h3>
          </div>
        </div>
        <span class="price">30.99 $</span>
        <div class="info">
          <Picker></Picker>
        </div>
        <span class="price">61.98 $</span>
      </div>
      <div class="row">
        <div class="product">
          <img src="https://planetposen.no/no/Kjp_na_files/Media/IMG_1244/IMG_1244.jpg" />
          
          <div class="flex-direction-column">
            <h3>Christmas joy</h3>
          </div>
        </div>
        <span class="price">30.99 $</span>
        <div class="info">
          <Picker></Picker>
        </div>
        <span class="price">30.99 $</span>
      </div>

      <section class="checkout">
        <h2>Totalt i handlekurven</h2>
        <div class="checkout-summary">

          <Button color="blue" :scaleRotate="true">Gå til kassen</Button>
        </div>
      </section>
    </div>
  </main>
</template>


<script>
import Picker from '@/components/ui/Picker'
import Button from '@/components/ui/Button'

export default {
  name: 'Cart',
  components: {
    Picker,
    Button
  }
}
</script>


<style lang="scss" scoped>
@import 'frontend/styles/variables';

.checkout {
  @include desktop {
    float: right;
    width: 55%;
  }

  h2 {
    margin: 1rem 0;
  }

  &-summary {
    height: 10px;
    background-color: red;
    width: 100%;
  }
}

.page-header {
  margin-bottom: 3rem;

  @include mobile {
    text-align: center;
  }
}

.cart {
  width: 95%;
  margin: 0 auto;
}

.header {
  h2 {
    font-weight: 400;
  }
}

.row {
  display: flex;
  flex-direction: row;
  height: 100%;
  margin-bottom: 1rem;
  padding: 1rem;
  border: 1px solid white;


  &:first-of-type {
    height: min-content;
  }

  > *:first-child {
    width: calc(70% - 1rem);
    // background-color: violet;
    margin-right: 1rem;

    display: flex;
    flex-direction: row;

    img {
      height: 80px;
      margin-right: 1rem;
    }

    h3 {
      letter-spacing: 1.2px;
      font-weight: normal;
      margin: 0;
      margin-top: 0.3rem;
    }

    p {
      font-weight: 300;
    }
  }

  > *:nth-child(3) {
    width: calc(15% - 1rem);
    margin-right: 1rem;
    display: flex;
    align-items: center;
    // background-color: navy;
  }

  > *:nth-child(2) {
    width: calc(15%);
    // background-color: #F28500;
    font-size: 1.5rem;
    margin: auto;
  }

  > *:nth-child(4) {
    width: calc(15%);
    // background-color: #F28500;
    font-size: 1.5rem;
    margin: auto;
  }

  &:last-child {
    // background-color: green;
  }

  img {
    height: 100%;
    width: auto;
    height: 150px;
    border-radius: 4px;
  }

  // &.header {
  //   height: min-content;

  //   h2 {
  //     font-weight: 300;
  //   }
  // }

  // .product {
  //   width: 60%;
  //   height: 100%;
  //   display: inherit;
  //   flex-direction: inherit;
  //   align-items: center;

  //   img {
  //     height: 100%;
  //     width: auto;
  //     margin-right: 2rem;
  //   }

  //   h3, p {
  //     margin: 0;
  //   }

  //   h3 {
  //     font-weight: 500;
  //     font-size: 1.5rem;
  //     margin-bottom: 0.5rem;
  //   }
  // }

  // .info {
  //   width: 40%;
  //   display: inherit;
  //   flex-direction: inherit;

  //   h2 {
  //     width: 50%;
  //   }
  // }
}
</style>
