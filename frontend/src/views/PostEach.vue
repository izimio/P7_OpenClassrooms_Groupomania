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
        <!-- <CommentCreate /> -->

        <!-- Router comment -->
        <RouterComment :id="post.id" />

        <!-- Boutton like -->
        <ButtonLike
          :id="post.id"
          :userId="userId"
          :likeMessage="likeMessage"
          @like="likePost(post.id)"
        >
        </ButtonLike>

        <!-- Boutton dislike -->
        <ButtonDislike
          :id="post.id"
          :userId="userId"
          :dislikeMessage="dislikeMessage"
          @dislike="dislikePost(post.id)"
        >
        </ButtonDislike>

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
        <RouterUpdate
          v-if="userId === post.UserId || role === true"
          :id="post.id"
          :commentUserId="null"
        ></RouterUpdate>

      </Posts>

      <!-- Commentaire -->
      <aside v-if="comments != 0">
        
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
    }
}
</script>