<template>
  <div class="home">
    <!-- <img src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <Navbar/>
    <Hero/>

    <div class="container is-fluid">
      <div class="columns is-multiline">
        <!-- <div  v-for="(item,index) in allItem" :key="index"  class="column is-one-third"> -->
          <div  v-for="(item,index) in showCases" :key="index"  class="column is-one-third">
           <Card :item="item"></Card>

        </div>
      </div>
    </div>

  </div>
</template>

<script>
// @ is an alias to /src
import { mapActions, mapState} from 'vuex'
import HelloWorld from '@/components/HelloWorld.vue'
import Navbar from '@/components/Navbar.vue'
import Card from '@/components/Card.vue'
import Hero from '@/components/Hero.vue'

export default {
  name: 'home',
  created:function(){
    this.showAllItems()
  },
  computed:{
    ...mapState([
      'showCases'
    ])
  },
  data:function(){
    return{
      allItem:''
    }
  },
  components: {
    HelloWorld,
    Navbar,
    Card,
    Hero
  },
  methods:{
    ...mapActions([
      'showAllItems'
    ])
  }
}
</script>

<style>
/* .home{
  background-image: url('../assets/background.png')
} */
</style>

