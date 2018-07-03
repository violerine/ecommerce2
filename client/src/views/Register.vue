<template>
<div class="registerpage">
    <Navbar/>
  <section class="hero is-success is-fullheight">
        <div class="hero-body">
            <div class="container has-text-centered">
                <div class="column is-6 is-offset-3">
                    <h3 class="title has-text-grey">Sign Up</h3>
                    <div class="box">
                            <img src="../assets/ecommerce.png">
                        <form>
                             <div class="field">
                                <div class="control">
                                    <input v-model="name" class="input is-large" type="text" placeholder="Your Name" autofocus="">
                                </div>
                            </div>
                            <div class="field">
                                <div class="control">
                                    <input v-model="username" class="input is-large" type="text" placeholder="Your username" autofocus="">
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
                            <button type="button" @click="register" class="button is-block is-danger is-large is-fullwidth"><router-link to="/login">Sign up</router-link></button>
                        </form>
                    </div>
                    <p class="has-text-grey">
                        <router-link to="/login"><a href="">Have an account? Login here </a> &nbsp;·&nbsp;</router-link>
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
    data:function(){
        return{
            username :'',
            name:'',
            password:''
        }
    },
    components: {
        Navbar,
    },
    methods:{
        register(){
            axios.post('http://localhost:7000/register',{
                name:this.name, 
                username:this.username, 
                password:this.password
                })
               .then(user=>{

                   console.log("MASUK REGISTER",user)
               })
               .catch(err=>{
                   swal('username already exists')
               })
        },
        testing(){
            console.log("bisa ga nih")
        }
    }
}
</script>


<style>

.box {
  margin-top: 4rem;
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
  padding-top: 0rem;
}
</style>
