<template>
  <header>
    <img
      :id="$style.logo"
      src="../assets/logo-groupomania.png"
      alt="logo de l'entreprise gropupomania"
    />
    <nav :id="$style.nav">
      <router-link :id="$style.item_nav_login" to="/">Connexion</router-link>
      <router-link :id="$style.item_nav_signup" to="/signup"
        >Inscription</router-link
      >
    </nav>
    <router-view />
  </header>
</template>

<script>
export default {
  name: 'NavUser'
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" module>
//Variables
$primary-color: black;
$secondary-color: #fd2d01;
#logo {
  max-width: 20%;
  // margin-top: 2%;
}
//Nav sur les pages login et signup
#nav {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  width: 25rem;
  margin: 3rem auto;
  text-transform: uppercase;
  font-family: 'Roboto', Avenir, Helvetica, Arial, sans-serif;
  #item_nav_login,
  #item_nav_signup {
    font-size: 1.5rem;
    font-weight: 700;
    color: $primary-color;
    &:after {
      display: block;
      content: '';
      border-bottom: solid 0.2rem $secondary-color;
      transform: scaleX(0);
      transition: transform 250ms ease-in-out;
    }
  }
  #item_nav_login {
    &:after {
      transform-origin: 100% 50%;
    }
    &:hover:after {
      transform: scaleX(1);
      transform-origin: 0% 50%;
    }
  }
  #item_nav_signup {
    &:after {
      transform-origin: 0% 50%;
    }
    &:hover:after {
      transform: scaleX(1);
      transform-origin: 100% 50%;
    }
  }
}
// Media queries
@media screen and (min-width: 2000px){
  #nav {
    width: 44.5rem;
    #logo {
      max-width: 40%;
    }
    #item_nav_login,
    #item_nav_signup {
      font-size: 3.5rem;
    }
  }
}
@media screen and (max-width: 950px) {
  #logo {
    max-width: 30%;
  }
}
@media screen and (max-width: 650px) {
  #logo {
    max-width: 40%;
  }
}
@media screen and (max-width: 500px) {
  header {
    padding: 0 0.2rem;
    #logo {
      max-width: 60%;
    }
    #nav {
      width: 19.5rem;
    }
  }
}
</style>