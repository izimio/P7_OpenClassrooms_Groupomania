<template>
  <article v-if="num == '0'" :id="$style.post">
    <router-link  :class="$style.link" :to="{ name: 'PostEach', params: { id: id } }">
      <h3 :class="$style.title">{{ title }}</h3>
      <p :class="$style.body">
        {{ body }}
      </p>
      <img src="" alt="photo du post" v-if="media != undefined" />
      <span :class="$style.updateAt"
        >Dernière modification: {{ updatedAt }}</span
      >
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

  <article v-else :id="$style.fullscreen_post">
    <h3 :class="$style.title">{{ title }}</h3>
    <p :class="$style.body">
      {{ body }}
    </p>
    <img src="" alt="photo du post" v-if="media != undefined" />
    <span :class="$style.updateAt">Dernière modification: {{ updatedAt }}</span>
    <div :class="$style.slots">
      <slot></slot>
    </div>
    <router-link :to="{ name: 'profileMain', params: { id: UserId } }">
      <span :class="$style.username"
        >De: <strong> {{ username }} </strong></span
      >
    </router-link>
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
  background-color: lighten($bg-red, 50);
  width: 70%;
  margin: 0 auto 50px auto;
  padding-bottom: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border: solid 1.5px black;
  position: relative;
  transition: 500ms;
  &:hover {
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
  .link{
    transition: 500ms;
    padding-bottom: 1em;
      &:hover {
   background-color: lighten($bg-red, 48);
  }
  }
    .slots {
    display: flex;
    justify-content: center;
    align-items: center;
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
    transition: 500ms;
    &:hover {
      border: 1px solid white;
      border-top-left-radius: 5px;
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

#fullscreen_post {
  margin-top: 5em;
  background-color: lighten($bg-red, 50);
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  .title,
  .id,
  .username,
  .body,
  .media,
  .updateAt {
    text-align: center;
    margin: 0 auto;
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
    transition: 500ms;
    &:hover {
      border: 1px solid white;
      border-top-left-radius: 5px;
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
  .slots {
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
@media all and (max-width: 930px) {
  #post {
    width: 85%;
  }
}
</style>