<template>
  <q-page class="q-pa-md">
    props: {{title}}
  </q-page>
</template>

<script>
import { api } from 'boot/axios';

const props = {
  title: {
    type: String,
    default: 'connect',
  },
};
export default {
  props,
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
    this.interval = setInterval(() => this.getBitcoins(), 1000);
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
