<template>
  <div class="q-mx-lg q-py-lg row">
    <div class="col-2">
      <ProfileCard></ProfileCard>
    </div>
    <div class="col-10">
      <q-splitter
          v-model="splitterModel"
      >

        <template v-slot:before>
          <q-tabs
              v-model="tab"
              vertical
              class="text-teal"
          >
            <q-tab name="mails" icon="mail" label="Заявки" />
            <q-tab v-if="isAdmin" name="alarms" icon="alarm" label="Добавление записи" />
            <q-tab v-if="isAdmin" name="users" icon="style" label="Пользователи" />
            <q-tab v-if="isAdmin" name="items" icon="style" label="Все заявки" />
          </q-tabs>
        </template>

        <template v-slot:after>
          <q-tab-panels
              v-model="tab"
              animated
              swipeable
              vertical
              transition-prev="jump-up"
              transition-next="jump-up"
          >
            <q-tab-panel name="mails">
                <UserOrders :orders-list="orders"></UserOrders>
            </q-tab-panel>

            <q-tab-panel name="alarms">
                <CreateEstate/>
            </q-tab-panel>

            <q-tab-panel name="users">
              Пользователи
              <Users/>
<!--              <div class="text-h4 q-mb-md"></div>-->
            </q-tab-panel>

            <q-tab-panel name="items">
              <Items/>
            </q-tab-panel>
          </q-tab-panels>
        </template>

      </q-splitter>
    </div>
  </div>
</template>

<script>
import ProfileCard from "@/components/ProfileCard";
import UserOrders from "@/components/userOrders";
import Users from "@/components/Users";
import {mapActions, mapGetters} from "vuex";
import CreateEstate from "@/components/CreateForms/CreateEstate";
import Items from "@/components/Items";

export default {
  name: "index",
  components: {Items, CreateEstate, UserOrders, ProfileCard, Users},
  data: () => ({
    // tabs: [
    //   {
    //     id: 0,
    //     title: 'Мои заказы',
    //     to: '/userOrders',
    //   }, {
    //     id: 1,
    //     title: 'Заказы под реализацию',
    //     to: '/ordersRealization'
    //   }, {
    //     id: 2,
    //     title: 'Способы оплаты',
    //     to: '/payMethods'
    //   }, {
    //     id: 3,
    //     title: 'Адреса доставки',
    //     to: '/addressDelivery'
    //   }, {
    //     id: 4,
    //     title: 'Персонал',
    //     to: '/personal'
    //   },
    // ],
    tab: 'mails',
    showSettings: true,
    tabsIndex: 0,
    splitterModel: 20
  }),
  mounted() {
    // this.allInsurances()
    this.allOrders()
  },
  methods: {
    ...mapActions({
      // allInsurances: 'allInsurance',
      allOrders: 'getOrderByUser'
    }),
    toProduct(i) {
      this.$router.push({name: "orderDetails", params: {id: i}});
    },
  },
  computed: {
    ...mapGetters({
      // insurances: 'getInsurances',
      orders: 'getOrders',
      profile: 'getProfile'
    }),
    isAdmin() {
      return this.profile.role === 'admin'
    }
  }
}
</script>

<style scoped>

</style>