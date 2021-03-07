<template>
  <main :id="$style.login_page">
    <NavUser />
    <section>
      <div :id="$style.ban_login">
        <h1 :id="$style.ban_login_title">Vous revoilà !</h1>
        <p :id="$style.ban_login_under">Connectez vous !</p>
      </div>
      <form action="" method="post" autocomplete="on" :id="$style.form">
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
              email.length >= 5 && password.length >= 7
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
import NavUser from '@/components/NavUser.vue'
export default {
  name: "Login",
  components: {
    NavUser,

  },
  data() {
    return {
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
            localStorage.setItem("user", JSON.stringify(user));
            this.$router.push({ path: "/Home" });
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

$bg-red: #501B1D;
$bg-blue: #557A95;

h1 {
  font-size: 5em;
}

#login_page{
      min-height: 1100px;
}

#ban_login {
  margin-bottom: 7em;
  &_under {
    font-size: 2em;
  }
}
#input {
  width: 75em;
  height: 3em;
  text-align: center;
  &:focus {
    transform: scale(1.05);
    box-shadow: 0rem 0.5rem 2rem 0.1rem lighten(black, 60%);
  }
}

#input{
    text-align: center;
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
  &_button_login {
    color: darken($bg-blue, 30);
    font-weight: bold;
    cursor: pointer;
    width: 8em;
    border-radius: 5px;
    margin-top: 1em;
    background: lighten($bg-blue, 30);
    height: auto;
    &:hover {
      text-decoration: underline;
      background: lighten($bg-blue, 10);
    }
    &_block {
      color: darken($bg-red, 10);
      font-weight: bold;
      background: lighten($bg-red, 40);
      border-radius: 5px;
      width: 8em;
      margin-top: 1em;
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