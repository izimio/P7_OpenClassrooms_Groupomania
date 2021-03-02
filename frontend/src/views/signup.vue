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
              type="password"
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
        email: this.email.trim(),
        password: this.password.trim(),
      };
      fetch("http://localhost:5000/api/users/login", {
        method: "POST",
        headers: new Headers({
          "Content-Type": "application/json",
        }),
        body: JSON.stringify(user), //putting to JSON format
      })
        .then(async (result_) => {
          const user = await result_.json();
          console.log("user login", user);
          if (!user.error) {
            window.localStorage.setItem("user", JSON.stringify(user));
            this.$router.push({ path: "/home" });
          }
          this.error = user.error;
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
h1 {
  font-size: 5em;
}

#ban_login {
  margin-bottom: 7em;
  &_under {
    margin-top: -1.5em;
    font-size: 2em;
  }
}
#input {
  width: 45em;
  height: 3em;
  &:focus {
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
  p {
    margin: 0.5em;
  }
  display: flex;
  justify-content: center;
  transition: 500ms;
  &_button_login {
    color: darken(lightblue, 30);
    font-weight: bold;
    cursor: pointer;
    width: 8em;
    border-radius: 5px;
    background: lighten(lightblue, 10);
    height: auto;
    &:hover {
      text-decoration: underline;
    }
    &_block {
      color: darken(red, 10);
      font-weight: bold;
      background: lighten(red, 40);
      border-radius: 5px;
      width: 8em;
      cursor: not-allowed;
    }
  }
}
#label {
  display: block;
  margin-bottom: 0.5em;
}

#error {
  color: red;
  text-decoration: underline;
}
// Media queries
</style>