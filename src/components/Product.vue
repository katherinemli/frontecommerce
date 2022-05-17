<template>
    <q-card
       class="q-ma-sm cards-item">
      <q-img src="https://cdn.quasar.dev/img/chicken-salad.jpg" />

      <q-card-section>
        <q-btn
          fab
          color="primary"
          icon="add_shopping_cart"
          class="absolute"
          @click="onClickButton"
          style="top: 0; right: 12px; transform: translateY(-50%);"
        />

        <div class="row no-wrap items-center">
          <div class="col text-h6 ellipsis">
           {{name}}
          </div>
          <div class="col-auto text-grey text-caption q-pt-md row no-wrap items-center">
            <q-icon name="shopping_bag" />
            {{inventory}} left
          </div>
        </div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <div class="text-subtitle1">
         {{description}}
        </div>
        <div class="text-caption text-grey">
          {{price}}
        </div>
      </q-card-section>
    </q-card>
</template>

<script>

const props = {
  id: {
    type: Number,
    default: 0,
  },
  name: {
    type: String,
    default: '',
  },
  description: {
    type: String,
    default: '',
  },
  price: {
    type: Number,
    default: 0,
  },
  inventory: {
    type: Number,
    default: 0,
  },
  cart: {
    type: Object,
    default() {
      return {};
    },
  },
};
export default {
  props,
  name: 'ProductCard',
  data() {
    return {
    };
  },
  methods: {
    onClickButton() {
      console.log('this.id', this.id);
      this.$emit('clicked', this.id);
    },

  },
  watch: {
  },
};
</script>
