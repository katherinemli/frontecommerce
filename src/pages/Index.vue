<template>
  <q-page class="q-pa-md">
    <div class="body-cards" v-if="dataLoaded">
      <product-card @clicked="onClickChild"
      v-for="product in listProducts" :key="product.id" :id="product.id"
        :name="product.name" :description="product.description" :price="product.price"
        :inventory="product.inventory_left">
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
      listImage: [],
    };
  },
  beforeMount() {
    this.loadData();
    this.loadCart();
  },
  methods: {
    loadCart() {
      api.get('/cart/1')
        .then((response) => {
          this.cartData = response.data;
        })
        .catch(() => {
        });
    },
    loadData() {
      api.get('/product/')
        .then((response) => {
          this.listProducts = [];
          response.data.map((x) => {
            const product = {};
            product.id = x.id;
            product.description = x.description;
            product.name = x.name;
            product.price = x.price;
            product.inventory_left = x.inventory_left;
            this.listProducts.push(product);
            return x;
          });
          this.dataLoaded = true;
        })
        .catch(() => {
        });
    },
    addCart(product, id) {
      api.put('/cart/1/', product)
        .then(() => {
          this.cartData.product.push(id);
          this.$emit('updateProductCount', 1);
        });
    },
    onClickChild(value) {
      const productIds = [];
      this.cartData.product.map((x) => {
        productIds.push(x);
        return x;
      });
      productIds.push(value);
      const objPostProduct = {
        id: this.cartData.id,
        price: this.cartData.price,
        address: this.cartData.address,
        coupon: this.cartData.coupon,
        product: productIds,
      };
      this.addCart(objPostProduct, value);
    },
  },
};
</script>
