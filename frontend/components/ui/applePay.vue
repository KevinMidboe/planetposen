<template>
  <div>
    <div class="apple-pay-button-with-text apple-pay-button-white-with-text" @click="createPaymentRequest">
      <span class="text">Buy with</span>
      <span class="logo"></span>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    getApplePaySession(validationURL) {
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ validationURL })
      };

      return fetch('/api/applepay/validateSession', options)
        .then(resp => resp.json())
    },
    makeApplePayPaymentTransaction(payment) {
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ payment })
      };

      return fetch('/api/applepay/pay', options)
        .then(resp => resp.json())
    },
    createPaymentRequest() {
      const paymentRequest = {
        countryCode: 'NO',
        currencyCode: 'NOK',
        shippingMethods: [{
          label: 'Free Shipping',
          amount: 0.00,
          identifier: 'free',
          detail: 'Delivers in five business days'
        }, {
          label: 'Express Shipping',
          amount: 5.00,
          identifier: 'express',
          detail: 'Delivers in two business days',
        }],
        lineItems: [{
          label: 'Shipping',
          amount: 0.00
        }],
        total: {
          label: 'Apple Pay Example',
          amount: 8.99
        },
        supportedNetworks: [ 'amex', 'discover', 'masterCard', 'visa'],
        merchantCapabilities: [ 'supports3DS'],
        requiredShippingContactFields: [ 'postalAddress', 'email' ]
      };

      const session = new ApplePaySession(6, paymentRequest);

      session.onvalidatemerchant = event => {
        console.log("Validate merchante");
        console.log('event: ', event);

        const validationURL = event.validationURL;
        this.getApplePaySession(validationURL).then(response => {
          console.log('response from getApplePaySession:', response);
          session.completeMerchantValidation(response);
        })
      }

      session.onpaymentauthorized = event => {
        this.makeApplePayPaymentTransaction(event.payment).then(response => {
          console.log('response from pay:', response);

          if (response.approved)
            session.completePayment(ApplePaySession.STATUS_SUCCESS)
          else
            session.completePayment(ApplePaySession.STATUS_FAILURE)
        })
      }

      session.begin();
    }
  }
}
</script>

<style lang="scss" scoped>
@supports (-webkit-appearance: -apple-pay-button) {
    .apple-pay-button-with-text {
        display: inline-block;
        -webkit-appearance: -apple-pay-button;
        -apple-pay-button-type: buy;
        cursor: pointer;
    }
    .apple-pay-button-with-text > * {
        display: none;
    }
    .apple-pay-button-white-with-text {
        -apple-pay-button-style: white;
    }
    .apple-pay-button-white-with-line-with-text {
        -apple-pay-button-style: white-outline;
    }
}

@supports not (-webkit-appearance: -apple-pay-button) {
    .apple-pay-button-with-text {
        cursor: pointer;
        --apple-pay-scale: 1; /* (height / 32) */
        display: inline-flex;
        justify-content: center;
        font-size: 12px;
        border-radius: 5px;
        padding: 0px;
        box-sizing: border-box;
        min-width: 200px;
        min-height: 32px;
        max-height: 64px;
    }
    .apple-pay-button-black-with-text {
        background-color: black;
        color: white;
    }
    .apple-pay-button-white-with-text {
        background-color: white;
        color: black;
    }
    .apple-pay-button-white-with-line-with-text {
        background-color: white;
        color: black;
        border: .5px solid black;
    }
    .apple-pay-button-with-text.apple-pay-button-black-with-text > .logo {
        background-image: -webkit-named-image(apple-pay-logo-white);
        background-color: black;
    }
    .apple-pay-button-with-text.apple-pay-button-white-with-text > .logo {
        background-image: -webkit-named-image(apple-pay-logo-black);
        background-color: white;
    }
    .apple-pay-button-with-text.apple-pay-button-white-with-line-with-text > .logo {
        background-image: -webkit-named-image(apple-pay-logo-black);
        background-color: white;
    }
    .apple-pay-button-with-text > .text {
        font-family: -apple-system;
        font-size: calc(1em * var(--apple-pay-scale));
        font-weight: 300;
        align-self: center;
        margin-right: calc(2px * var(--apple-pay-scale));
    }
    .apple-pay-button-with-text > .logo {
        width: calc(35px * var(--scale));
        height: 100%;
        background-size: 100% 60%;
        background-repeat: no-repeat;
        background-position: 0 50%;
        margin-left: calc(2px * var(--apple-pay-scale));
        border: none;
    }
}
</style>
