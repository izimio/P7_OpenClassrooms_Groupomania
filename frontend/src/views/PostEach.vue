<template>
  <div>
    <NavHub />
    <main :id="$style.post">
      <article>
        <h1 :class="$style.tiltle_posts">Post de {{ post.username }}</h1>
        <Posts
          :title="post.title"
          :id="post.id"
          :username="post.username"
          :body="post.body"
          :media="post.media"
          :createdAt="post.createdAt"
          :updatedAt="post.updatedAt"
          :UserId="post.userId"
          :num="1"
        >
          <ButtonDelete
            v-if="userId === post.userId || role === true"
            :id="this.$route.params.id"
          >
          </ButtonDelete>

          <ButtonUpdate
            v-if="userId === post.userId || role === true"

          ></ButtonUpdate>
        </Posts>

        <!-- Commentaire -->
        <aside v-if="comments[0]"></aside>
        <aside v-else>
          <div :id="$style.cont_comment">
            <p>Aucun commentaire</p>
          </div>
        </aside>
      </article>
      <router-view />
    </main>
  </div>
</template>


<script>
import NavHub from "@/components/NavHub.vue";
import Posts from "@/components/Posts.vue";
import ButtonUpdate from "@/components/ButtonUpdate.vue";
import ButtonDelete from "@/components/ButtonDelete.vue";
export default {
  name: "PostEach",
  components: {
    NavHub,
    Posts,
    ButtonUpdate,
    ButtonDelete,
  },
  data() {
    return {
      comments: {},
      post: {},
      username: "",
      token: "",
      userId: "",
      role: "",
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
          this.post = arr.Post;
        }
      })
      .catch((error) => {
        console.log(error);
      });
  },
};
</script>

<style lang="scss" module>

#post{

}

</style>