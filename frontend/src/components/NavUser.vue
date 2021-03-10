<template>
  <header>
    <img
      :id="$style.logo"
      src="../assets/icon.png"
      alt="logo de l'entreprise gropupomania"
    />
    <nav :id="$style.nav">
      <router-link :id="$style.item_nav_login" to="/">CONNEXION</router-link>
      <router-link :id="$style.item_nav_signup" to="/signup"
        >INSCRIPTION</router-link
      >
    </nav>
    <router-view />
  </header>
</template>

<script>
export default {
  name: "NavUser",
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" module>
$secondary-color: #fd2d01;
#logo {
  max-width: 20%;
}

#nav {
  display: flex;
  justify-content: space-between;
  width: 25em;
  margin: 3em auto;
  font-family: "Roboto", Avenir, Helvetica, Arial, sans-serif;
  #item_nav_login,
  #item_nav_signup {
    font-size: 1.5em;
    font-weight: bold;
    color: black;
  }
}
// Media queries

@media all and (min-width: 2000px) {
  #nav {
    width: 44.5em;
    #logo {
      max-width: 40%;
    }
    #item_nav_login,
    #item_nav_signup {
      font-size: 3.5em;
      &:hover {
        text-decoration: none;
      }
    }
  }
}
@media all and (max-width: 950px) {
  #logo {
    max-width: 30%;
  }
}
@media all and (max-width: 650px) {
  #logo {
    max-width: 40%;
  }
}
@media all and (max-width: 500px) {
  header {
    padding: 0 0.2em;
    #logo {
      max-width: 60%;
    }
    #nav {
      width: 19.5em;
    }
  }
}
</style>