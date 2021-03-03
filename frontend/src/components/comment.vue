<template>
    <div :id="$style.cont_comment">
      <span>De: {{ username }}</span>
      <p>{{ body }}</p>
      <slot></slot>
    </div>
</template>

<script>
export default {
  name: 'Comment',
  props: ['username', 'body']
}
</script>
<style lang="scss" module>
#cont_comment {
  border: solid 1.5px black;
  margin: 0 auto;
  width: 70%;
}
</style>