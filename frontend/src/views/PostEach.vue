<template>
  <div>
    <NavHub />
    <main>
      <article>
        <h1 :class="$style.tiltle_posts">Post de {{ allUsers[post.userId - 1] }}</h1>
        <Posts
          :title="post.title"
          :id="post.id"
          :username="allUsers[post.userId - 1]"
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
        <aside>
          <h3>Ils ont réagis</h3>
          <div :id="$style.comment_create_all">
            <label for="com" :id="$style.comment_create_label">
              Commenter
            </label>
            <div :id="$style.comment_create">
              <input
                :id="$style.comment_create_input"
                type="text"
                maxlength="250"
                v-model="newCom"
                @keyup.enter="postComment"
              />
              <div :id="$style.comment_create_button" @click="postComment">
                <span>Commenter</span>
              </div>
            </div>
            <p :id="$style.comment_create_error">{{ error }}</p>
          </div>
          <article v-if="comments[0]">
            <Comments
              v-for="(comment, index) in comments"
              :key="index"
              :body="comment.body"
              :id="comment.id"
              :postId="comment.PostId"
              :username="allUsers[comment.UserId - 1]"
              :updatedAt="comment.updatedAt"
              :userId="comment.UserId"
            >
              <ButtonDelete
                v-if="userId === comment.UserId || role === true"
                :id="comment.id"
                :value="1"
              >
              </ButtonDelete>

              <ButtonUpdate
                v-if="userId === comment.UserId || role === true"
                :value="1"
                :com_id="comment.id"
              ></ButtonUpdate>
            </Comments>
          </article>
        </aside>
        <aside v-if="!comments[0]">
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
      allUsers: [],
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
        } else {
          this.comments = arr.comment[0] ? arr.comment : 0;
        }
      })
      .catch((error) => {
        console.log(error);
      });

    // getting users

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
          let i = -1;
          while (res.user[++i]) {
            this.allUsers.push(res.user[i].username);
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });
  },
  methods: {
    postComment: function () {
      const infos = {
        body: this.newCom,
      };
      fetch("http://localhost:5000/api/comments/" + this.$route.params.id, {
        method: "POST",
        headers: new Headers({
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.token}`,
        }),
        body: JSON.stringify(infos),
      })
        .then(async (result_) => {
          const res = await result_.json();
          if (res.error) {
            this.error = res.error;
          } else {
            location.reload();
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style lang="scss" module>
aside {
  h3 {
    margin-bottom: 1em;
    text-decoration: underline;
    font-size: 2em;
  }
  #comment_create {
    margin: 0 1em 1em 1em;
    display: flex;
    justify-content: center;
    &_button {
      background-color: lighten(blue, 20);
      padding: 0.6em 0 0.7em;
      border-top: 1px solid black;
      border-radius: 0 5px 5px 0;
      padding: 0.5em;
      span {
        color: white;
        font-weight: bold;
      }
      &:hover {
        background-color: lighten(blue, 15);
        cursor: pointer;
      }
    }
    &_error {
      text-decoration: underline;
      color: red;
      margin-bottom: 0.5em;
      font-weight: bold;
    }
    &_input {
      width: 75em;
      height: 3em;
      text-align: center;
      &:focus {
        box-shadow: 0rem 0.5rem 2rem 0.1rem lighten(black, 60%);
      }
      &:invalid {
        border: none;
      }
    }
    &_label {
      display: block;
      margin-bottom: 0.5em;
    }
  }
}
</style>