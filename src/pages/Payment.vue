<template>
  <q-page class="q-pa-md">
    <q-list>
      <div v-for="product in productsData" :key="product.id">
        <q-item>
          <q-item-section>
            <q-item-label class="flex">
              <q-icon @click="deleteElement(product.id)" name="delete" color="red" />
              <div>
                {{ product.name }}
              </div>
            </q-item-label>
            <q-item-label caption lines="2">
              {{ product.description }}
            </q-item-label>
            <q-item-label caption lines="2">
             Available items: {{ product.inventory_left }}
            </q-item-label>
          </q-item-section>

          <q-item-section side top>
            <q-item-label caption>
              ${{ product.price }}
            </q-item-label>
          </q-item-section>
        </q-item>
        <q-separator spaced inset />
      </div>
      <q-item class="total-price">
        <div v-if="coupon" style="float: right;" class="text-h7">{{ coupon }}%</div>
        <div v-else style="float: right;" class="text-h7">Get Coupon</div>
      </q-item>
      <q-item class="total-price">
        <div style="float: right;" class="text-h5">{{ totalPrice }}</div>
      </q-item>
      <q-item class="total-price">
        <div style="float: right;" class="text-h5">{{ totalPrice }}</div>
      </q-item>
      <q-item>
        <q-item-section class="body-btn-car">
          <q-btn outline color="primary" label="Store" />
        </q-item-section>
      </q-item>
    </q-list>
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
