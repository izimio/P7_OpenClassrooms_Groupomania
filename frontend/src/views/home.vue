<template>
  <main :id="$style.home">
    <NavHub />
    <article :id="$style.fullHome">
      <section>
        <h1 :id="$style.title">Fil d'actualité</h1>
        <router-link to="/post/create" :id="$style.create_post">
          Postez !
        </router-link>
      </section>

      <section v-if="allPosts[0]" :id="$style.allpost">
        <Posts
          v-for="(post, index) in allPosts"
          :key="index"
          :title="post.title"
          :id="post.id"
          :username="post.User.username"
          :body="post.body"
          :media="post.media"
          :createdAt="post.createdAt"
          :updatedAt="post.updatedAt"
          :UserId="post.userId"
          :num="0"
        />
      </section>
      <section v-else :id="$style.nothing">
        <h2>
          Oops, c'est bien vide par ici... Raison de plus ! soyez le premier à
          poster
        </h2>
        <span :id="$style.nothing_smiley">¯\_(ツ)_/¯</span>
      </section>
    </article>
    <div :id="$style.footHub">
      <FooterHub />
    </div>
    <router-view />
  </main>
</template>

<script>
// @ is an alias to /src
import NavHub from "@/components/NavHub.vue";
import FooterHub from "@/components/FooterHub.vue";
import Posts from "@/components/Posts.vue";
export default {
  name: "Home",
  components: {
    NavHub,
    FooterHub,
    Posts,
  },
  data() {
    return {
      token: "",
      userId: "",
      profileId: "",
      role: "",
      error: "",
      email: "",
      allPosts: {},
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
    fetch("http://localhost:5000/api/posts/", {
      // getting all the posts
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.token}`,
      }),
    })
      .then(async (result_) => {
        const arr = await result_.json();
        if (arr.error) {
          this.error = "Oops, une erreur est survenu";
        } else {
          this.allPosts = arr.post;
        }
      })
      .catch((error) => {
        console.log(error);
      });
  },
};
</script>

<style lang="scss" module>
$bg-red: #501b1d;
$bg-blue: #557a95;
* {
  margin: 0;
  padding: 0;
  list-style-type: none;
  text-decoration: none;
  color: black;
  scroll-behavior: smooth;
}
strong {
  color: lighten($bg-red, 30);
  font-weight: bold;
}
#home {
  padding-top: 50px;
  #title {
    margin-bottom: 20px;
  }
}
#fullHome {
  min-height: 900px;
  margin-bottom: 2em;
}
#footHub {
  margin-top: 2em;
}
#create_post {
  margin: 20px auto;
  background-color: #ffd7d7;
  border: solid 1.5px black;
  padding: 0.5em;
  font-size: 2em;
  border-radius: 5px;
  -webkit-transition: 500ms;
  -o-transition: 500ms;
  transition: 500ms;
  &:hover {
    background-color: darken(#ffd7d7, 5);
    border-radius: 15px;
  }
}
#allpost {
  margin-top: 3em;
}
#nothing {
  margin-top: 5em;
  margin-bottom: 5em;
  height: auto;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  &_smiley {
    font-size: 13em;
    margin-bottom: 1em;
  }
}
@media screen and (max-width: 930px) {
  #nothing_smiley {
    font-size: 4em;
  }
}
</style>