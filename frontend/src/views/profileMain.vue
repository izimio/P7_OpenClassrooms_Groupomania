<template>
  <main id="profile-page">
    <NavHub />
    <section>
      <h1 id="title-profile">Votre profil</h1>
      <InfoProfile
        :id="this.$route.params.id"
        :username="username"
        :email="email"
        :role="role"
        :profileId="profileId"
      />
    </section>
    <FooterHub />
  </main>
</template>

<script>
import NavHub from "@/components/NavHub.vue";
import FooterHub from "@/components/FooterHub.vue";
import InfoProfile from "@/components/InfoProfile.vue";
export default {
  name: "ProfileMain",
  components: {
    NavHub,
    FooterHub,
    InfoProfile,
  },
  data() {
    return {
      username: "",
      token: "",
      userId: "",
      idProfile: "",
      role: "",
      error: "",
      email: "",
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
    fetch("http://localhost:5000/api/users/" + this.$route.params.id, {
      method: "GET", //Methode d'envoi
      headers: new Headers({
        "Content-Type": "application/json", //On 'précise' que l'objet envoyé sera au format JSON
        Authorization: `Bearer ${this.token}`,
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.error) {
          return this.$router.push({ path: "/home" });
        }
        this.profileId = response.user.id;
        this.username = response.user.username;
        this.email = response.user.email;
      })
      .catch((error) => {
        console.log(error);
      });
  },
  methods: {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" module>
* {
  margin: 0;
  padding: 0;
  list-style-type: none;
  text-decoration: none;
  color: black;
  scroll-behavior: smooth;
}
#profile_page {
  background-color: #ffd7d7;
  width: 900px;
  margin: 0 auto;
  padding-bottom: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border: solid 1.5px black;
  line-height: 35px;
  #action_btn {
    margin: 0 auto;
    border: solid 1.5px black;
  }
}
@media screen and (max-width: 930px) {
  #form {
    width: 85%;
  }
}
</style>