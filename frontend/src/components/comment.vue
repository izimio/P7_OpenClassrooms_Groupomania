<template>
    <div id="$style.cont_comment">
      <span>De: {{ username }}</span>
      <p>{{ comment }}</p>
    </div>
</template>

<script>
export default {
  name: 'Comment',
  props: ['username', 'comment']
}
</script>
<style lang="scss" module>
#cont_comment {
  border: solid 1.5px black;
  margin: 0 auto;
  width: 70%;
}
</style>