<template>
  <main :id="$style.login_page">
    <section>
      <div :id="$style.ban_login">
        <h1 :id="$style.ban_login_title">
          Attention <strong>/!\</strong> <br />
          Ce changement sera <strong>irréversible</strong>
        </h1>
        <p :id="$style.ban_login_under"> <u> Supprimer votre compte ? </u></p>
      </div>
      <form action="" method="post" autocomplete="off" :id="$style.form">
        <div :id="$style.form_each">
          <div id="">
              <label for="conf_body" :id="$style.label">
            Entrez vote pseudo pour confirmer la supprésion
          </label>
          <input
            :id="$style.input"
            type="text"
            v-model="body"
            required
          />
          </div>
        </div>
        <div :id="$style.form_each">
          <div :id="$style.bottom_form_check">
            <label for="confirm" :id="$style.label"> J'ai conscience que ces changements sont irréversibles et souhaite supprimer définitivement mon compte </label>
            <input :id="$style.input" type="checkbox" v-model="check" required />
          </div>
        </div>

        <p :id="$style.error">{{ error }}</p>
        <div :id="$style.bottom_form">
          <div
            v-if="body.length >= 3 && check"
            :id="$style.bottom_form_button_login"
            @click="erase"
          >
            <p>supprimer</p>
          </div>
          <div :id="$style.bottom_form_button_login_block" v-else>
            <p>supprimer</p>
          </div>
          <div :id="$style.bottom_form_button_deny">
            <p @click="backward">Annuler</p>
          </div>
        </div>
      </form>
    </section>
  </main>
</template>

<script>
export default {
  name: "profileDelete",
  components: {},
  data() {
    return {
      body: "",
      value: -1,
      token: "",
      userId: "",
      role: "",
      error: "",
      check: false,
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

    if (this.$route.params.id != this.userId && this.role != true) {
      return this.$router.push({ path: "/hub" });
    }
  },
  methods: {
    backward: function () {
      this.$router.push({ name: "profileMain", params: { id: this.userId } });
    },
    erase: function () {
      if (this.token === null) {
        return this.$router.push({ path: "/" });
      }
      if (this.$route.params.id != this.userId && this.role != true) {
        return this.$router.push({ path: "/hub" });
      }

    const infos = {
      body: this.body.trim()
    }

      console.log(infos);
      fetch("http://localhost:5000/api/users/" + this.userId, {
        method: "DELETE",
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
             return this.$router.push({ path: "/" });
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

strong {
  color: lighten($bg-red, 30);
  font-weight: bold;
}

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
    transform: scale(1.05);
    box-shadow: 0rem 0.5rem 2rem 0.1rem lighten(black, 60%);
  }
}

#input {
  text-align: center;
}

#form_each {
  display: flex;
  justify-content: center;
  margin-top: 2em;
}
#bottom_form {
  &_check{
    display: flex;
    justify-content: center;
    width: 30em;
  }
  p {
    margin: 0.5em;
  }
  &_button_deny {
    :hover {
      text-decoration: underline;
      cursor: pointer;
    }
  }
  display: flex;
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
  margin-bottom: 1em;
  &_up{
    display: block;
  }
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