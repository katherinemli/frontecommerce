<template>
  <q-page class="q-pa-md">
    o input their name address and credit card (ex 4242-4242-4242-4242), let them click sub
    <q-input bottom-slots v-model="text" label="Label" counter :dense="dense">
      <template v-slot:prepend>
        <q-icon name="place" />
      </template>
      <template v-slot:append>
        <q-icon name="close" @click="text = ''" class="cursor-pointer" />
      </template>

      <template v-slot:hint>
        Field hint
      </template>
    </q-input>
    <q-input v-model="card" label="Card" mask="#### #### #### ####" fill-mask="0"
      hint="Card Number" />
  </q-page>
</template>

<script>
import { api } from 'boot/axios';

export default {
  name: 'Payment',
  data() {
    return {
      listProducts: [],
      productsData: [],
      dataLoaded: false,
      totalPrice: 0.0,
      coupon: 0.0,
      address: '',
      text: '',
      ph: '',
      dense: false,
      card: null,
    };
  },
  created() {
    api.get('/cart/2').then((response) => {
      console.log('axios1:', response);
      this.coupon = response.data.coupon;
      this.listProducts = response.data.product;
      this.dataLoaded = true;
      const urlProducts = [];
      this.listProducts.forEach((idProduct) => {
        console.log('idProduct:', `/product/${this.idProduct}`);
        urlProducts.push(api.get(`/product/${idProduct}`));
      });
      this.$axios.all(urlProducts)
        .then(this.$axios.spread((...responseProduct) => {
          this.productsData = responseProduct.map((element) => {
            console.log('elemn:', element);
            this.totalPrice += element.data.price;
            return element.data;
          });
        }))
        .catch((error) => {
          console.error(error);
        });
    });
  },
  beforeMount() {
    // this.loadData();
  },
  methods: {
    addCart(product) {
      console.log('cart');
      api.put('/cart/2', product)
        .then((response) => {
          console.log('response: ', response);
        });
    },
    onClickChild(value) {
      console.log('click el hijo');
      const objPostProduct = {
        price: 159.90,
        address: '712 Red Bark Lane in Henderson, Nevada',
        product: 1,
        coupon: 1,
      };
      // this.addCart(objPostProduct);
      console.log(objPostProduct, value); // someValue
    },
  },
};
</script>
