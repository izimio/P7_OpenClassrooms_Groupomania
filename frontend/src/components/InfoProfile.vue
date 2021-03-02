<template>
  <div id="Info_profile">
    <div id="header_profile">
      <h2 id="title-profile" v-if="id == profileId">
        Voici vos informations {{ username }}, <br />
        cliquez dessus pour les modifier
      </h2>
      <h2 id="title-profile" v-else>Découvrez {{ username }}:</h2>
    </div>
    <div id="all_profile">
      <div id="profile" v-if="id == profileId || role == 1">
        <div id="id">
          <i class="gg-select"></i>
          <span id="id">Utilisateur n°{{ id }}</span>
        </div>
        |
        <div id="username">
          <i class="gg-user"></i>
          <router-link
            id="id"
            v-if="id == profileId || role == 1"
            :to="{ name: 'profileUpdate', params: { value: 1, id: id } }"
            title="Modifiez votre username"
            >pseudo : {{ username }}</router-link
          >
          <span id="id" v-else>pseudo : {{ username }}</span>
        </div>
        |
        <div id="email">
          <i class="gg-mail"></i>
          <router-link
            id="id"
            v-if="id == profileId || role == 1"
            :to="{ name: 'profileUpdate', params: { value: 2, id: id } }"
            title="Modifiez votre email"
            >mail : {{ email }}</router-link
          >
          <span v-else>mail : {{ email }}</span>
        </div>
        |
        <div id="password" v-if="id == profileId || role == 1">
          <router-link
            id="id"
            v-if="id == profileId || role == 1"
            :to="{ name: 'profileUpdate', params: { value: 3, id: id } }"
            title="Modifiez votre mot de passe"
          >
            <i class="gg-lock"></i
          ></router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "InfoProfile",
  props: ["id", "username", "email", "role", "profileId", "value"],
  methods: {
    redirect: function (value) {
      this.$router.push({ name: "profileUpdate", params: { value: value } });
    },
  },
};
</script>

<style lang="scss">
#Info_profile {
  margin: 2em 1em 0 1em;
  border-radius: 5px;
  background-color: lighten(grey, 40);
  padding-bottom: 1em;
}

#header_profile {
  margin-bottom: 2em;
}

#all_profile {
  display: flex;
  justify-content: center;
}

#profile {
  width: 45em;
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
  i {
    margin-right: 1em;
    margin-left: 1em;
  }
  &:hover {
    font-weight: bold;
    text-decoration: underline;
  }
}
</style>