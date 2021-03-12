<template>
  <main :id="$style.profile">
    <NavHub @rerender="refreshComponents" :key="componentKey" />
    <article :id="$style.fullProfile">
      <section :key="componentKey">
        <InfoProfile
          :id="this.$route.params.id"
          :username="username"
          :email="email"
          :userId="userId"
          :profileId="profileId"
        />
      </section>
      <article v-if="allPosts[0]" :id="$style.content" :key="componentKey">
        <h2 :id="$style.content_title" v-if="userId == profileId">Vos posts</h2>
        <h2 v-else :id="$style.content_title">Il a posté</h2>
        <Posts
          v-for="(post, index) in allPosts"
          :key="index"
          :title="post.title"
          :id="post.id"
          :username="username"
          :body="post.body"
          :media="post.media"
          :createdAt="post.createdAt"
          :updatedAt="post.updatedAt"
          :UserId="post.userId"
          :num="0"
        />
        <p>{{ error }}</p>
      </article>
      <article v-else :id="$style.nothing">
        <h2>Aucun post à afficher</h2>
        <span :id="$style.nothing_smiley">¯\_(ツ)_/¯</span>
      </article>
    </article>
  </main>
</template>

<script>
import NavHub from "@/components/NavHub.vue";
import InfoProfile from "@/components/InfoProfile.vue";
import Posts from "@/components/Posts.vue";

export default {
  name: "ProfileMain",
  components: {
    NavHub,
    InfoProfile,
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
      componentKey: 0,
    };
  },
  created() {
    this.profileId = this.$route.params.id;
    const storage = localStorage.getItem("user");
    const auth = JSON.parse(storage);
    if (auth === null) {
      return this.$router.push({ path: "/" });
    }
    this.token = auth.token;
    this.userId = auth.userId;
    this.role = auth.role;
    fetch("http://localhost:5000/api/users/" + this.$route.params.id, {
      // getting the infos
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.token}`,
      }),
    })
      .then(async (result_) => {
        const response = await result_.json();
        if (response.error) {
          return this.$router.push({ path: "/home" });
        }
        this.username = response.user.username;
        this.email = response.user.email;
      })
      .catch((error) => {
        console.log(error);
      });
    // Calling for the posts
    fetch("http://localhost:5000/api/posts/user/" + this.$route.params.id, {
      // getting all the posts related to that profile
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
  methods: {
    // method to refresh the component
    refreshComponents: function () {
      this.componentKey += 1;
      fetch("http://localhost:5000/api/users/" + this.$route.params.id, {
        // getting the profiles infos
        method: "GET",
        headers: new Headers({
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.token}`,
        }),
      })
        .then(async (result_) => {
          const response = await result_.json();
          if (response.error) {
            return this.$router.push({ path: "/home" });
          }
          this.username = response.user.username;
          this.email = response.user.email;
        })
        .catch((error) => {
          console.log(error);
        });
      fetch("http://localhost:5000/api/posts/user/" + this.$route.params.id, {
        // getting all the posts related to the profile
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
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" module>
* {
  margin: 0;
  padding: 0;
  list-style-type: none;
  text-decoration: none;
  color: black;
  scroll-behavior: smooth;
}

#profile {
  text-decoration: none;
  padding-bottom: 2em;
}
#fullProfile {
  min-height: 900px;
}
#content {
  min-height: 500px;
  &_title {
    font-size: 3em;
    margin-top: 0.5em;
    margin-bottom: 1em;
  }
}
#profile_page {
  background-color: #ffd7d7;
  margin: 0 auto;
  padding-bottom: 40px;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  border: solid 1.5px black;
  line-height: 35px;
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
    font-size: 11em;
  }
}
@media screen and (max-width: 930px) {
  #nothing_smiley {
    font-size: 4em;
  }
}
</style>