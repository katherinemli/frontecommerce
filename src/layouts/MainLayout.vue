<template>
  <q-layout view="hHr lpR fFf">
    <q-header reveal class="bg-primary text-white">
      <q-toolbar>
        <!--         <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        /> -->

        <q-toolbar-title>
          <q-btn flat @click="toIndex" color="white" label="Katherine&TripElephant" />
        </q-toolbar-title>

        <div>
          <q-icon @click="toShoppingCart" size="lg" name="shopping_cart" color="white">
            <q-badge color="positive" floating>{{ productInCart }}</q-badge>
          </q-icon>
        </div>
      </q-toolbar>
    </q-header>
    <q-drawer v-model="leftDrawerOpen" side="left">
      <!-- drawer content -->
    </q-drawer>
    <q-page-container>
      <router-view @updateProductCount="onClickAdd" @deleteProductCount="onClickDelete" />
    </q-page-container>
  </q-layout>
</template>

<script>
import { api } from 'boot/axios';

const linksData = [
  {
    title: 'Docs',
    caption: 'quasar.dev',
    icon: 'school',
    link: 'https://quasar.dev',
  },
  {
    title: 'Github',
    caption: 'github.com/quasarframework',
    icon: 'code',
    link: 'https://github.com/quasarframework',
  },
  {
    title: 'Discord Chat Channel',
    caption: 'chat.quasar.dev',
    icon: 'chat',
    link: 'https://chat.quasar.dev',
  },
  {
    title: 'Forum',
    caption: 'forum.quasar.dev',
    icon: 'record_voice_over',
    link: 'https://forum.quasar.dev',
  },
  {
    title: 'Twitter',
    caption: '@quasarframework',
    icon: 'rss_feed',
    link: 'https://twitter.quasar.dev',
  },
  {
    title: 'Facebook',
    caption: '@QuasarFramework',
    icon: 'public',
    link: 'https://facebook.quasar.dev',
  },
  {
    title: 'Quasar Awesome',
    caption: 'Community Quasar projects',
    icon: 'favorite',
    link: 'https://awesome.quasar.dev',
  },
];

export default {
  name: 'MainLayout',
  components: {
  },
  beforeMount() {
    this.loadData();
  },
  data() {
    return {
      leftDrawerOpen: false,
      essentialLinks: linksData,
      productInCart: 0,
    };
  },
  methods: {
    onClickAdd(value) {
      this.productInCart += value;
    },
    onClickDelete(value) {
      this.productInCart = value;
    },
    loadData() {
      api.get('/cart/1')
        .then((response) => {
          this.productInCart = response.data.product.length;
        })
        .catch(() => {
        });
    },
    toShoppingCart() {
      this.$router.push('/cart').catch(() => { });
    },
    toIndex() {
      this.$router.push('/').catch(() => { });
    },
  },
};
</script>
