<template>
  <main :id="$style.post">
    <NavHub />
    <article>
      <h1 :class="$style.tiltle_posts">Post de {{ name }}</h1>

      <!-- Post -->
      <Posts
        :title="post.title"
        :id="post.id"
        :userName="name"
        :message="post.message"
        :comment="post.commentCount"
        :link="post.link"
        :like="post.like"
        :createdAt="post.createdAt"
        :updatedAt="post.updatedAt"
        :UserId="post.UserId"
      >

        <!-- Boutton delete post -->
        <ButtonDelete
          v-if="userId === post.UserId || isAdmin === true"
          :postId="post.id"
          :id="post.id"
          :UserId="post.UserId"
          :postUserId="post.UserId"
          @deleteButton="deletePost(post.id, post.UserId)"
        >
        </ButtonDelete>

        <!-- Router update post -->
        <ButtonUpdate
          v-if="userId === post.UserId || role === true"
          :id="post.id"
          :commentUserId="null"
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
  </main>
</template>


<script>

import Posts from '@/components/Posts.vue'
import NavHub from '@/components/NavHub.vue'
import ButtonUpdate from '@/components/ButtonUpdate.vue'
import ButtonDelete from '@/components/ButtonDelete.vue'
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
    //On recupère notre token
    const storage = localStorage.getItem('user')
    const auth = JSON.parse(storage)
    if (auth === null) {
      return this.$router.push({ path: '/' }) //On redirige vers le login
    }
    this.token = auth.token
    this.userId = auth.userId
    this.isAdmin = auth.role
    //Appel de notre API
    fetch('http://localhost:5000/api/posts/' + this.$route.params.id, {
     method: "GET",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.token}`,
      }),
    })
      .then(async (result_) => {
        const arr = await result_.json();
        if (!arr.error) {
            this.posts = arr.Post;
        }
      })
      .catch((error) => {
        console.log(error);
      });
  },
}
</script>