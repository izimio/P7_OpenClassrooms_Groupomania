<template>
  <div id="Info_profile">
    <div id="header_profile">
      <h2 id="title-profile" v-if="id == profileId">
        Voici vos informations <strong>{{ username }} </strong>, <br />
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
        <span id="sep"> | </span>
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
        <span id="sep"> | </span>
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
        <span id="sep"> | </span>
        <div id="password" v-if="id == profileId || role == 1">
          <router-link
            id="id"
            v-if="id == profileId || role == 1"
            :to="{ name: 'profileUpdate', params: { value: 3, id: id } }"
            title="Modifiez votre mot de passe"
          >
            <i class="gg-lock"></i>
            <span>Mot de passe</span>
          </router-link>
        </div>
        <span id="sep"> | </span>
        <div id="delete" v-if="id == profileId || role == 1">
          <router-link
            id="id"
            v-if="id == profileId || role == 1"
            :to="{ name: 'profileDelete', params: { id: id } }"
            title="Modifiez votre mot de passe"
          >
            <i class="gg-trash"></i>
            <span>Supprimer le compte</span>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "InfoProfile",
  props: ["id", "username", "email", "role", "profileId", "value"],
  methods: {},
};
</script>

<style lang="scss">
$bg-red: #501b1d;
strong {
  color: lighten($bg-red, 30);
  font-weight: bold;
}
#Info_profile {
  margin: 2em 1em 0 1em;
  border-radius: 5px;
  background-color: lighten(grey, 40);
  padding-bottom: 1em;
  padding-top: 1em;
  margin-bottom: 15em;
}

#header_profile {
  margin-bottom: 2em;
}

#all_profile {
  display: flex;
  justify-content: center;
}

#profile {
  width: 80em;
  display: flex;
  justify-content: space-evenly;
}

#username,
#email,
#id,
#password, #delete {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: nowrap;
  i {
    margin-right: 1em;
    margin-left: 1em;
  }
  &:hover {
    font-weight: bold;
    text-decoration: underline;
  }
  margin-right: 1em;
}

@media screen and (max-width: 1170px) {
  #profile {
    width: 20em;
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
  #email{
      margin-right: -1em;
  }
  #delete{
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
}
</style>