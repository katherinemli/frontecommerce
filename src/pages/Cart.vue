<template>
  <q-page class="q-pa-md">

    <q-list v-model="dataLoaded">
      <div v-for="product in productsData" :key="product.id">
        <q-item v-if="product.inventory_left > 0">
          <q-item-section>
            <q-item-label class="flex">
              <q-icon @click="deleteElement(product.id)" name="delete" color="red" />
              <div class="name-cart">
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
        <q-item v-else>
          <q-item-section>
            <q-item-label class="flex">
              <q-icon name="delete" @click="deleteElement(product.id)" color="red" />
              <div>
                {{ product.name }}
              </div>
            </q-item-label>
            <q-item-label caption lines="2">
              {{ product.description }}
            </q-item-label>
            <q-item-label caption lines="2">
              <div class="text-overline text-red-9">No stock of this product.</div>
            </q-item-label>
          </q-item-section>

          <q-item-section side top>
            <q-item-label style="text-decoration: line-through;" caption>
              ${{ product.price }}
            </q-item-label>
          </q-item-section>
        </q-item>
        <q-separator spaced inset />
      </div>
      <q-item v-if="cuponNanmeShow" class="total-price">
        <q-input error-message="Required"
        :error="!isValidCouponEntry" v-model="text" :label="cuponValue"
          hint="type name" />
      </q-item>
      <q-item v-else class="total-price">
        <q-spinner-hourglass color="primary" size="2em" />
        Wait for get a discount
      </q-item>
      <q-item v-if="isValidCouponEntry" class="total-price">
        <div style="float: right;" class="text-h5">{{ totalPriceNoDiscount }}</div>
        <q-item-label caption>
          price before discount
        </q-item-label>
      </q-item>
      <q-item class="total-price">
        <div style="float: right;" class="text-h5">{{ totalPrice }}</div>
        <q-item-label caption>
          price after discount
        </q-item-label>
      </q-item>
      <transition-group appear
      enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
        <q-separator v-bind:key="separator" size="0.15rem" spaced inset />
        <q-item class="data-buy" v-bind:key="inputAddres">
          <q-input v-model="address"
          :error="!isValidAddress" error-message="Required" label="Address" hint="Address" />
        </q-item>
        <q-item class="data-buy" v-bind:key="cardData">
          <q-input v-model="card"
          error-message="Required" :error="!isValidCard" label="Card" mask="#### #### #### ####"
            fill-mask="" hint="Card Number" />
        </q-item>
        <q-separator v-bind:key="separator2" size="0.15rem" spaced inset />

      </transition-group>
      <q-item>
        <q-item-section class="body-btn-car">
          <q-btn @click="toIndex" outline color="primary" label="Store" />
          <q-btn @click="buyAction"
          color="primary" :disable="!isValidCard || !isValidAddress || buyOn" label="Buy" />
        </q-item-section>
      </q-item>
    </q-list>
    <div v-if="!dataLoaded">
      cargando
    </div>
  </q-page>
</template>

<script>
import { api } from 'boot/axios';
// outside of a Vue file

