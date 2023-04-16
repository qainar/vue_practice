<template>
  <div>
    <h1>Все заявки</h1>
    <div class="flex">
      <div v-for="item in items" :key="item._id" class="">
        <div class="q-pa-md row items-start q-gutter-md">
          <q-card class="my-card" flat bordered>
            <q-img
                src="https://cdn.quasar.dev/img/parallax2.jpg"
            />

            <q-card-section>
              <div class="text-overline text-orange-9">{{ item.estateId.rooms + ' комнатный' }}</div>
              <div class="text-overline text-red text-caption">{{ item.estateId._id }}</div>
              <div class="text-h5 q-mt-sm q-mb-xs">{{ item.estateId.name ? item.estateId.name : 'no name' }}</div>
              <div class="text-caption text-grey">
                {{item.estateId.city + ', ' + item.estateId.country + ', ' + item.estateId.district}}
              </div>
              <div class="text-orange-9 q-mt-md text-bold">Цена {{item.estateId.price + ' тг'}}</div>

              <div class="text-caption text-grey"> {{item.estateId.description}}</div>

              <p class="q-mt-md text-caption">Информация о пользователе</p>
              <div class="text-caption text-grey"> {{item.userId.name}}</div>
              <div class="text-caption text-grey"> {{item.userId.number}}</div>
              <div class="text-caption text-grey"> {{item.userId.email}}</div>
            </q-card-section>

<!--            <q-card-actions>-->
<!--              <q-space />-->

<!--              <q-btn-->
<!--                  color="grey"-->
<!--                  round-->
<!--                  flat-->
<!--                  dense-->
<!--                  :icon="expanded ? 'keyboard_arrow_up' : 'keyboard_arrow_down'"-->
<!--                  @click="expanded = !expanded"-->
<!--              />-->
<!--            </q-card-actions>-->

<!--            <q-slide-transition>-->
<!--              <div v-show="expanded">-->
<!--                <q-separator />-->
<!--                <q-card-section class="text-subitle2">-->
<!--                  {{item.estateId.description}}-->
<!--                </q-card-section>-->
<!--              </div>-->
<!--            </q-slide-transition>-->
          </q-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "Items",
  computed: {
    ...mapGetters({
      items: 'getAllOrders'
    })
  },
  created() {
    this.fetchItems()
  },
  methods: {
    ...mapActions({
      fetchItems: 'getOrders'
    })
  },
  data() {
    return {
        expanded: false
    }
  }
}
</script>

<style scoped>

</style>