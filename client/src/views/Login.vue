<template>
<div class="login">
<Navbar/>
  <section class="hero is-success is-fullheight">
        <div class="hero-body">
            <div class="container has-text-centered">
                <div class="column is-6 is-offset-3">
                    <h3 class="title has-text-grey">Login</h3>
                    <div class="box">
                        
                            <img src="../assets/ecommerce.png">
                        
                        <form>
                            <div class="field">
                                <div class="control">
                                    <input v-model="username" class="input is-large" type="text" placeholder="Your Username" autofocus="">
                                </div>
                            </div>

                            <div class="field">
                                <div class="control">
                                    <input v-model="password" class="input is-large" type="password" placeholder="Your Password">
                                </div>
                            </div>
                            <div class="field">
                                <label class="checkbox">
                </label>
                            </div>
                            <button type="button" @click="login" class="button is-block is-danger is-large is-fullwidth">Login</button>
                        </form>

                    </div>
                    <p class="has-text-grey">
                        <router-link to="/register"><a href="../">Don't have an account? Sign Up here</a> &nbsp;·&nbsp;</router-link>
                    </p>
                </div>
            </div>
        </div>
    </section>
  

</div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'

export default {
  name: 'home',
  components: {
    Navbar,
  },
  data:function(){
      return{
          username:'',
          password:''
      }
  },
  methods:{
      login(){
            axios.post('https://ecommerce2.gladysefirina.website/login',{
                username:this.username, 
                password:this.password
                })
               .then(({data})=>{
                   console.log('masuk kesini kan')
                   localStorage.setItem('userId',data.id)
                   localStorage.setItem('username',data.username)
                   localStorage.setItem('usertoken',data.token)
                   console.log(data)
                   this.$router.push('/home')
               })
               .catch(err=>{
                   swal('wrong username/password')
               })
      }
  }
}
</script>

<style>
.hero.is-success {
  background: #F2F6FA;
}
.box {
  margin-top: 5rem;
}
.avatar {
  margin-top: -70px;
  padding-bottom: 20px;
}
.avatar img {
  padding: 5px;
  background: #fff;
  border-radius: 50%;
  -webkit-box-shadow: 0 2px 3px rgba(10,10,10,.1), 0 0 0 1px rgba(10,10,10,.1);
  box-shadow: 0 2px 3px rgba(10,10,10,.1), 0 0 0 1px rgba(10,10,10,.1);
}
input {
  font-weight: 300;
}
p {
  font-weight: 700;
}
p.subtitle {
  padding-top: 1rem;
}
</style>
