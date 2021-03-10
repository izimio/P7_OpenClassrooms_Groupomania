<template>
  <article>
    <h1 :id="$style.title" v-if="userId == profileId">Votre profil</h1>
    <h1 v-else :id="$style.title">Profile de {{ username }}</h1>
    <section :id="$style.Info_profile">
      <div :id="$style.header_profile">
        <h2 :id="$style.title" v-if="userId == profileId">
          Voici vos informations
          <span :class="$style.stronger">{{ username }} </span>, <br />
          cliquez dessus pour les modifier
        </h2>
        <h2 :id="$style.title" v-else>Découvrez {{ username }}:</h2>
      </div>
      <div :id="$style.container_all_profile">
        <div :id="$style.all_profile">
          <div :id="$style.profile">
            <div :id="$style.id" v-if="userId == profileId || role == 1">
              <i class="gg-select"></i>
              <span :id="$style.id">Utilisateur n°{{ id }}</span>
            </div>
            <span :id="$style.sep" v-if="userId == profileId || role == 1">
              |
            </span>
            <div :id="$style.username">
              <i class="gg-user"></i>
              <router-link
                :id="$style.id"
                v-if="userId == profileId || role == 1"
                :to="{ name: 'profileUpdate', params: { value: 1, id: id } }"
                title="Modifiez votre username"
                >pseudo : {{ username }}</router-link
              >
              <span :id="$style.id" v-else>pseudo : {{ username }}</span>
            </div>
            <span :id="$style.sep"> | </span>
            <div :id="$style.email">
              <i class="gg-mail"></i>
              <router-link
                :id="$style.id"
                v-if="userId == profileId || role == 1"
                :to="{ name: 'profileUpdate', params: { value: 2, id: id } }"
                title="Modifiez votre email"
                >mail : {{ email }}</router-link
              >
              <span v-else>mail : {{ email }}</span>
            </div>
            <span :id="$style.sep" v-if="userId == profileId || role"> | </span>
            <div :id="$style.password" v-if="userId == profileId || role == 1">
              <router-link
                v-if="userId == profileId || role == 1"
                :id="$style.id"
                :to="{ name: 'profileUpdate', params: { value: 3, id: id } }"
                title="Modifiez votre mot de passe"
              >
                <i class="gg-lock"></i>
                <span>Mot de passe</span>
              </router-link>
            </div>
            <span :id="$style.sep" v-if="userId == profileId || role"> | </span>
            <div :id="$style.delete" v-if="userId == profileId || role == 1">
              <router-link
                v-if="userId == profileId || role == 1"
                :id="$style.id"
                :to="{ name: 'profileDelete', params: { id: id } }"
                title="Supprimer votre compte"
              >
                <i class="gg-trash"></i>
                <span> Supprimer le compte </span>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </section>
  </article>
</template>
<script>
export default {
  name: "InfoProfile",
  props: ["id", "username", "email", "value"],
  data() {
    return {
      role: "",
      profileId: null,
      userId: null,
    };
  },
  methods: {},
  created() {
    this.profileId = this.$route.params.id;
    const storage = localStorage.getItem("user");
    const auth = JSON.parse(storage);
    if (auth === null) {
      return this.$router.push({ path: "/" });
    }
    this.userId = auth.userId;
    this.role = auth.role;
  },
};
</script>

<style lang="scss" module>
$bg-red: #501b1d;
.stronger {
  color: lighten($bg-red, 30);
  font-weight: bold;
}
#Info_profile {
  margin: 2em 1em 0 1em;
  border-radius: 5px;
  background-color: lighten(yellow, 50);
  padding-bottom: 3em;
  padding-top: 1em;
}
#header_profile {
  margin-bottom: 2em;
}
#container_all_profile {
  display: flex;
  justify-content: center;
  #all_profile {
    width: 100%;
    display: flex;
    justify-content: center;
  }
}

#profile {
  width: 80em;
  display: flex;
  justify-content: space-evenly;
}
#username,
#email,
#id,
#password {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: nowrap;
  i {
    margin-right: 1em;
    margin-left: 1em;
  }
  &:hover {
    text-decoration: underline;
  }
  margin-right: 1em;
}
#delete {
  span {
    padding: 0.3em;
  }
  transition: 400ms;
  &:hover {
    background-color: lighten(red, 25);
    border-radius: 5px;
    color: white;
    font-weight: bold;
  }
}
@media screen and (max-width: 1170px) {
  #profile {
    width: 25em;
    height: 150px;
    display: flex;
    justify-content: space-evenly;
    align-items: flex-start;
    flex-direction: column;
  }
  #password {
    margin-left: 0.4em;
  }
  #id {
    margin-left: -0.2em;
  }
  #delete {
    margin-left: 0.4em;
  }
  #sep {
    display: none;
  }
}
@media screen and (max-width: 500px) {
  #profile {
    width: 25em;
  }
  #container_all_profile {
    #all_profile {
      width: 100%;
      overflow: hidden;
      white-space: nowrap;
    }
  }
}
</style>