<template>
  <main :id="$style.login_page">
    <article>
      <div :id="$style.ban_login">
        <h1 :id="$style.ban_login_title">Modifiez vos données</h1>
        <p :id="$style.ban_login_under" v-if="value == 1">
          modification de votre username
        </p>
        <p :id="$style.ban_login_under" v-if="value == 2">
          modification de votre email
        </p>
        <p :id="$style.ban_login_under" v-if="value == 3">
          modification de votre mot de passe
        </p>
      </div>
      <form action="" method="post" autocomplete="on" :id="$style.form">
        <div :id="$style.form_each">
          <div :id="$style.bottom_form_first">
            <label for="email" :id="$style.label"> Modification </label>
            <input :id="$style.input" type="email" v-model="body" required />
          </div>

          <div :id="$style.form_each">
            <label for="conf_body" :id="$style.label">
              confirmez votre modification
            </label>
            <input
              :id="$style.input"
              type="password"
              v-model="conf_body"
              @keyup.enter="modify"
              required
            />
          </div>
        </div>
        <p :id="$style.error">{{ error }}</p>
        <div :id="$style.bottom_form">
          <div
            v-if="body.length >= 3 && conf_body == body"
            :id="$style.bottom_form_button_login"
            @click="modify"
          >
            <p>modifier</p>
          </div>
          <div :id="$style.bottom_form_button_login_block" v-else>
            <p>modifier</p>
          </div>
          <div :id="$style.bottom_form_button_deny">
            <p @click="backward">Annuler</p>
          </div>
        </div>
      </form>
    </article>
  </main>
</template>

<script>
export default {
  name: "profileUpdate",
  components: {},
  data() {
    return {
      body: "",
      conf_body: "",
      value: -1,
      token: "",
      userId: "",
      role: "",
      error: "",
    };
  },
  created() {
    this.value = this.$route.params.value;
    const storage = localStorage.getItem("user");
    const auth = JSON.parse(storage);
    if (auth === null) {
      return this.$router.push({ path: "/" });
    }
    this.token = auth.token;
    this.userId = auth.userId;
    this.role = auth.role;

    if (this.$route.params.id != this.userId && this.role != true) {
      return this.$router.push({ path: "/Home" });
    }
  },
  methods: {
    backward: function () {
      // go back to profile
      this.$router.push({ name: "profileMain", params: { id: this.userId } });
    },
    modify: function () {
      if (this.token === null) {
        return this.$router.push({ path: "/" });
      }
      if (this.$route.params.id != this.userId && this.role != true) {
        return this.$router.push({ path: "/Home" });
      }

      const infos = {
        value: this.value, // value will be the variable wich will tells the program wich field need to be updated
        body: this.conf_body,
      };
      fetch("http://localhost:5000/api/users/" + this.$route.params.id, {
        // sending all of this to the API
        method: "PUT",
        headers: new Headers({
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.token}`,
        }),
        body: JSON.stringify(infos),
      })
        .then(async (result_) => {
          const user = await result_.json();
          if (!user.error) {
            this.error = "";
            this.$router.push({
              name: "profileMain",
              params: { id: this.$route.params.id },
            });
          } else {
            this.error = user.error;
          }
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
$bg-red: #501b1d;
$bg-blue: #557a95;

h1 {
  font-size: 5em;
}

#login_page {
  margin-bottom: 2em;
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
    -webkit-transform: scale(1.05);
        -ms-transform: scale(1.05);
            transform: scale(1.05);
    -webkit-box-shadow: 0rem 0.5rem 2rem 0.1rem lighten(black, 60%);
            box-shadow: 0rem 0.5rem 2rem 0.1rem lighten(black, 60%);
  }
}

#input {
  text-align: center;
}

#form_each {
  -webkit-box-pack: center;
      -ms-flex-pack: center;
          justify-content: center;
  margin-top: 2em;
}
#bottom_form {
  p {
    margin: 0.5em;
  }
  &_button_deny {
    :hover {
      text-decoration: underline;
      cursor: pointer;
    }
  }
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: center;
      -ms-flex-pack: center;
          justify-content: center;
  &_button_login {
    color: darken($bg-blue, 30);
    font-weight: bold;
    cursor: pointer;
    width: 8em;
    border-radius: 5px;
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
  margin-bottom: 1em;
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
      font-size: 1.5em;
    }
  }
}
</style>