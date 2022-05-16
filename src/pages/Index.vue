<template>
 <q-page class="q-pa-md">
    <div class="body-cards" v-if="dataLoaded">
        <product-card
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
    };
  },
  beforeMount() {
    this.loadData();
  },
  methods: {
    loadData() {
      api.get('/api/')
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
  },
};
</script>
