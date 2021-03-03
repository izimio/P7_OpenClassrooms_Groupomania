<template>
  <div id="delete-btn-trash" @click="delette">
    <i class="gg-trash"></i>
    <span id="button-send">Supprimer</span>
  </div>
</template>

<script>
export default {
  name: 'ButtonDelete',
    props: [
    "id",
  ],
  methods: {
    delette: function() {
      this.$emit('deleteButton')
    }
  }
}
</script>

<style lang="scss">
  #delete-btn-trash{
    margin-right: 2em;
    display: flex;
    align-items: center;
    padding: 0.5em;
    background-color: lighten(red,20);
          border-radius: 5px;
    transition: 500ms;
    cursor: pointer;
    &:hover{
      scale: 1.1;
      background-color: lighten(red,15);
    }
  }

  .gg-trash{
    margin-right: 0.5em;
  }
  #button-send{
    color: black;
    font-weight: bold;
  }
</style>