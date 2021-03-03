<template>
  <article v-if="num == '0'" :id="$style.post">
    <router-link :to="{ name: 'PostEach', params: { id: id } }">
        <h3 :class="$style.title">{{ title }}</h3>
        <span :class="$style.username">De: <strong> {{ username }} </strong></span>
      <p :class="$style.body">
        {{ body }}
      </p>
      <img src="" alt="photo du post" v-if="media != undefined" />
      <span :class="$style.updateAt"
        >Dernière modification: {{ updatedAt }}</span
      >
    </router-link>
    <router-view />
  </article>

  <article v-else :id="$style.post">
    <h3 :class="$style.title">{{ title }}</h3>
    <span :class="$style.username">De: titouan</span>
    <p :class="$style.body">
      {{ body }}
    </p>
    <img src="" alt="photo du post" v-if="media != undefined" />
    <span :class="$style.updateAt">Dernière modification: {{ updatedAt }}</span>
    <slot></slot>
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
  created() {
    console.log(this.$route.params.id + "====" + this.id)
  },
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
  &:hover{
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
  .title{
            font-size: 2em;
      text-decoration: underline;
      margin-bottom: 0.5em;
  }
  .username{
      position: absolute;
      bottom: 2px;
      right: 10px;
  }
  .body{
      width: 85%;
      border-radius: 10px;
      background-color: white;
      margin-bottom: 0.5em;
      font-weight: bold;
      padding: 0.5em;
  }
}
@media all and (max-width: 930px) {
  #post {
    width: 85%;
  }
}
</style>