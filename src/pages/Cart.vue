<template>
 <q-page class="q-pa-md">
   {{listProducts}}
 <q-list v-model="dataLoaded">
 <div  v-for="product in listProducts" :key="product.id">
      <q-item>
        <q-item-section>
          <q-item-label>Single line item</q-item-label>
          <q-item-label caption lines="2">
            Secondary line text. Lorem ipsum dolor sit amet, consectetur adipiscit elit.
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
      dataLoaded: false,
    };
  },
  beforeMount() {
    this.loadData();
  },
  methods: {
    loadData() {
      api.get('/cart/2')
        .then((response) => {
          console.log('cart: ', response);
          this.listProducts = response.data.product;
          this.dataLoaded = true;
        })
        .catch(() => {
          console.log('error: ');
        });
    },
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
