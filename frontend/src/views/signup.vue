<template>
  <div class="home">
    <input type="text" name="email" id="1" v-model="email" />
    <input type="text" name="username" id="2" v-model="username" />
    <input type="text" name="password" id="3" v-model="pass" />
    <br />
    <button @click="signup">Envoyer</button>
    <p>{{ error }}</p>
    <p>{{ test }}</p>
  </div>
</template>


<script>
export default {
  data() {
    return {
      email: "",
      username: "",
      pass: "",
      error: "pas d'erreur",
      test: "0",
    };
  },
  methods: {
    signup: function (event) {
      console.log("a");
      event.preventDefault();
      const user = {
        email: this.email.trim(), //trim() supprime les espaces inutiles rajouté par l'utilisateur si il y en a
        password: this.pass.trim(),
        username: this.username.trim(),
      };
      //On vérifie le password
      return fetch("http://localhost:5000/api/users/signup", {
        //Notre requête POST
        method: "POST", //Methode d'envoi
        headers: new Headers({
          "Content-Type": "application/json", //On 'précise' que l'objet envoyé sera au format JSON
        }),
        body: JSON.stringify(user), //On stringify l'objet envoyé
      })
        .then(async (result_) => {
          const user = await result_.json(); //On attend le résultat de resul_.json() pour exécuter le reste
          this.test = user;
          if (!user.error) {
            this.test = user.token;
            localStorage.setItem("user", JSON.stringify(user));
            this.$router.push({
              name: "About",
              params: { id: user.userId },
            }); //on redirige vers le profil de l'user //On stocke orderId dans le localStorage pour l'utiliser après
          }
          this.error = user.error; //Si erreur
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>