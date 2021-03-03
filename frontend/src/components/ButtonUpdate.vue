<template>
    <router-link
      id="update-router"
      :to="{ name: 'PostUpdate', params: { id: id } }"
      title="Lien pour update son profile"
    >
    <div id="modify-btn">
    <i class="gg-pen"></i>
    <span id="button-send">Modifier</span>
  </div>
    </router-link>
</template>

<script>
export default {
  name: 'ButtonUpdate',
   data() {
    return {
      id: null,
    }
  },
  created() {
    this.id = this.$route.params.id
  },
  methods: {
    update: function() {
      this.$router.push({ name: "PostUpdate", params: {id: this.id} });
    }
  }
}
</script>

<style lang="scss">
  #modify-btn{
    display: flex;
    padding: 0.5em;
    background-color: lighten(blue,30);
          border-radius: 5px;
    transition: 500ms;
    align-items: center;
    cursor: pointer;
    &:hover{
      scale: 1.1;
      background-color: lighten(blue,25);
    }
  }

  .gg-pen{
    margin-right: 0.5em;
  }
  #button-send{
    color: black;
    font-weight: bold;
  }
</style>