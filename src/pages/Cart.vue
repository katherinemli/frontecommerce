<template>
  <q-page class="q-pa-md">

    <q-list v-model="dataLoaded">
      <div v-for="product in productsData" :key="product.id">
        <q-item>
          <q-item-section>
            <q-item-label>{{ product.name }}</q-item-label>
            <q-item-label caption lines="2">
              {{ product.description }}
            </q-item-label>
          </q-item-section>

          <q-item-section side top>
            <q-item-label caption>5 min ago</q-item-label>
            <q-icon name="star" color="yellow" />
          </q-item-section>
        </q-item>

        <q-separator spaced inset />
      </div>

    </q-list>
  </q-page>
</template>

<script>
import { api } from 'boot/axios';

export default {
  name: 'Cart',
  data() {
    return {
      listProducts: [],
      productsData: [],
      dataLoaded: false,
    };
  },
  created() {
    api.get('/cart/2').then((response) => {
      console.log('axios1:', response);
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
