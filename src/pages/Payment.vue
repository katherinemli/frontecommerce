<template>
  <q-page class="q-pa-md">
    <q-list>
      <div v-for="product in productsData.product" :key="product.id">
        <q-item v-if="product.inventory_left > 0">
          <q-item-section>
            <q-item-label class="flex">
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
        <q-separator spaced inset />
      </div>
      <q-item class="total-price">
        <div style="float: right;" class="text-h5">{{ productsData.price }}</div>
        <q-item-label caption>
          total price
        </q-item-label>
      </q-item>
      <q-item>
        <q-item-section class="body-btn-car">
          <q-btn @click="toIndex" outline color="primary" label="Store" />
        </q-item-section>
      </q-item>
    </q-list>
  </q-page>
</template>

<script>

const props = {
  productsData: {
    type: Object,
    default: {},
  },
};
export default {
  props,
  name: 'Payment',
  data() {
    return {
      listProducts: [],
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
  },
  beforeMount() {
    if (this.productsData
      && Object.keys(this.productsData).length === 0
      && Object.getPrototypeOf(this.productsData) === Object.prototype) {
      this.$router.push('/').catch(() => { });
    }
  },
  methods: {

    toIndex() {
      this.$router.push('/').catch(() => { });
    },
  },
};
</script>
