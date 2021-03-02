<template>
<div>
  <NavHub />
  <main :id="$style.home">
    <section>
      <h1 :id="$style.title">Fil d'actualité</h1>
      <router-link to="/post/create" :id="$style.create_post">
        Postez !
      </router-link>
    </section>
  </main>
  <router-view />
    <FooterHub />
</div>
</template>

<script>
// @ is an alias to /src
import NavHub from '@/components/NavHub.vue'
import FooterHub from '@/components/FooterHub.vue'
export default {
  name: 'Hub',
  components: {
    NavHub,
    FooterHub
  },
  created() {
    const storage = localStorage.getItem('user')
    const auth = JSON.parse(storage)
    if (auth === null) {
      this.$router.push({ path: '/' })
    }
  }
}
</script>

<style lang="scss" module>

$bg-red: #501B1D;
$bg-blue: #557A95;

* {
  margin: 0;
  padding: 0;
  list-style-type: none;
  text-decoration: none;
  color: black;
  scroll-behavior: smooth;
}
#home {
  padding-top: 50px;
  #title {
    margin-bottom: 20px;
  }
}
#create_post {
  margin: 20px auto;
  background-color: #ffd7d7;
  border: solid 1.5px black;
  padding: 5px;
}
</style>