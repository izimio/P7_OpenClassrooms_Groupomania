
<template>
  <router-view />
</template>

<script>
export default {
}
</script>

<style lang="scss">
@import url('https://css.gg/user.css');
@import url('https://css.gg/attachment.css');
@import url('https://css.gg/lock.css');
@import url('https://css.gg/log-off.css');
@import url('https://css.gg/home.css');
@import url('https://css.gg/pen.css');
@import url('https://css.gg/profile.css');
@import url('https://css.gg/instagram.css');
@import url('https://css.gg/twitter.css');
@import url('https://css.gg/facebook.css');
@import url('https://css.gg/user.css');
@import url('https://css.gg/mail.css');
@import url('https://css.gg/select.css');
@import url('https://css.gg/trash.css');
@import url('https://css.gg/software-upload.css');
// fonts 

@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@500&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Rambla&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Work+Sans:wght@300&display=swap');


$bg-color: #ADADAD;
$pink: #ffd7d7;

#app {
  font-family: 'Work Sans', Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
  h1 {
    font-family: 'Roboto', Avenir, Helvetica, Arial, sans-serif;
  }

html, body{
    height: auto;
      background-color: lighten(blueviolet,40);
}
#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: darken($pink,20);
    }
  }
}
</style>