export default {
  name: 'Cart',
  data() {
    return {
      discountApi: 1.0,
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
      cartData: {},
      allDataBuy: false,
      buyOn: false,
      cuponNanme: '',
      cuponNanmeShow: false,
      couponEntry: false,
      totalPriceNoDiscount: 0,
    };
  },
  watch: {
    // whenever question changes, this function will run
    text(newCoupon) {
      if (newCoupon.length > 0) {
        if (newCoupon === this.cuponValue) {
          this.totalPrice -= (
            this.totalPrice * this.discountApi
          );
        } else {
          this.totalPrice = this.totalPriceNoDiscount;
        }
      } else {
        this.totalPrice = this.totalPriceNoDiscount;
      }
    },
    totalPrice() {
      this.totalPrice = parseFloat(this.totalPrice).toFixed(2);
      this.totalPriceNoDiscount = parseFloat(this.totalPriceNoDiscount).toFixed(2);
    },
  },
  computed: {
    isValidCouponEntry() {
      if (this.text.length > 0) {
        if (this.text === this.cuponValue) {
          return true;
        }
        return false;
      }
      return true;
    },
    isValidCard() {
      if (this.card) {
        const indices = this.getIndicesOf('_', this.card);
        if (indices.length === 0) {
          return true;
        }
      }
      return false;
    },
    isValidAddress() {
      if (this.address.length) {
        return true;
      }
      return false;
    },
  },
  beforeDestory() {
    clearInterval();
  },
  created() {
    if (this.text.length === 0) {
      this.interval = setInterval(() => this.getCoupon(), 15000);
    }
  },
  beforeMount() {
    this.asynCalls();
  },
  methods: {
    toIndex() {
      this.$router.push('/').catch(() => { });
    },
    asynCalls() {
      api.get('/cart/1').then((response) => {
        this.coupon = response.data.coupon;
        this.listProducts = response.data.product;
        this.dataLoaded = true;
        const urlProducts = [];
        this.cartData = response.data;
        this.listProducts.forEach((idProduct) => {
          urlProducts.push(api.get(`/product/${idProduct}`));
        });
        this.$axios.all(urlProducts)
          .then(this.$axios.spread((...responseProduct) => {
            this.productsData = responseProduct.map((element) => {
              if (element.data.inventory_left > 0) {
                this.totalPrice += element.data.price;
                this.totalPriceNoDiscount += element.data.price;
              }
              return element.data;
            });
          }))
          .catch(() => {
          });
      });
    },
    deleteElement(idProducto) {
      this.totalPrice = 0;
      const productsDataId = this.productsData.filter(
        (obj) => obj.id !== idProducto,
      )
        .map((obj) => {
          this.totalPrice += obj.price;
          return obj.id;
        });
      this.productsData = this.productsData.filter(
        (obj) => obj.id !== idProducto,
      );
      const objPostCart = {
        id: this.cartData.id,
        price: this.totalPrice,
        address: this.address,
        coupon: this.cartData.coupon,
        product: productsDataId,
      };
      api.put('/cart/1/', objPostCart)
        .then(() => {
          this.$emit('deleteProductCount', this.productsData.length);
        });
    },
    getIndicesOf(searchStr, str, caseSensitive) {
      const searchStrLen = searchStr.length;
      if (searchStrLen === 0) {
        return [];
      }
      let startIndex = 0;
      let index = 0;
      const indices = [];
      if (!caseSensitive) {
        str = str.toLowerCase();
        searchStr = searchStr.toLowerCase();
      }
      // eslint-disable-next-line no-cond-assign
      while ((index = str.indexOf(searchStr, startIndex)) > -1) {
        indices.push(index);
        startIndex = index + searchStrLen;
      }
      return indices;
    },
    getCoupon() {
      const randomDiscount = Math.floor(Math.random() * (9 - 1 + 1) + 1);

      api.get(`/coupon/${randomDiscount}`)
        .then((response) => {
          this.cuponValue = response.data.name;
          this.discountApi = response.data.discount;
          this.cuponNanmeShow = true;
        });
    },
    inventoryAction() {
      const urlProducts = [];
      const productsDataId = this.productsData.filter(
        (obj) => obj.inventory_left > 0,
      )
        .map((obj) => {
          this.totalPrice += obj.price;
          return obj.id;
        });
      productsDataId.forEach((idProduct) => {
        urlProducts.push(api.put(`/product/${idProduct}/`));
      });
      this.$axios.all(urlProducts)
        .then(this.$axios.spread(() => {
        }))
        .catch(() => {
        });
    },
    buyAction() {
      this.buyOn = true;
      const objPostCart = {
        id: this.cartData.id,
        price: this.cartData.price,
        address: this.address,
        coupon: this.cartData.coupon,
        product: [],
      };
      const paymentViewData = {
        id: this.cartData.id,
        price: this.totalPrice,
        totalPriceNoDiscount: this.totalPriceNoDiscount,
        address: this.address,
        coupon: this.cartData.coupon,
        product: this.productsData,
      };
      if (this.isValidCard && this.isValidAddress) {
        api.put('/cart/1/', objPostCart)
          .then(() => {
            this.buyOn = false;
            this.totalPrice = 0;
            this.inventoryAction();
            this.$q.notify(
              {
                type: 'positive',
                message: 'SUCCESSFUL PURCHASE',
              },
            );
            this.productsData = this.productsData.filter(
              (value) => value.inventory_left === 0,
            );
            this.$emit('deleteProductCount', this.productsData.length);
            // this.$router.push('/payment');
            this.$router.push({ name: 'payment', params: { productsData: paymentViewData } });
          });
      }
    },
    onClickChild() {
      // this.addCart(objPostProduct);
    },
  },
};
</script>
