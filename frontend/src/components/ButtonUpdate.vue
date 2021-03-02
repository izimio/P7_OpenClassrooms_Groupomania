<template>
  <div>
    <button
      id="button-send"
      title="Bouton pour update son profil"
      @click="update"
    >
      Modifier
    </button>
  </div>
</template>

<script>
export default {
  name: 'ButtonUpdate',
  methods: {
    update: function() {
      this.$emit('update')
    }
  }
}
</script>

<style lang="scss">

</style>