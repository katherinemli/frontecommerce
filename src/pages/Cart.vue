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
            <q-item-label caption>
              ${{ product.price }}
              <q-icon name="delete" color="red" />
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
      <transition-group
        appear
        enter-active-class="animated fadeIn"
        leave-active-class="animated fadeOut"
      >
       <q-separator  v-bind:key="separator" size="0.15rem" spaced inset />
      <q-item v-bind:key="inputAddres">
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
      </q-item>
      <q-item v-bind:key="cardData">
        <q-input v-model="card"
        label="Card" mask="#### #### #### ####" fill-mask="0" hint="Card Number" />
      </q-item>
      <q-separator v-bind:key="separator2" size="0.15rem" spaced inset />

      </transition-group>
      <q-item>
        <q-item-section class="body-btn-car">
          <q-btn outline color="primary" label="Store" />
          <q-btn @click="buyAction" color="primary" label="Buy" />
        </q-item-section>
      </q-item>
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
      totalPrice: 0.0,
      coupon: 0.0,
      address: '',
      text: '',
      ph: '',
      dense: false,
      card: null,
      showPayment: false,
      separator: 'separator',
      inputAddres: 'inputAddres',
      cardData: 'cardData',
      separator2: 'separator2',
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
    buyAction() {
      this.showPayment = !this.showPayment;
      // this.$router.push('/payment');
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
