<template>
  <main :id="$style.home">
    <NavHub />
    <section>
      <h1 :id="$style.title">Fil d'actualité</h1>
      <router-link to="/post/create" :id="$style.create_post">
        Postez !
      </router-link>
    </section>
    <section :id="$style.allpost">
      <Posts
        v-for="(post, index) in allPosts"
        :key="index"
        :title="post.title"
        :id="post.id"
        :username="post.username"
        :body="post.body"
        :media="post.media"
        :createdAt="post.createdAt"
        :updatedAt="post.updatedAt"
        :UserId="post.userId"
        :num=0
      />
    </section>
        <FooterHub />
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
      username: "",
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
          console.log("yes")
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
#home {
  padding-top: 50px;
  #title {
    margin-bottom: 20px;
  }
}
#create_post {
  margin: 20px auto;
  background-color: #ffd7d7;
  border: solid 1.5px black;
  padding: 5px;
}

#allpost{
  margin-top: 3em;
}
</style>