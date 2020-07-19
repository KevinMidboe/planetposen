<template>
  <main class="container cart">
    <div class="max-width col-wrap top-show">

      <div class="page-header">
        <h1>Handlekurv</h1>
      </div>

      <table cellspaceing="0" class="cart-inventory desktop-only">
        <thead>
          <tr>
            <th>Product</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Delsum</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="product in cartInventory">
            <td class="name-and-image">
              <img :src="product.image" />
              <span>{{ product.name }}</span>
            </td>
            <td>38.99 NOK</td>
            <td>2</td>
            <td class="sum-and-remove">
              <span>77.99 NOK</span>
              <i class="icon icon--close-circle"
                 @click="removeFromCart(product)"
                 @keyup.enter="removeFromCart(product)"
                 role="button"
                 tabindex="0"
                 :title="'Remove product: ' + product.name"></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      <table cellspaceing="0" class="cart-inventory--mobile mobile-only">
        <tbody v-for="product in cartInventory">
          <tr>
            <th>Product</th>
            <td class="name-and-image">
              <img :src="product.image" />
              <span>{{ product.name }}</span>
            </td>
          </tr>
          <tr>
            <th>Price</th>
            <td>38.99 NOK</td>
          </tr>
          <tr>
            <th>Quantity</th>
            <td>2</td>
          </tr>
          <tr>
            <th>Delsum</th>
            <td>77.99 NOK</td>
          </tr>
          <tr class="remove-row">
            <th></th>
            <td>
              <Button color="pink" @click="removeFromCart(product)" :xs="true">Fjern produkt</Button>
            </td>
          </tr>
        </tbody>
      </table>

      <section class="checkout">
        <h2>Totalt i handlekurven</h2>
        <div class="checkout-summary">
          <table cellspacing="0">
            <tbody>
              <tr>
                <th>Delsum</th>
                <td data-title="Delsum">
                  <span>388 kr</span>
                </td>
              </tr>
              <tr class="frakt">
                <th>Frakt</th>
                <td data-title="Frakt">
                  <span>49 kr</span>
                  <p>Fraktalternativer vil bli oppdatert på betalingssiden.</p>
                </td>
              </tr>
              <tr>
                <th>Total</th>
                <td data-title="Total">
                  <span>437 kr</span>
                </td>
              </tr>
            </tbody>
          </table>

          <Button color="blue" :scaleRotate="true">Gå til kassen</Button>
        </div>
      </section>
    </div>
  </main>
</template>


<script>
import store from '@/store';
import Picker from '@/components/ui/Picker'
import Button from '@/components/ui/Button'

export default {
  name: 'Cart',
  components: {
    Picker,
    Button
  },
  computed: {
    cartInventory() {
      return store.getters['cartModule/inventory'];
    }
  },
  methods: {
    removeFromCart(product) {
      store.dispatch('cartModule/removeItemFromCart', product)
    }
  }
}
</script>


<style lang="scss" scoped>
@import 'frontend/styles/variables';

.checkout {
  @include desktop {
    width: 55%;
  }

  margin: 2rem 0;

  h2 {
    margin: 1rem 0;
  }

  &-summary {
    width: 100%;
  }
}

table.cart-inventory {
  table-layout: fixed;

  @include desktop {
    table-layout: auto;

    th:first-of-type {
      width: 55%;
    }
    th:not(:first-of-type) {
      width: 15%;
    }
  }

  @include tablet {
    table-layout: auto;

    th:first-of-type {
      width: 40%;
    }
    th:not(:first-of-type) {
      width: 15%;
    }
    th:last-of-type {
      width: 20%;
    }
  }

  .name-and-image {
    display: flex;
    align-items: center;

    img {
      margin-right: 1rem;
      width: auto;
      height: 40px;
      border-radius: 4px;
    }
  }

  .sum-and-remove i {
    float: right;
    margin-top: -1px;
    font-size: var(--text-md);
    color: var(--color-pink);

    cursor: pointer;
  }

  thead tr th {
    border-bottom: 2px solid rgba(255,255,255,.1);

    &:not(:last-of-type) {
      border-right: 2px solid rgba(255,255,255,.1);
    }
  }

  tbody tr:last-of-type td {
    border-bottom: 0px solid;
  }
}

table.cart-inventory--mobile {
  table-layout: auto;

  td {
    text-align: right;
  }

  th::after {
    content: ':';
  }

  tbody:nth-of-type(even) {
    background-color: var(--color-background-highlight);
  }

  tbody:last-of-type tr:last-of-type {
    th, td {
      border: 0px solid;
    }
  }

  .name-and-image {
    img {
      display: none;
      width: 150px;
    }
  }

  .remove-row {
    td {
      padding: 0.4rem;
    }

    th::after {
      content: '';
    }
  }
}

.checkout-summary table {
  tr:last-of-type {
    th, td {
      border-bottom: 0px solid;
    }
  }

  th {
    width: 35%;
  }

  .frakt p {
    font-size: 0.9em;
  }
}

table {
  width: 100%;
  border: 1px solid rgba(255,255,255,.1);
  border-radius: 6px;
  margin-bottom: 1.5rem;

  font-size: 1.2em;

  @include mobile {
    font-size: 1.1em;
  }

  tr th, tr td {
    border-bottom: 2px solid rgba(255,255,255,.1);
  }

  th, td {
    padding: 0.75rem 1rem;
  }

  th {
    text-align: left;
    vertical-align: top;
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
img {
}

</style>
