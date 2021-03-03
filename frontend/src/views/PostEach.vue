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
            :value="0"
          >
          </ButtonDelete>

          <ButtonUpdate
            v-if="userId === post.userId || role === true"
            :value="0"
          ></ButtonUpdate>
        </Posts>

        <!-- Comments -->
        <aside v-if="comments[0]">
          <h3>Ils ont réagis</h3>
          <div>
            <div :id="$style.comment_create">
              <label for="com" :id="$style.comment_create_label">
               Commenter
              </label>
              <input
                :id="$style.comment_create_input"
                type="text"
                v-model="newCom"
                @keyup.enter="postComment"
              />
            </div>
          </div>
          <Comments
            v-for="(comment, index) in comments"
            :key="index"
            :body="comment.body"
            :id="comment.id"
            :postId="comment.PostId"
            :username="comment.username"
            :updatedAt="comment.updatedAt"
            :userId="comment.UserId"
          >
            <ButtonDelete
              v-if="userId === comment.userId || role === true"
              :id="comment.id"
              :value="1"
            >
            </ButtonDelete>

            <ButtonUpdate
              v-if="userId === comment.userId || role === true"
              :value="1"
            ></ButtonUpdate>
          </Comments>
        </aside>
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
import Comments from "@/components/Comments.vue";
export default {
  name: "PostEach",
  components: {
    NavHub,
    Posts,
    ButtonUpdate,
    ButtonDelete,
    Comments,
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
      newCom: "",
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
          return this.$router.push({ path: "/Home" });
        } else {
          this.post = arr.Post;
        }
      })
      .catch((error) => {
        console.log(error);
      });

    // getting comments

    fetch("http://localhost:5000/api/comments/post/" + this.$route.params.id, {
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
          return this.$router.push({ path: "/Home" });
        } else {
          this.comments = arr.comment;
        }
      })
      .catch((error) => {
        console.log(error);
      });
  },
  methods: {
    postComment: function(){
      
    }
  },
};
</script>

<style lang="scss" module>
#post {
}

aside {
  h3 {
    margin-bottom: 1em;
    text-decoration: underline;
    font-size: 2em;
  }
  #comment_create {
    margin-bottom: 1em;
    &_input {
        width: 75em;
        height: 3em;
        text-align: center;
        &:focus {
          transform: scale(1.05);
          box-shadow: 0rem 0.5rem 2rem 0.1rem lighten(black, 60%);
        }
        &:invalid{
          border: none
        }
      }
    &_label {
      display: block;
      margin-bottom: 0.5em;
    }
  }
}
</style>