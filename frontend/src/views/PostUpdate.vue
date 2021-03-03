<template>
  <main :id="$style.login_page">
    <section>
      <div :id="$style.ban_login">
        <h1 :id="$style.ban_login_title">Modifiez votre post</h1>
      </div>
      <form action="" method="post" autocomplete="on" :id="$style.form">
        <div :id="$style.form_each">
          <div :id="$style.bottom_form_first">
            <label for="email" :id="$style.label"> Modification </label>
            <input :id="$style.input" type="email" v-model="body" required />
          </div>
        </div>
        <div :id="$style.form_each">
          <div :id="$style.bottom_form_first">
            <label for="email" :id="$style.label"> Modification </label>
            <input :id="$style.input" type="email" v-model="body" required />
          </div>
        </div>
        <div id="app">
          <input type="file" @change="onFileChange" />
          <label for="url" :id="$style.label"> Modification </label>
          <div id="preview">
            <img v-if="url" :src="url" />
          </div>
        </div>
        <p :id="$style.error">{{ error }}</p>
        <div :id="$style.bottom_form">
          <div
            v-if="body.length >= 1 && title >= 1"
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
    </section>
  </main>
</template>

<script>
export default {
  name: "PostUpdate",
  components: {},
  data() {
    return {
      title: "",
      body: "",
      media: "",
      token: "",
      userId: "",
      role: "",
      postId: "",
      postUserId: "",
      error: "",
      url: null,
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

    fetch("http://localhost:5000/api/posts/" + this.$route.params.id, {
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.token}`,
      }),
    })
      .then(async (result_) => {
        const res = await result_.json();
        if (!res.error) {
          this.postId = res.Post.id;
          this.title = res.Post.title;
          this.body = res.Post.body;
          this.media = res.Post.media;
          this.postUserId = res.Post.userId;
        } else {
          return this.$router.push({ path: "/Home" });
        }
        if (this.postUserId != this.userId && this.role != true) {
          return this.$router.push({ path: "/Home" });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  },
  methods: {
    onFileChange(e) {
      const file = e.target.files[0];
      this.url = URL.createObjectURL(file);
    },
    backward: function () {
      this.$router.push({
        name: "PostEach",
        params: { id: this.$route.params.id },
      });
    },
    modify: function () {
      if (this.token === null) {
        return this.$router.push({ path: "/" });
      }
      if (this.$route.params.id != this.userId && this.role != true) {
        return this.$router.push({ path: "/Home" });
      }

      const infos = {
        value: this.value,
        body: this.conf_body,
      };
      console.log(infos);
      fetch("http://localhost:5000/api/posts/" + this.$route.params.id, {
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
  margin-bottom: 0.5em;
}

#app {
  padding: 20px;
}

#preview {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 5em;
}

#preview img {
  width: 100%;
  height: 100%;
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
  #preview img {
  width: auto;
  height: 100px;
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