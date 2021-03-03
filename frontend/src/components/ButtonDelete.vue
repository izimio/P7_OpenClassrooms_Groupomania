<template>
  <div id="delete-btn">
    <i class="gg-trash"></i>
    <button id="button-send" @click="delette">Supprimer</button>
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

</style>