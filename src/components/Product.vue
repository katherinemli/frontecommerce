<template>
    <q-card
       class="q-ma-sm cards-item">
      <q-img src="https://cdn.quasar.dev/img/chicken-salad.jpg" />

      <q-card-section>
        <q-btn
          fab
          color="primary"
          icon="place"
          class="absolute"
          style="top: 0; right: 12px; transform: translateY(-50%);"
        />

        <div class="row no-wrap items-center">
          <div class="col text-h6 ellipsis">
           {{name}}
          </div>
          <div class="col-auto text-grey text-caption q-pt-md row no-wrap items-center">
            <q-icon name="place" />
            250 ft
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

      <q-separator />

      <q-card-actions>
        <q-btn flat round icon="event" />
        <q-btn flat color="primary">
          Reserve:
        </q-btn>
      </q-card-actions>
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
};
export default {
  props,
  name: 'ProductCard',
  data() {
    return {
    };
  },
  watch: {
  },
};
</script>
