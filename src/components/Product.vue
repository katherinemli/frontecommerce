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
            100 left
          </div>
        </div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <div class="text-subtitle1">
         {{description}}
        </div>
        <div class="text-caption text-grey">

        </div>
      </q-card-section>
    </q-card>
</template>

<script>

const props = {
  name: {
    type: String,
    default: '',
  },
  description: {
    type: String,
    default: '',
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
    onClickButton(event) {
      console.log('clicked', event);
      this.$emit('clicked', 'someValue');
    },

  },
  watch: {
  },
};
</script>
