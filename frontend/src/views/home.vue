<template>
  <main :id="$style.home">
    <NavHub />
    <div :id="$style.fullHome">
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
          :username="allUsers[post.userId - 1]"
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
    </div>
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
      allUsers: [],
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
          if (arr.post[0]) {
            fetch("http://localhost:5000/api/users/", {
              method: "GET",
              headers: new Headers({
                "Content-Type": "application/json",
                Authorization: `Bearer ${this.token}`,
              }),
            })
              .then(async (result_) => {
                const res = await result_.json();
                if (res.error) {
                  console.log(res.error);
                } else {
                  let i = 0;
                  let j = 0;
                  const objLength = res.user.length;
                  const maxId = res.user[objLength - 1].id;

                  while (++i <= maxId) {
                    if (res.user[j].id == i) {
                      this.allUsers.push(res.user[j].username);
                      j++;
                    } else {
                      this.allUsers.push("0");
                    }
                  }
                }
              })
              .catch((error) => {
                console.log(error);
              });
          }
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
  display: flex;
  flex-direction: column;
  align-items: center;
  &_smiley {
    font-size: 13em;
    margin-bottom: 1em;
  }
}
@media screen and (max-width: 930px) {
  #nothing_smiley {
    font-size: 5em;
  }
}
</style>