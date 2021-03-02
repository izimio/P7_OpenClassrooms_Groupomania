<template>
  <div id="delete-btn">
    <i class="gg-trash"></i>
    <button id="button-send" @click="deleteButton">Supprimer</button>
  </div>
</template>

<script>
export default {
  name: 'ButtonDelete',
  methods: {
    deleteButton() {
      this.$emit('deleteButton')
    }
  }
}
</script>

<style lang="scss">

</style>