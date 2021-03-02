<template>
  <div id="Info_profile">
    <div id="header_profile">
      <h2 id="title-profile">Voici vos informations {{ username }}:</h2>
    </div>
    <div id="all_profile">
      <div id="profile">
        <div id="id">
          <i class="gg-select"></i>
                  <router-link
          id="id" v-if="id == profileId || role == 1"
          :to="{ name: 'profileUpdate', params: { value: 1 } }"
          title="Direction votre profile"
          >Profil</router-link
        > 
         <span id="id" v-else>Utilisateur n°{{ id }}</span>
        </div> |
        <div id="username">
          <i class="gg-user"></i>
          <span>pseudo : {{ username }}</span>
        </div> |
        <div id="email">
          <i class="gg-mail"></i>
          <span>mail : {{ email }}</span>
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
    redirect: function(value){
        this.$router.push({  name: 'profileUpdate', params: { value: value } });
    }
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

#all_profile{
    display: flex;
    justify-content: center;
}

#profile {
  width: 40em;
  display: flex;
  justify-content: space-evenly;
}

#username,
#email,
#id {
  display: flex;
  justify-content: center;
  align-items: center;
  i {
    margin-right: 1em;
  }
  &:hover{
      font-weight: bold;
  }
}
</style>