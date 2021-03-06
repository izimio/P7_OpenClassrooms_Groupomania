<template>
  <header>
    <img
      :id="$style.logo"
      src="../assets/icon-left-font.png"
      alt="logo de gropupomania"
    />
    <nav :id="$style.nav">
      <div :id="$style.nav_full">
        <router-link :id="$style.nav_home" to="/home" title="Direction l'accueil"
          >Accueil</router-link
        > |
        <router-link
          :id="$style.nav_profil"
          :to="{ name: 'profileMain', params: { id: userId } }"
          title="Direction votre profile"
          >Profil</router-link
        > |
        <router-link :id="$style.nav_logout" to="/" title="Déconnexion">
          <i class="gg-log-off"></i
        ></router-link>
      </div>
    </nav>
    <router-view />
  </header>
</template>

<script>
export default {
  name: "NavHub",
  data() {
    return {
      token: "",
      userId: "",
      role: "",
    };
  },
  created() {
    const storage = localStorage.getItem("user");
    const auth = JSON.parse(storage);
    if (auth === null) {
      return this.$router.push({ path: "/" });
    }
    this.token = auth.token;
    this.userId = auth.userId;
    this.role = auth.role;
  },

};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" module>
//Variables
$bg-red: #501b1d;
#logo {
  height: 150px;
  margin-left: -5em;
  width: 40%;
}

#nav {
  border-bottom: 2px solid black;
  &_full {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 25em;
  }
  display: flex;
  justify-content: space-around;

  &_logout {
    padding: 1em;
    border-radius: 50%;
    transition: 400ms;
    &:hover {
      background-color: lighten($bg-red, 60);
    }
  }
  &_home {
    font-size: 1.5em;
    &:hover {
      text-decoration: underline;
    }
  }
  &_profil {
    font-size: 1.5em;
    &:hover {
      text-decoration: underline;
    }
  }
}
.gg-log-off {
  --ggs: 1.5;
}

@media all and (max-width: 1100px) {
  #logo {
    width: 70%;
  }
}
@media all and (max-width: 700px) {
  #logo {
    width: 100%;
    margin-left: -1em;
    height: 100px;
    margin-bottom: -1em;
  }
}

</style>