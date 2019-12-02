<template>
  <div class="container cart">
    <div class="row header">
      <div class="product">
        <h2>Product</h2>
      </div>
      <div class="info">
        <h2>Quantity</h2>
        <h2>Price</h2>
      </div>
    </div>

     <div class="row">
      <div class="product">
        <img src="https://planetposen.no/Planetposen/Kjp_na_files/Media/IMG_1244/IMG_1244.jpg" />
        
        <div class="flex-direction-column">
          <h3>Christmas joy</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam</p>
        </div>
      </div>
      <div class="info">
      </div>
    </div>
  </div>
</template>


<script>
export default {
  name: 'Cart'
}
</script>


<style lang="scss" scoped>

.cart {
  width: 95%;
  margin: 0 auto;
}

.row {
  display: flex;
  flex-direction: row;
  height: 150px;

  &.header {
    height: min-content;

    h2 {
      font-weight: 300;
    }
  }

  .product {
    width: 60%;
    height: 100%;
    display: inherit;
    flex-direction: inherit;
    align-items: center;

    img {
      height: 100%;
      width: auto;
      margin-right: 2rem;
    }

    h3, p {
      margin: 0;
    }

    h3 {
      font-weight: 500;
      font-size: 1.5rem;
      margin-bottom: 0.5rem;
    }
  }

  .info {
    width: 40%;
    display: inherit;
    flex-direction: inherit;

    h2 {
      width: 50%;
    }
  }
}
</style>