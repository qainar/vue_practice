<template>
  <div>
    <h1>Недвижимости для {{isRent === true ? 'аренды' : 'покупки'}}</h1>
    <div class="flex">
      <div v-for="estate in estates" :key="estate._id" class="">
        <div class="q-pa-md row items-start q-gutter-md">
          <q-card class="my-card" flat bordered>
            <q-img
                src="https://cdn.quasar.dev/img/parallax2.jpg"
            />

            <q-card-section>
              <div class="text-overline text-orange-9">{{ estate.rooms + ' комнатный' }}</div>
              <div class="text-overline text-red text-caption">{{ estate._id }}</div>
              <div class="text-h5 q-mt-sm q-mb-xs">{{ estate.name ? estate.name : 'no name' }}</div>
              <div class="text-caption text-grey">
                {{estate.city + ', ' + estate.country + ', ' + estate.district}}
              </div>
              <div class="text-orange-9 q-mt-md text-bold">{{estate.price + ' тг'}}</div>
            </q-card-section>

            <q-card-actions>
              <q-btn flat color="dark" label="Поделиться" size="sm"/>
              <q-btn flat color="primary" label="Оставить заявку" size="sm" @click="onCreateOrder(estate._id)"/>

              <q-space />

              <q-btn
                  color="grey"
                  round
                  flat
                  dense
                  :icon="expanded ? 'keyboard_arrow_up' : 'keyboard_arrow_down'"
                  @click="expanded = !expanded"
              />
            </q-card-actions>

            <q-slide-transition>
              <div v-show="expanded">
                <q-separator />
                <q-card-section class="text-subitle2">
                  {{estate.description}}
                </q-card-section>
              </div>
            </q-slide-transition>
          </q-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'Estates',
  computed: {
    ...mapGetters({
      estates: 'getEstates',
    }),
  },
  created() {
    this.fetchEstates(this.isRent);
  },
  methods: {
    ...mapActions({
      fetchEstates: 'getEstates',
      createOrder: 'createOrder'
    }),
    onCreateOrder(estate_id){
      const order = {
        estateId: estate_id
      }

      this.createOrder({order: order.estateId, callback: this.onOrderCreated})
    },
    onOrderCreated() {
      // Логика, которая выполнится после успешного создания заказа
      console.log('Order created')
    },
  },
  data () {
    return {
      expanded:false,
      sizes: [ 'xs',],
      isRent: this.$route.query.isRent
    }
  },

};
</script>

<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 350px
</style>
