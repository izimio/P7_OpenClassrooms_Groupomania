<template>
  <main :id="$style.login_page">
    <section>
      <div :id="$style.ban_login">
        <h1 :id="$style.ban_login_title">Modifiez votre post</h1>
      </div>
      <form action="" method="post" autocomplete="on" :id="$style.form">
        <div :id="$style.form_each">
          <div :id="$style.bottom_form_first">
            <label for="titre" :id="$style.label"> Titre </label>
            <input
              :id="$style.input"
              type="text"
              v-model="title"
              required
              maxlength="50"
            />
          </div>
        </div>
        <div :id="$style.form_each">
          <div :id="$style.bottom_form_first">
            <label for="titre" :id="$style.label"> Message </label>
            <input
              :id="$style.input"
              type="text"
              v-model="body"
              required
              maxlength="250"
            />
          </div>
        </div>
        <div :id="$style.img">
          <input type="file" @change="onFileChange" id="file" />
          <div :id="$style.preview">
            <img v-if="media" :src="media" />
          </div>
          <div v-if="media">
            <span @click="media = null" :id="$style.label_del">
              Supprimer le media
            </span>
          </div>
        </div>
        <p :id="$style.error">{{ error }}</p>
        <div :id="$style.bottom_form">
          <div
            v-if="body.length >= 1 && title.length >= 1"
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
      const img = e.target.files[0];
      this.media = URL.createObjectURL(img);
    },
    backward: function () {
      this.$router.push({
        name: "PostEach",
        params: { id: this.$route.params.id },
      });
    },
    modify: function () {
      let file = document.getElementById("file");
      let formData = new FormData();
      formData.append("body", this.body);
      formData.append("title", this.title);
      formData.append("file", file.files[0]);
      formData.append("imgChange", this.media);
      for (var value of formData.values()) {
        console.log(value);
      }
      fetch("http://localhost:5000/api/posts/" + this.$route.params.id, {
        method: "PUT",
        headers: new Headers({
          Authorization: `Bearer ${this.token}`,
        }),
        body: formData,
      })
        .then(async (result_) => {
          const user = await result_.json();
          if (!user.error) {
            this.error = "";
            this.$router.push({
              name: "PostEach",
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
  &_del {
    &:hover {
      cursor: pointer;
      font-weight: bold;
      text-decoration: underline;
    }
  }
}
#img {
  padding: 20px;
}
#preview {
  display: flex;
  justify-content: center;
  align-items: center;
}
#preview img {
  width: 400px;
  height: 400px;
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
  #preview img {
    width: 300px;
    height: 300px;
  }
}
</style>