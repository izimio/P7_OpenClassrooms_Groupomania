<template>
  <main :id="$style.post">
    <article>
      <h1 :class="$style.tiltle_posts">Post de {{ post.username }}</h1>
      <Posts
        :title="post.title"
        :id="post.id"
        :username="username"
        :body="post.body"
        :media="post.media"
        :createdAt="post.createdAt"
        :updatedAt="post.updatedAt"
        :UserId="post.UserId"
        >
        <ButtonDelete
          v-if="userId === post.UserId || role === true"
          @deleteButton="deletePost(post.id, post.UserId)"
        >
        </ButtonDelete>

        <ButtonUpdate
          v-if="userId === post.UserId || role === true"
        ></ButtonUpdate>
      </Posts>

      <!-- Commentaire -->
      <aside v-if="comments[0]">
        
      </aside>
      <aside v-else>
        <div :id="$style.cont_comment">
          <p>Aucun commentaire</p>
        </div>
      </aside>
    </article>
    <router-view />
  </main>
</template>


<script>

import NavHub from "@/components/NavHub.vue";
import Posts from "@/components/Posts.vue";
import ButtonUpdate from "@/components/ButtonUpdate.vue";
import ButtonDelete from "@/components/ButtonDelete.vue";
export default {
    name: "PostEach",
    component: {
        NavHub,
        Posts,
        ButtonUpdate,
        ButtonDelete
    },
    data() {
    return {
      comments: {},
      post: {},
      username: '',
      token: '',
      userId: '',
      role: '',
      error: ''
    }
  },
  created() {
    const storage = localStorage.getItem('user')
    const auth = JSON.parse(storage)
    if (auth === null) {
      return this.$router.push({ path: '/' }) 
    }
    this.token = auth.token
    this.userId = auth.userId
    this.isAdmin = auth.role

    fetch('http://localhost:5000/api/posts/' + this.$route.params.id, {
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
}
</script>

<style lang="scss" module>
#post {
  background-color: #ffd7d7;
  width: 70%;
  margin: 0 auto 50px auto;
  padding-bottom: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border: solid 1.5px black;
  line-height: 35px;
  #action_btn {
    border: solid 1.5px black;
    margin: 0 auto;
    width: 20%;
  }
}
</style>