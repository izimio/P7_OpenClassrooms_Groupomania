<template>
  <div class="about">
    <button @click="send">Ping</button>
    <p @click="a">{{ test }}</p>
  </div>
</template>

<script>
export default {
  data(){
    return {
      lol: 55,
      test: 0
    }
  },
  methods: {
    send: function(){
        return this.$router.push({
            path: 'signup',
        })
    },
    a: function(){
      this.test = this.$route.params.id;
    }
  },
}
</script>