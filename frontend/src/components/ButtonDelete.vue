<template>
  <div id="delete-btn" @click="delette">
    <i class="gg-trash"></i>
    <span id="button-send">Supprimer</span>
  </div>
</template>

<script>
export default {
  name: 'ButtonDelete',
  methods: {
    delette: function() {
      this.$emit('deleteButton')
    }
  }
}
</script>

<style lang="scss">
  #delete-btn{
    border: 1px solid blue;
    display: flex;
    padding: 0.5em;
  }
  .gg-trash{
    margin-right: 0.5em;
  }
  button{
    background-color: white;
    border: none;
  }
</style>