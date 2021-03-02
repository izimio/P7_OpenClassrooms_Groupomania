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

          <div :id="$style.form_pass">
            <div :id="$style.form_pass_first">
              <label for="password" :id="$style.label"> Mot de passe </label>
              <input
                :id="$style.form_pass_input2"
                type="password"
                v-model="password"
                @keyup.enter="login"
                placeholder="Exemple1"
                required
              />
            </div>
            <div :id="$style.form_pass_second">
              <label for="conf_password" :id="$style.label">
                confirmez votre mot de passe</label
              >
              <input
                :id="$style.form_pass_input2"
                type="password"
                v-model="conf_password"
                placeholder="Exemple1"
                @keyup.enter="signup"
                required
              />
            </div>
          </div>
        </div>
        <p :id="$style.error">{{ error }}</p>
        <div :id="$style.bottom_form">
          <div
            v-if="
              email.length >= 5 &&
              password.length >= 6 &&
              username.length > 3 && password == conf_password
            "
            :id="$style.bottom_form_button_login"
            @click="signup"
          >
            <p>S'inscire</p>
          </div>
          <div :id="$style.bottom_form_button_login_block" v-else>
            <p>S'inscire</p>
          </div>
        </div>
      </form>
    </section>
  </main>
</template>


<script>
// @ is an alias to /src
export default {
  name: "Signup",
  components: {},
  data() {
    return {
      username: "",
      email: "",
      password: "",
      conf_password: "",
      error: "",
    };
  },
  created() {
    localStorage.clear(); //On assure un local storage vide
  },
  methods: {
   signup: function() {
      const user = {
        email: this.email.trim(), //trim() supprime les espaces inutiles rajouté par l'utilisateur si il y en a
        password: this.password.trim(),
        username: this.username.trim(),
      }
      if (
        this.password === this.conf_password &&
        this.password.length > 0
      ) {
        return fetch('http://localhost:5000/api/users/signup', {
          method: 'POST', 
          headers: new Headers({
            'Content-Type': 'application/json' 
          }),
          body: JSON.stringify(user) 
        })
          .then(async (result_) => {
            const user = await result_.json() 
            console.log('user', user)
            if (!user.error) {
              window.localStorage.setItem('user', JSON.stringify(user)) 
              return this.$router.push({
                path: '/login',
              }) 
            }
            this.error = user.error 
          })
          .catch((error) => {
            console.log(error)
          })
      }
      this.error = 'Mot de passe incorrect' //Si erreur
    },
  },
}
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
  width: 75em;
  height: 3em;
  &:focus {
    transform: scale(1.05);
    box-shadow: 0rem 0.5rem 2rem 0.1rem lighten(black, 60%);
  }
}

#input {
  text-align: center;
}

#form_each {
  justify-content: center;
  margin-top: 2em;
}

#form_pass{
  display: flex;
  justify-content: center;

  &_input2{
    width: 36em;
    height: 3em;
  }
  &_first{
      margin-top: 2em;
    margin-right: 1em;
  }
  &_second{
      margin-top: 2em;
    margin-left: 1em;
  }
}
#bottom_form {
  p {
    margin: 0.5em;
  }
  display: flex;
  justify-content: center;
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
@media all and (max-width: 1200px) {
  #input {
    width: 80%;
  }
}

@media all and (max-width: 650px) {
  h1 {
    font-size: 3em;
  }
  #ban_login {
    margin-bottom: 4em;
    &_under {
      margin-top: -1.5em;
      font-size: 1.5em;
    }
  }
}
</style>