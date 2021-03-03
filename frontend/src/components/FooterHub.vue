<template>
  <footer>
    <nav :id="$style.footer">
      <div :id="$style.footer_instagram">
        <a href="https://www.instagram.com/"><i class="gg-instagram"></i></a>
      </div>
      <div :id="$style.footer_twitter">
        <a href="https://twitter.com/"><i class="gg-twitter"></i></a>
      </div>
      <div :id="$style.footer_fb">
        <a href="https://www.facebook.com/"><i class="gg-facebook"></i></a>
      </div>
      <ul>
        <li>Conditions d'utilisations</li>
        <li>Nous contacter</li>
        <li>En savoir plus</li>
      </ul>
    </nav>
    <router-view />
  </footer>
</template>

<script>
export default {
  name: "FooterHub",
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" module>
$pink: #ffd7d7;
#footer{
  padding-top: 1em;
  padding-bottom: 1em;
  background-color: $pink;
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 100%;
  &_instagram{
    margin-left: 10%;
  }
  &_twitter{
    margin-left: 10%;
  }
  &_fb{
    margin-left: 10%;
  }
  ul{
    text-align: start;
  }
  li{
    &:hover{
      text-decoration: underline;
      cursor: pointer;
    }
  }
}
@media all and (max-width: 500px) {
    &_instagram{
    margin-left: 8%;
  }
  &_twitter{
    margin-left: 8%;
  }
  &_fb{
    margin-left: 8%;
  }
  ul{
    text-align: start;
    margin-left: 6%;
  }
}
</style>