<template>
 <q-page class="q-pa-md">
    <div class="body-cards" v-if="dataLoaded">
        <product-card
        @clicked="onClickChild(product)"
        v-for="product in listProducts" :key="product.id"
        :name="product.name"
        :description="product.description">
        </product-card>
    </div>
  </q-page>
</template>

<script>
import { api } from 'boot/axios';
import ProductCard from 'components/Product.vue';

export default {
  name: 'PageIndex',
  components: { ProductCard },
  data() {
    return {
      listProducts: [],
      dataLoaded: false,
      cartData: {},
    };
  },
  beforeMount() {
    this.loadData();
    this.loadCart();
  },
  methods: {
    loadCart() {
      api.get('/cart/2')
        .then((response) => {
          console.log('cartMainLayout Number:: ', response.data.product.length);
          this.cartData = response.data;
        })
        .catch(() => {
          console.log('error: ');
        });
    },
    loadData() {
      api.get('/product/')
        .then((response) => {
          console.log('response: ', response);
          this.listProducts = [];
          response.data.map((x) => {
            const product = {};
            product.description = x.name;
            product.name = x.description;
            this.listProducts.push(product);
            return x;
          });
          console.log('listProducts: ', this.listProducts);
          this.dataLoaded = true;
        })
        .catch(() => {
          console.log('error: ');
        });
    },
    addCart(product) {
      console.log('cart');
      api.put('/cart/2/', product)
        .then((response) => {
          console.log('response: ', response);
        });
    },
    onClickChild(value) {
      this.cartData.product = [1];
      console.log('click el hijo');
      const objPostProduct = {
        id: this.cartData.id,
        price: this.cartData.price,
        address: this.cartData.address,
        coupon: this.cartData.coupon,
        product: this.cartData.product,
      };
      this.addCart(objPostProduct);
      console.log(objPostProduct, value); // someValue
    },
  },
};
</script>
