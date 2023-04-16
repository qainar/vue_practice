<template>
  <div class="main-block">

    <div class="first">
      <Header/>
      <div class="flex column items-center justify-center container">
        <p class="text-white text-h2 text-center text-weight-bold text-center" style="line-height: 80px">Добро пожаловать на наш сайт по аренде <br> и продаже недвижимости! </p>
        <p class="text-white text-h6 text-weight-medium text-center">Мы предлагаем широкий выбор жилья по различным параметрам,<br> чтобы помочь вам найти идеальный вариант для вашей жизни.</p>
        <div class="q-mt-md">
<!--          <q-btn color="primary" rounded no-caps class="text-weight-bold text-caption q-pa-sm q-mr-md">Get Quote Now</q-btn>-->
<!--          <q-btn outline rounded no-caps class="text-weight-bold text-caption q-pa-sm text-white" style="color: white">Подробнее узнать</q-btn>-->
        </div>
      </div>

      <div class="flex cards justify-center">
        <template v-for="card in cards">
          <UserCard :key="card.title" :title="card.title" :text="card.text"></UserCard>
        </template>
      </div>


    </div>


    <div class="flex cards-que justify-center">
      <template v-for="item in items">
        <QueCard :key="item.title" :icon="item.icon" :text="item.text" :title="item.title"/>
      </template>
    </div>

<!--    <div class="flex justify-around items-start icons q-mt-xl">-->
<!--      <template v-for="spons in sponsor" class="items-start">-->
<!--        <Sponsor :key="spons.icon" :icon="spons.icon"/>-->
<!--      </template>-->
<!--    </div>-->

    <div class="flex justify-around q-pl-md q-pr-md q-mt-xl gradient">
      <h4 class="text-weight-bold text-white" style="line-height: 32px; margin: 0">Подпишитесь на последние новости<br>
        новостная рассылка</h4>
      <div class="row">
        <q-input dark style="width: 300px" outlined v-model="text" label="Your Email" class="text-white" aria-placeholder="Your Email" />
        <div class="subscribe" style="height: 56px;">Subscribe</div>
      </div>
    </div>

<!--    <div class="">-->
<!--      <div class="flex items-center column">-->
<!--        <h2 class="text-weight-bold q-mb-md">Расценка</h2>-->
<!--        <p class="text-weight-light text-caption text-center" style="width: 400px">Problems trying to resolve the conflict between-->
<!--          the two major realms of Classical physics: Newtonian mechanics </p>-->
<!--      </div>-->

<!--      <div class="flex justify-center q-mt-xl items-center pricing">-->
<!--        <template v-for="price in prising" class="q-pa-md ">-->
<!--          <Prising :key="price.title" :title="price.title" :text="price.text" :price="price.price" :description="price.description" :to="price.to"/>-->
<!--        </template>-->
<!--      </div>-->

<!--    </div>-->

    <div class="feedback q-mt-xl ">
      <div class="info flex justify-around q-pt-xl">
        <div class="" style="width: 476px">
          <h2 class="text-weight-bold q-ma-none text-white" style="line-height: 57px">У нас есть филиалы
            <br>
            По всему миру
          </h2>
          <p class="text-caption text-white q-mt-lg text-weight-light" style="line-height: 20px">Если же вы ищете недвижимость для покупки,
            то мы также предлагаем большой выбор вариантов. Наши объекты находятся в разных районах,
            чтобы вы могли найти идеальный дом или квартиру, где вам будет комфортно жить. </p>
        </div>
        <div>
          <img src="../../src/assets/images/map.png">
        </div>
      </div>

      <Book/>

    </div>


    <Footer/>

  </div>
</template>

<script>
import Header from "./Header";
import UserCard from "./UserCard";
import QueCard from "./QueCard";
// import Sponsor from "./Sponsor";
// import Prising from "./Prising";
import Book from "./Book";
import Footer from "./Footer";
export default {
  name: "MainBlock",
  components: {Footer, Book, Header, UserCard, QueCard},
  data(){
    return{
      cards: [
        {
          title: 'Душевное спокойствие',
          text: 'Живите с удовольствием'
        },
        {
          title: 'Набор На Всю Жизнь',
          text: 'Одна покупка на всю жизнь'
        },
        {
          title: '100% Удовлетворение',
          text: 'Обретите счастье'
        }
      ],
      items:[
        {
          title: 'Если вы ищете аренду',
          text: 'то мы можем предложить вам множество вариантов на любой вкус и кошелек',
          icon: 'set'
        },
        {
          title: 'Выбери мечту',
          text: 'От уютных студий до просторных квартир и домов',
          icon: 'peace'
        },
        {
          title: 'В нашей базе представлены',
          text: 'объекты разных размеров и в разных районах',
          icon: 'users'
        }
      ],
      sponsor: [
        {
          icon: 'hooli'
        },
        {
          icon: 'lyft'
        },{
          icon: 'piperHat'
        },
        {
          icon: 'stripe'
        },
        {
          icon: 'aws'
        },
        {
          icon: 'reddit'
        }
      ],
      text: '',
      prising: [
        {
          to: '/car',
          title: 'Машина',
          text: 'Organize across all \n' +
              'apps by hand',
          price: 5,
          description: [
              'Unlimited product updates\n',
              'Unlimited product updates\n',
              'Unlimited product updates\n',
              'Unlimited product updates\n',
              'Unlimited product updates\n',
          ],
        },
        {
          to: '/life',
          title: 'Жизнь',
          text: 'Organize across all \n' +
              'apps by hand',
          price: 10,
          description: [
            'Unlimited product updates\n',
            'Unlimited product updates\n',
            'Unlimited product updates\n',
            'Unlimited product updates\n',
            'Unlimited product updates\n',
          ],
        },
        {
          to: '/property',
          title: 'Жилье',
          text: 'Organize across all \n' +
              'apps by hand',
          price: 8,
          description: [
            'Unlimited product updates\n',
            'Unlimited product updates\n',
            'Unlimited product updates\n',
            'Unlimited product updates\n',
            'Unlimited product updates\n',
          ],
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
  .main-block{
    .first{
      background-image: url("../../src/assets/images/background.png");
      background-repeat: no-repeat;
      background-size: 100%;
      height: 800px;
      padding: 0 200px 50px 200px;
    }
    .icons{
      padding: 0 200px 50px 200px;
    }
    .pricing{
      gap: 30px;
    }
    .gradient{
      background-image: linear-gradient(to right, #004788 , #D71489);
      padding: 30px;
    }
    .cards{
      margin-top: 200px;
      gap: 30px;
    }
  }
  .container{
    margin-top: 130px;
  }
  .feedback{
    background: #252B42;
    width: 100%;
    height: 807px;
    padding: 0 200px 50px 200px;
    margin-bottom: 360px;

  }
  .subscribe{
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 15px 22px;
    box-sizing: border-box;
    background: #23A6F0;
    border: 1px solid #E6E6E6;
    border-radius: 0px 5px 5px 0px;
    font-weight: 400;
    font-size: 14px;
    line-height: 28px;
    /* identical to box height, or 200% */

    text-align: center;
    letter-spacing: 0.2px;

    /* light-text-color */

    color: #FFFFFF;
  }

  .cards-que{
    margin-top: 350px;
  }
</style>