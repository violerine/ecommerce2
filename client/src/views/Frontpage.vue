<template>
 <section class="hero is-info is-fullheight">
        <div class="hero-head">
            <nav class="navbar">
            <a class="navbar-item" href="../">
              <!-- <img src="" alt="Logo"> -->
            </a>
            </nav>
        </div>
            <div class="hero-body">
                <div class="container has-text-centered">
                    <div class="column is-6 is-offset-3">
                        <h1 class="title">
                            Welcome to Ecommerce
                        </h1>
                        <h2 class="subtitle">
                            this is the best software platform for running an internet business. We handle billions of dollars every year for forward-thinking businesses around the world.
                        </h2>
                        <div class="box">
                            
                                <router-link to="/home"><a class="button is-info level-item">
                                    START SHOPPING
                                </a></router-link>
                            
                        </div>
                    </div>
                </div>
            </div>
    </section>
</template>

<style>
.hero.is-info {
  background: linear-gradient(
      rgba(0, 0, 0, 0.5),
      rgba(0, 0, 0, 0.5)
    ), url('https://unsplash.it/1200/900?random') no-repeat center center fixed;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
}
.hero .nav, .hero.is-success .nav {
  -webkit-box-shadow: none;
  box-shadow: none;
}
.hero .subtitle {
  padding: 3rem 0;
  line-height: 1.5;
}
</style>
