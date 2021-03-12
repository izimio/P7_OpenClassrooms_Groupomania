<template>
  <header>
    <img
      :id="$style.logo"
      src="../assets/icon-left-font.png"
      alt="logo de gropupomania"
    />
    <nav :id="$style.nav">
      <div :id="$style.nav_full">
        <router-link
          :id="$style.nav_home"
          to="/home"
          title="Direction l'accueil"
          >Accueil</router-link
        >
        |
        <router-link
          :id="$style.nav_profil"
          :to="{ name: 'profileMain', params: { id: userId } }"
          title="Direction votre profile"
          @click="rerender"
          >Profil</router-link
        >
        |
        <router-link :id="$style.nav_logout" to="/" title="Déconnexion">
          <i class="gg-log-off"></i
        ></router-link>
      </div>
    </nav>
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
  methods: {
    rerender() {
      this.$emit("rerender");
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" module>
$bg-red: #501b1d;
#logo {
  height: 150px;
  margin-left: -5em;
  width: 40%;
}

#nav {
  border-bottom: 2px solid black;
  &_full {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    justify-content: space-between;
    width: 25em;
  }
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-pack: distribute;
  justify-content: space-around;

  &_logout {
    padding: 1em;
    border-radius: 50%;
    -webkit-transition: 400ms;
    -o-transition: 400ms;
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