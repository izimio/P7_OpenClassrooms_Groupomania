<template>
  <article v-if="num == '0'" :id="$style.post">
    <router-link
      :class="$style.link"
      :to="{ name: 'PostEach', params: { id: id } }"
    >
      <h3 :class="$style.title">{{ title }}</h3>
      <p :class="$style.body">
        {{ body }}
      </p>
      <div :class="$style.preview">
        <img v-if="media" :src="media" />
      </div>
      <p :class="$style.updateAt">Modifié le : {{ updatedAt }}</p>
    </router-link>
    <router-link :to="{ name: 'profileMain', params: { id: UserId } }">
      <span :class="$style.username"
        >De: <strong> {{ username }} </strong></span
      >
    </router-link>
    <router-view />
    <div :class="$style.slots">
      <slot></slot>
    </div>
  </article>

  <article v-else :id="$style.post">
    <section :class="$style.fullscren">
      <h3 :class="$style.title">{{ title }}</h3>
      <p :class="$style.body">
        {{ body }}
      </p>
      <div :class="$style.preview_huge">
        <img v-if="media" :src="media" />
      </div>
      <p :class="$style.updateAt">Modifié le : {{ updatedAt }}</p>
      <router-link :to="{ name: 'profileMain', params: { id: UserId } }">
        <span :class="$style.username"
          >De: <strong> {{ username }} </strong></span
        >
      </router-link>
    </section>
    <div :class="$style.slots">
      <slot></slot>
    </div>
  </article>
</template>
<script>
export default {
  name: "Posts",
  props: [
    "title",
    "id",
    "username",
    "body",
    "media",
    "createdAt",
    "updatedAt",
    "UserId",
    "num",
  ],
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" module>
$pink: #ffd7d7;
$bg-red: #501b1d;
* {
  margin: 0;
  padding: 0;
  list-style-type: none;
  text-decoration: none;
  color: black;
  scroll-behavior: smooth;
}
#post {
  word-wrap: break-word;
  background-color: lighten($bg-red, 50);
  width: 70%;
  margin: 0 auto 50px auto;
  padding-bottom: 30px;
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
  position: relative;
  -webkit-transition: 500ms;
  -o-transition: 500ms;
  transition: 500ms;
  border-radius: 0 0 15px 15px;
  &:hover {
    -webkit-box-shadow: 0rem 0.5rem 2rem 0.1rem lighten(black, 60%);
    box-shadow: 0rem 0.5rem 2rem 0.1rem lighten(black, 60%);
  }
  .title,
  .id,
  .username,
  .body,
  .media,
  .updateAt {
    text-align: center;
    margin: 0 auto;
  }
  .preview {
    border-radius: 15px 0 15px;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    background-color: lighten($bg-red, 40);
    img {
      width: 400px;
      height: 300px;
      border-radius: 10%;
    }
  }

  .preview_huge {
    border-radius: 15px 0 15px;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    background-color: lighten($bg-red, 40);
    img {
      width: 700px;
      height: 500px;
      border-radius: 10%;
    }
  }
  .link,
  .fullscren {
    -webkit-transition: 500ms;
    -o-transition: 500ms;
    transition: 500ms;
    padding-bottom: 1em;
    margin-bottom: 1em;
    &:hover {
      background-color: lighten($bg-red, 43);
    }
  }
  .slots {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    margin-bottom: 1em;
  }
  .title {
    font-size: 2em;
    text-decoration: underline;
    margin-bottom: 0.5em;
  }
  .username {
    position: absolute;
    bottom: 0px;
    right: 0px;
    border: 1px solid transparent;
    padding: 0.5em;
    -webkit-transition: 500ms;
    -o-transition: 500ms;
    transition: 500ms;
    border-radius: 5px 0 15px;
    &:hover {
      border: 1px solid white;
      background-color: white;
    }
  }
  .body {
    width: 85%;
    border-radius: 10px;
    background-color: white;
    margin-bottom: 0.5em;
    font-weight: bold;
    padding: 0.5em;
  }
}
@media all and (max-width: 990px) {
  #post {
    width: 85%;
    .preview_huge {
      img {
        width: 500px;
        height: 400px;
      }
    }
  }
}
@media all and (max-width: 650px) {
  #post {
    .preview,
    .preview_huge {
      img {
        width: 250px;
        height: 300px;
      }
    }
  }
}
</style>
