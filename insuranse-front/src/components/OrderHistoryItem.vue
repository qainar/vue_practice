<template>
  <div class="order">
    <div class="order__item">
<!--      <div class="order__item__id">-->
<!--        <h1 class="order__item__id-name">Страховка: {{ type || 'Жилье' }}</h1>-->
<!--        <p class="order__item__id-date">Дата создания: 25.12.21</p>-->
<!--      </div>-->
<!--      <div v-if="yearOfRelease" class="order__item__count">-->
<!--        <h1 class="order__item__count-name">Выпуск машины</h1>-->
<!--        <p class="order__item__count-piece">{{ yearOfRelease }} г.</p>-->
<!--      </div>-->
<!--      <div v-if="sale || priceOfCar" class="order__item__price">-->
<!--        <h1 class="order__item__price-name" v-if="sale">Стоимость жилья</h1>-->
<!--        <h1 class="order__item__price-name" v-else>Стоимость машины</h1>-->
<!--        <p class="order__item__price-price" v-if="sale">{{ formatterDay(sale) }}₸</p>-->
<!--        <p class="order__item__price-price" v-else>{{ formatterDay(priceOfCar) }}₸</p>-->
<!--      </div>-->
<!--      <div v-else-if="year || iin" class="order__item__price">-->
<!--        <h1 class="order__item__price-name">Размер страховка</h1>-->
<!--        <p class="order__item__price-price">{{ year }}</p>-->
<!--      </div>-->
<!--      <div v-if="year || iin" class="order__item__price">-->
<!--        <h1 class="order__item__price-name">ИИН</h1>-->
<!--        <p class="order__item__price-price">{{ iin }}</p>-->
<!--      </div>-->
<!--      <div v-if="period" class="order__item__price">-->
<!--        <h1 class="order__item__price-name">Срок страховки</h1>-->
<!--        <p class="order__item__price-price">{{ period }}</p>-->
<!--      </div>-->
<!--      <div v-if="typeHouse" class="order__item__price">-->
<!--        <h1 class="order__item__price-name">Тип жилья</h1>-->
<!--        <p class="order__item__price-price">{{ typeHouse }}</p>-->
<!--      </div>-->

      <div v-if="estateId" class="order__item__price lol">
        <div :key="estateId._id" class="">
          <div class="q-pa-md row items-start q-gutter-md">
            <q-card class="my-card" flat bordered>
              <q-img
                  src="https://cdn.quasar.dev/img/parallax2.jpg"
              />

              <q-card-section>
                <div class="text-overline text-orange-9">{{ estateId.rooms + ' комнатный' }}</div>
                <div class="text-overline text-red text-caption">{{ estateId._id }}</div>
                <div class="text-h5 q-mt-sm q-mb-xs">{{ estateId.name ? estateId.name : 'no name' }}</div>
                <div class="text-caption text-grey">
                  {{estateId.city + ', ' + estateId.country + ', ' + estateId.district}}
                </div>
                <div class="text-orange-9 q-mt-md text-bold">{{estateId.price + ' тг'}}</div>
              </q-card-section>

              <q-card-actions>
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
                    {{estateId.description}}
                  </q-card-section>
                </div>
              </q-slide-transition>
            </q-card>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: "OrderHistoryItem",
  props: {
    typeHouse: {},
    type: {},
    yearOfRelease: {},
    period: {},
    insuranceCount: {
      type: Number,
      required: true
    },
    priceOfCar: {
      type: Number,
    },
    sale: {
      type: String
    },
    year: {
      type: String
    },
    iin: {
      type: String
    },


    // userId: {},
    estateId: {}
  },
  data() {
    return {
      finish: 5,
      all: 7,
      expanded: false
    }
  },
  methods: {
    formatterDay(val) {
      return val.toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    }
  },
  computed: {
    getProcess() {
      return `${this.finish}/${this.all}`
    },
  }
}
</script>

<style scoped lang="scss">
.order {
  //width: 100%;
  background: #F7F8FA;
  border-radius: 8px;
  margin-bottom: 24px;
  cursor: pointer;

  &__item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 31px 40px;

    &__id {
      &-name {
        font-style: normal;
        font-weight: normal;
        font-size: 24px;
        line-height: 31px;
        color: #283039;
        margin: 0 0 3px;
      }

      &-date {
        font-style: normal;
        font-weight: normal;
        font-size: 16px;
        line-height: 20px;
        color: #B4B8BE;
        margin: 0;
      }
    }

    &__count {
      &-name {
        font-style: normal;
        font-weight: normal;
        font-size: 16px;
        line-height: 20px;
        color: #B4B8BE;
        margin: 0 0 4px;
      }

      &-piece {
        font-size: 16px;
        line-height: 20px;

        color: #283039;
        margin: 0;
      }
    }

    &__price {
      &-name {
        font-style: normal;
        font-weight: normal;
        font-size: 16px;
        line-height: 20px;
        color: #B4B8BE;
        margin: 0 0 4px;
      }

      &-price {
        font-size: 16px;
        line-height: 20px;

        color: #283039;
        margin: 0;
      }
    }

    &__status {
      &-name {
        font-style: normal;
        font-weight: normal;
        font-size: 20px;
        line-height: 25px;
        margin: 0;
      }

      &-success {
        color: #215FCE;
      }

      &-process {
        color: #ED8230;
      }

      &-treatment {
        color: #B4B8BE;
      }
    }

  }
}
</style>
