<template>
    <div :id="$style.comment">
     <router-link :to="{ name: 'profileMain', params: { id: userId } }">
      <span :class="$style.username"
        >De: <strong> {{ username }} </strong></span
      >
    </router-link>
      <p :class="$style.body">{{ body }}</p>
      <p :class="$style.up">modifié le : {{ updatedAt }}</p>
      <slot></slot>
    </div>
</template>

<script>
export default {
  name: 'Comments',
  props: ['username', 'body', 'updatedAt', 'id', 'postId', 'userId']
}
</script>
<style lang="scss" module>
#comment {
  border-radius: 20px;
  padding: 1em 0 1em;
  border: solid 1.5px black;
  margin: 0 auto;
  margin-bottom: 0.5em;
  width: 70%;
  position: relative;
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
}
</style>