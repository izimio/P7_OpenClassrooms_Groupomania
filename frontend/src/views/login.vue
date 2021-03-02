<template>
  <main :id="$style.login_page">
    <section>
      <div :id="$style.ban_login">
        <h1 :id="$style.ban_login_title">Bienvenue!</h1>
        <p :id="$style.ban_login_under">Connectez vous !</p>
      </div>
      <form action="" method="post" autocomplete="on" :id="$style.form">
        <div :id="$style.form_each">
          <label for="text" :id="$style.label"> Identifiant </label>
          <input
            :id="$style.input"
            type="username"
            v-model="username"
            placeholder="Julien_Delorme"
            required
            autofocus
          />
        </div>
        <div :id="$style.form_each">
          <div :id="$style.bottom_form_first">
            <label for="email" :id="$style.label"> Adresse Email </label>
            <input
              :id="$style.input"
              type="email"
              v-model="email"
              placeholder="jean.bastien@gmail.com"
              required
            />
          </div>

          <div :id="$style.form_each">
            <label for="password" :id="$style.label"> Mot de passe </label>
            <input
              :id="$style.input"
              type="current-password"
              v-model="password"
              placeholder="Exemple1"
              @keyup.enter="login"
              required
            />
          </div>
        </div>
        <p :id="$style.error">{{ error }}</p>
        <div :id="$style.bottom_form">
          <div
            v-if="
              email.length >= 5 && password.length >= 7 && username.length > 3
            "
            :id="$style.bottom_form_button_login"
            @click="login"
          >
            <p>Connexion</p>
          </div>
          <div :id="$style.bottom_form_button_login_block" v-else>
            <p>Connexion</p>
          </div>
        </div>
      </form>
    </section>
  </main>
</template>


<script>
// @ is an alias to /src
export default {
  name: "Login",
  components: {},
  data() {
    return {
      username: "",
      email: "",
      password: "",
      error: "",
    };
  },
  created() {
    localStorage.clear(); //On assure un local storage vide
  },
  methods: {
    login(event) {
      event.preventDefault();
      const user = {
        username: this.username.trim(),
        email: this.email.trim(), //trim() supprime les espaces inutiles rajouté par l'utilisateur si il y en a
        password: this.password.trim(),
      };
      //On vérifie nos champs
      fetch("http://localhost:5000/api/users/login", {
        method: "POST", //Methode d'envoi
        headers: new Headers({
          "Content-Type": "application/json",
        }),
        body: JSON.stringify(user), //On stringify l'objet envoyé
      })
        .then(async (result_) => {
          const user = await result_.json(); //On attend le résultat de resul_.json() pour exécuter le reste
          console.log("user login", user);
          if (!user.error) {
            //SI pas d'erreur
            window.localStorage.setItem("user", JSON.stringify(user)); //On stocke user dans le localStorage pour l'utiliser après
            this.$router.push({ path: "/home" });
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" module>
//Variables

h1 {
  font-size: 5em;
}

#ban_login {
  margin-bottom: 8em;
  &_under {
    margin-top: -1.5em;
    font-size: 2em;
  }
}
#input {
  width: 45em;
  height: 3em;
  &:focus{
      transform: scale(1.05);
      box-shadow: 0rem 0.5rem 2rem 0.1rem lighten(black, 60%);
  }
}

#upper_form_first {
  color: purple;
}
#form_each {
  justify-content: center;
  margin-top: 2em;
}
#bottom_form {
  display: flex;
  justify-content: center;
  &_button_login {
    color: darken(lightblue,10);
    font-weight: bold;
    cursor: pointer;
    width: 8em;
    border-radius: 15px;
    background: lighten(lightblue,10);
    height: auto;
    &:hover {
      text-decoration: underline;
    }
    &_block {
      color: darken(red, 10);
      font-weight: bold;
      background: blue;
      align-content: center;
    }
  }
}
#label {
  display: block;
  margin-bottom: 0.5em;
}

#error{
    color: red;
    font-weight: bold;
}
// Media queries
</style>