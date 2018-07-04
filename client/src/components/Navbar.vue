<template>
<div class="navbarandmodal">

<nav class="navbar is-transparent">
  <div class="navbar-brand">
    <a class="navbar-item" href="">
      <router-link to="/home"><img src="../assets/logosmall.png" alt="HelloKitty" width="112" height="28"></router-link>
    </a>
    <div class="navbar-burger burger" data-target="navbarExampleTransparentExample">
      <span></span>
      <span></span>
      <span></span>
    </div>
  </div>  

  <div id="navbarExampleTransparentExample" class="navbar-menu">
    <div class="navbar-start">
      <a  @click="register" v-show="$route.path!=='/register'" id="registerbutton" class="navbar-item" >
        Register
      </a>
      <div v-if="this.username=='admin'" class="navbar-item has-dropdown is-hoverable">
        <a class="navbar-link" >
          Admin
        </a>
        <div class="navbar-dropdown is-boxed">

          <router-link to="/admin"><a v-if="this.username=='admin'" class="navbar-item">
           Admin
          </a></router-link>
          <!-- <hr class="navbar-divider"> -->
        </div>
      </div>
    </div>

    <div class="navbar-end">
      <div class="navbar-item">
        <div class="field is-grouped">
          <p class="control">
            <a class="bd-tw-button button" data-social-network="Twitter" data-social-action="tweet" data-social-target="http://localhost:4000" target="_blank" href="https://twitter.com/intent/tweet?text=Check out this Ecommerce page&amp;hashtags=webdeveloper&amp;url=http://localhost:4000&amp;">
              <span class="icon">
                <i class="fab fa-twitter"></i>
              </span>
              <span>
                Tweet
              </span>
            </a>
          </p>
           <p v-if="this.userid==null" class="control">
            <button aria-haspopup="true" class="button">
              <span><router-link to="/login">Login</router-link></span>
            </button>
          </p>
          <p v-if="this.userid!==null" class="control">
            <router-link to="/login"><button id="logoutbutton" @click ="logout" aria-haspopup="true" class="button">
              <span class="icon">
                <i class="fas fa-user"></i>
              </span>
              <span>Logout</span>
            </button></router-link>
          </p>
          <p class="control">
            <button v-if="this.userid!==null" id="buttonCart" @click="activateModal" aria-haspopup="true" class="button is-danger" >
              <span class="icon">
                <i class="fas fa-shopping-cart"></i>
              </span>
              <span>Cart</span>
            </button>
          </p>
        </div>
      </div>
    </div>
  </div>
</nav>

<!--MODAL-->
<div class="modal">
  <div class="modal-background"></div>
  <div class="modal-card">
    <header class="modal-card-head">
      <p class="modal-card-title">Modal title</p>
      <button @click="closeModal" class="delete" aria-label="close"></button>
    </header>
    <section class="modal-card-body">
      <!-- MODAL Content ... -->

         <div  class="container is-fluid">
          <div class="columns is-multiline">
            <div class="column is-one-fifths">
              <b>Name:</b>
            </div>
            <div class="column">
              <b>Price:</b><br>
            </div>
            <div class="column">
              <b>Description:</b><br>
            </div>
            <div class="column">
              <b>Amount:</b>
            </div>
            <div class="column">
              
            </div>

            </div>
          </div>




        <div v-for="(cart,index) in cartsFiltered" :key="index" class="container is-fluid">
          <div class="columns is-multiline">
            <div class="column is-one-fifths">
              <b>{{cart.name}}</b>
            <div class="card-image">
              <figure class="image is-3by3">
                <img :src=cart.picurl alt="Placeholder image">
              </figure>
            </div>
            </div>
            <div class="column">
              <!-- <b>Price:</b><br> -->
              {{cart.price}}
            </div>
            <div class="column">
              <!-- <b>Description:</b><br> -->
              {{cart.description}}
            </div>
            <div class="column">
              <!-- <b>Amount</b> -->
              <div class="field">
                  <p>{{cart.amount}}</p>
              </div>
            </div>

          <div class="column">
              <br>
              <button @click="removeItem(cart.itemId)" class="button is-danger" type="button">Remove</button>
          </div>
            <hr width="100%">
          </div>
        </div>
        


        <div  class="container is-fluid">
          <div class="columns is-multiline">
            <div class="column is-one-fifths">
              <b>Total:</b>
            </div>
            <div class="column">
              {{totalPrice}}
            </div>
            <div class="column">
              
            </div>
            <div class="column">
              
            </div>
            <div class="column">
              
            </div>

            </div>
          </div>


      <!--END MODAL CONTENT-->
    </section>
    <footer class="modal-card-foot">
      <button @click="checkOut" type="buttin" class="button is-success">Check Out</button>
      <button type="button" @click="closeModal" class="button">Cancel</button>
    </footer>
  </div>
</div>


</div>  
</template>

<script>

import { mapActions, mapState} from 'vuex'
import { setTimeout } from 'timers';

export default {
  created:function(){
    this.checkLocalStorage()
    this.checkAdmin()
    this.getCart()
  },
  mounted:function(){
    this.countPrice()
  },
  computed:{
    ...mapState([
      'carts','cartsFiltered'
    ]),
  },
  data:function(){
    return{
      userid:'',
      username:'',
      totalPrice: 0,
      currentUser : localStorage.getItem('userId')
    }
  },
  watch: {
    carts () {
      console.log("masuk ga watch")
      console.log("THIS CARTs",this.carts)
      this.filterCart(this.carts)
    },
    //disini ada yg ngebug,
    cartsFiltered(){
      console.log("INI BARU MASUK",this.cartsFiltered)
      let total = 0
      let totaltmp = this.cartsFiltered.map(function (x) {
          total += x.price
          return total
      })
      this.totalPrice = totaltmp[totaltmp.length - 1]
    }
  },
  methods:{
    ...mapActions([
      'getCart','filterCart'
    ]),
    register(){
      swal('you are logged out :)')
      localStorage.clear()
      this.$router.push('/register')
    },
    activateModal(){
      $(".modal").addClass("is-active")
    },
    checkOut(){
      console.log("MASUK CHECKOUT",this.currentUser)
      axios.delete(`https://ecommerce2.gladysefirina.website/cart/delete/${this.currentUser}`)
      .then(({data})=>{
        console.log("THIS CURRENT USER DI THEN",this.currentUser)
        console.log("MASUK SINI",data)
        swal("Berhasil Checkout :) tapi ga masuk database ")
        this.closeModal()
        setTimeout(function(){ 
          window.location.reload()
        }, 1500);
      })
      .catch(err=>{
        console.log(err.response)
      })
      
    },
    closeModal(){
      $(".modal").removeClass("is-active")
    },
    logout(){
      localStorage.clear()
      this.$router.push('/login')
    },
    checkLocalStorage(){
      this.userid=localStorage.getItem('userId')
    },
    checkAdmin(){
      this.username=localStorage.getItem('username')
    },
    removeItem(cart){
      var customerId = localStorage.getItem('userId')
      axios.put(`https://ecommerce2.gladysefirina.website/cart/${customerId}`,{
        itemid:cart,
      })
      .then(({data})=>{
        console.log("Data habis remove",data)
      })
      .catch(err=>{
        console.log(err)
      })

      setTimeout(() => {
        this.getCart()
        this.filterCart()
      }, 200);
    }
  }
}
</script>

<style scoped>
hr {
    display: block;
    height: 1px;
    border: 0;
    border-top: 1px solid black;
    margin: 1em 0;
    padding: 0; 
}

#logoutbutton{
  color:black !important
}

#registerbutton{
  color:black !important
}

</style>


