<template>
  <div class="container">
    <div ref="confirmDiag" class="feedback-text"></div>
    <div class="card">
      <div ref="card"></div>
    </div>

    <Button @click="pay" :small="true">Pay</Button>

    <div class="applePay">
      <div ref="paymentRequestButton"></div>
    </div>
  </div>
</template>

<script>
import { loadStripe } from '@stripe/stripe-js';
import Button from '@/components/ui/Button';

export default {
  components: {
    Button
  },
  data() {
    return {
      clientSecret: null,
      card: null,
      stripe: null
    }
  },
  created() {
  },
  async mounted() {
    this.stripe = await loadStripe('pk_test_YiU5HewgBoClZCwHdhXhTxUn')
    this.mountCard();
    this.mountApplePay();

    this.makeIntent();
  },
  methods: {
    pay() {
      this.stripe.confirmCardPayment(this.clientSecret, {
        payment_method: {
          card: this.card,
          billing_details: {
            name: 'Kevin Testost'
          }
        }
      })
      .then(result => {
        if (result.error) {
          console.log('Error confirmPayment:', result.error.message)
        } else {
          if (result.paymentIntent.status === 'succeeded') {
            this.$refs.confirmDiag.innerText = 'Confirmed transaction!';
          }
        }
      })
    },
    makeIntent() {
      let url = '/api/stripe/create-payment-intent';
      if (window.location.href.includes('localhost'))
        url = 'http://localhost:30010'.concat(url)

      fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(resp => resp.json())
        .then(data => this.clientSecret = data.clientSecret)
    },
    mountApplePay() {
      const paymentRequest = this.stripe.paymentRequest({
        country: 'NO',
        currency: 'nok',
        total: {
          label: 'Demo total',
          amount: 1009
        },
//        requestShipping: true,
        requestPayerName: true,
        requestPayerEmail: true
      });

      console.log('payment request:', paymentRequest);

      const elements = this.stripe.elements();
      const prButton = elements.create('paymentRequestButton', {
        paymentRequest
      });

      paymentRequest.on('paymentmethod', ev => {
        console.log('ev from paymentmethods:', ev)
        this.stripe.confirmCardPayment(this.clientSecret,
          { payment_method: ev.paymentMethod.id },
          { handleActions: false }
        ).then(confirmResult => {
          if (confirmResult.error) {
            console.log('confirm error:', confirmResult.error);
            ev.complete('fail');
          } else {
            console.log('confirm success:', confirmResult)
            ev.complete('success')
            this.stripe.confirmCardPayment(this.clientSecret)
              .then(result => {
                console.log('finall response from stripe:', result)
              })
          }
        })
      })

      paymentRequest.canMakePayment()
        .then(result => {
          if (result) {
            prButton.mount(this.$refs.paymentRequestButton)
          } else
            console.error('unable to load', result);
        })
    },
    mountCard() {
      const elements = this.stripe.elements();

      const style = {
        base: {
          color: '#32325d',
          fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
          fontSmoothing: 'antialiased',
          fontSize: '16px',
          '::placeholder': {
            color: '#aab7c4'
          }
        },
        invalid: {
          color: '#fa755a',
          iconColor: '#fa755a'
        }
      };

      this.card = elements.create('card', { style: style });
      
      this.card.mount(this.$refs.card)
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  background-color: white;
  padding: 1rem;
  border-radius: 6px;
}

.card {
  border: 2px solid var(--background-color);
  border-radius: 6px;
  padding: 0.5rem;
  margin-bottom: 1rem;
}

.feedback-text {
  color: var(--color-background);
}

.applePay {
  margin-top: 1rem;
}
</style>
