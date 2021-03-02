
<template>
  <router-view />
</template>

<script>
export default {
  methods: {
    lol() {
      this.$store.commit("INCREMENT_DAY")
    }
  },
}
</script>

<style lang="scss">
@import url('https://css.gg/user.css');
@import url('https://css.gg/attachment.css');
@import url('https://css.gg/lock.css');
@import url('https://css.gg/arrow-left-r.css');
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
