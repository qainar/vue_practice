<template>
  <div class="q-mt-xl">
    <h3 class="text-weight-bold text-center">Создать невдижимость</h3>

    <div class="flex justify-center">
      <div class="" style="width: 700px">

        <div class="q-pb-md">
          <label class="text-body1 text-weight-medium">Название</label>
          <q-input outlined label="Название" class="q-mt-sm" v-model="PropertyData.name"/>
        </div>

        <div class="q-pb-md">
          <label class="text-weight-medium text-body1">Тип невдижимость</label>
          <q-select outlined v-model="PropertyData.type" :options="PropertyData.options" label="Выберите тип" class="q-mt-sm"/>
        </div>

        <div class="q-pb-md">
          <label class="text-body1 text-weight-medium">Район</label>
          <q-input outlined label="Район" class="q-mt-sm" v-model="PropertyData.district"/>
        </div>

        <div class="q-pb-md">
          <label class="text-body1 text-weight-medium">Рыночная стоимость</label>
          <q-input outlined label="Стоимость" class="q-mt-sm" v-model="PropertyData.price"/>
        </div>

        <div class="q-pb-md">
          <label class="text-body1 text-weight-medium">Кол-во комнат</label>
          <q-input outlined label="Кол-во комнат" class="q-mt-sm" v-model="PropertyData.rooms"/>
        </div>

        <div class="q-pb-md">
          <label class="text-body1 text-weight-medium">Страна</label>
          <q-input outlined label="Страна" class="q-mt-sm" v-model="PropertyData.country"/>
        </div>

        <div class="q-pb-md">
          <label class="text-body1 text-weight-medium">Город</label>
          <q-input outlined label="Город" class="q-mt-sm" v-model="PropertyData.city"/>
        </div>

        <div class="q-pb-md">
          <label class="text-body1 text-weight-medium">Описание</label>
          <q-input outlined label="Описание" class="q-mt-sm" v-model="PropertyData.description"/>
        </div>

        <q-toggle v-model="PropertyData.isRent" label="Аренда"/>


        <div class="q-mt-md">
          <q-banner class="bg-green bannerr text-center q-mb-md text-white" v-if="isFinish">Вы успешно создали недвижимость для продажи/аренды!</q-banner>
          <q-btn @click="setProperty" label="Book Appointment" type="submit" color="primary" class="full-width q-pa-sm " size="md"/>
        </div>

      </div>
    </div>


  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "CreateEstate",
  computed: {
    ...mapGetters({
      profile: 'getProfile'
    })
  },
  methods: {
    ...mapActions({
      estate: 'createEstates'
    }),
    setProperty() {
      console.log(this.PropertyData)
      this.estate({
        data: this.PropertyData,
        callback: () => {
          this.isFinish = true
        }
      })
    }

  },
  data() {
    return{
      isFinish:false,
      PropertyData:{
        name: '',
        type: '',
        district: '',
        price: '',
        rooms: '',
        country: '',
        city: '',
        userId: null,
        description: '',
        isRent: false,
        options: ["Квартира", "Дом", "Офис", "Участок", "Торговые здания"]
      },
    }
  },
  mounted() {
    // this.PropertyData.userId = this.profile.user.id
    console.log(this.profile)
    console.log(this.PropertyData)
  }
}
</script>
<style scoped  lang="scss">
.bannerr{
  border-radius: 15px;
}
</style>