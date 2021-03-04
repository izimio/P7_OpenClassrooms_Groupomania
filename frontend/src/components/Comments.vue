<template>
  <div :id="$style.comment">
    <router-link :to="{ name: 'profileMain', params: { id: userId } }">
      <span :class="$style.username"
        >De: <strong> {{ username }} </strong></span
      >
    </router-link>
    <p :class="$style.body">{{ body }}</p>
    <p :class="$style.up">modifié le : {{ updatedAt }}</p>
    <div :class="$style.slots">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "Comments",
  props: ["username", "body", "updatedAt", "id", "postId", "userId"],
};
</script>
<style lang="scss" module>
#comment {
  word-wrap: break-word;
  border-radius: 20px;
  padding: 1em 0 1em;
  border: solid 1.5px black;
  margin: 0 auto;
  margin-bottom: 0.5em;
  width: 50%;
  position: relative;
  background-color: #f7cac9;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .username {
    position: absolute;
    bottom: 0px;
    right: 0px;
    border: 1px solid transparent;
    padding: 0.5em;
    transition: 500ms;
    border-radius: 5px 0 20px;
    &:hover {
      border: 1px solid white;
      background-color: red;
    }
  }
  .body {
    background-color: lighten(#f7cac9, 10);
    width: 50%;
    padding: 0.5em;
    border-radius: 15px;
  }
  .slots {
    margin-top: 1em;
    margin-bottom: 1em;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
@media all and (max-width: 930px) {
  #comment {
    width: 85%;
  }
}
</style>