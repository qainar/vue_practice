<template>

  <div class="main">

    <div class="main-block">
      <div class="wrapper">
        <div class="inner">
          <Header/>
          <div class="flex column items-center justify-center container">
            <p class="text-white text-h2 text-weight-bold" style="line-height: 80px">Аренда недвижимости</p>
            <p class="text-white text-h6 text-weight-medium text-center" style="width: 700px">Аренда недвижимости - удобное и популярное решение для тех, кто не готов или не может покупать жилье.
              На нашей платформе вы можете найти различные варианты аренды недвижимости - от квартир и комнат до домов и вилл. Мы предоставляем широкий
              выбор недвижимости в различных городах и странах, а также гибкие условия аренды, которые удовлетворят любые потребности и бюджет.</p>
            <div class="q-mt-md">
              <q-btn color="primary" rounded no-caps class="text-weight-bold text-caption q-pa-sm q-mr-md">Рассчитать и оформить</q-btn>
            </div>
          </div>
        </div>
      </div>

    </div>

    <div class="advantages">

      <div class="wrapper">
        <h4 class="text-weight-bold text-center q-mt-xl">Наши преимущества</h4>

        <div class="flex cards justify-around">
          <template v-for="item in items">
            <Advantages is-car :key="item.text" :icon="item.icon" :text="item.text"/>
          </template>
        </div>

      </div>

    </div>

    <div class="trust">
      <div class="wrapper flex column items-center">
        <div class="content q-mt-xl">
          <h4>Более 100 000 Казахстанцев уже доверили нам свои квартиры, дома и дачи.</h4>
          <div class="q-mt-md">
            <q-btn color="primary" no-caps class="text-weight-bold text-caption q-pa-sm q-mr-md">Рассчитать и оформить</q-btn>
          </div>
        </div>

      </div>
    </div>

    <div class="advantages">

      <div class="wrapper">
        <h4 class="text-weight-bold text-center q-mt-xl">Наши преимущества</h4>

        <div class="flex cards justify-around">
          <template v-for="item in options">
            <Advantages :key="item.text" :icon="item.icon" :text="item.text"/>
          </template>
        </div>

      </div>

    </div>

<!--    <div class="create">-->
<!--      <CreateCar class="wrapper"/>-->
<!--    </div>-->
    <div class="">
      <Estates class="wrapper"/>
    </div>



    <Footer/>

  </div>
</template>

<script>
import Header from "../../components/Header";
import Advantages from "../../components/Advantages";
import Footer from "../../components/Footer";
// import CreateCar from "../../components/CreateForms/CreateCar";
import Estates from "@/components/Estates";
export default {
  name: "Estate",
  components: {Footer, Advantages, Header, Estates},

  data(){
    return{
      options: [
        {
          icon: 'comp',
          text: 'Без отделений и очередей'
        },
        {
          icon: 'calendar',
          text: 'Помесячная оплата КАСКО'
        },
        {
          icon: 'shild',
          text: 'Полное покрытие всех рисков'
        },
        {
          icon: 'done',
          text: 'Удобные тарифы – вы сами выбираете интересующие вас опции'
        },
        // {
        //   icon: 'umbrella',
        //   text: 'Защита автомобиля во всех странах СНГ'
        // },
        {
          icon: 'time',
          text: 'Рекордно быстрые и удобные страховые выплаты'
        },
      ],
      items: [
        {
          icon: 'dtp',
          text: 'Команда профессионалов с большим опытом работы'
        },
        {
          icon: 'robber',
          text: 'Поможем вам найти и выбрать лучший вариант'
        },
        {
          icon: 'mirror',
          text: 'Подробная информация о каждом объекте'
        },
        {
          icon: 'brick',
          text: 'Включая фотографии и описание'
        },
        {
          icon: 'tornado',
          text: 'Поможем сделать правильный выбор'
        },
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.main-block{
  background-image: url('https://www.nsk.kz/media/products/2t/1487074363kily1.jpg');
  background-repeat: no-repeat;
  position: relative;
  background-size: 100%;
  height: 750px;

  &:after{
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0,0,0,.5);
    z-index: 2;
  }
  .inner{
    position: relative;
    z-index: 3;
    color: #fff;
    text-align: center;
  }
  .container{
    margin-top: 130px;
  }

}
.wrapper{
  padding: 0 200px 50px 200px;
}
.content{
  width: 675px;
}
.cards{
  gap: 30px;
}
.trust{
  background-image: url("https://www.nsk.kz/media/products/jp/1544517036vyadw.png");
  background-repeat: no-repeat;
  position: relative;
  background-size: 100%;
  height: 420px;
}
</style>