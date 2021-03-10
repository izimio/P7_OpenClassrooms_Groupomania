<template>
  <div id="modify-btn" @click="update">
    <i class="gg-pen"></i>
    <span id="button-send">Modifier</span>
  </div>
</template>

<script>
export default {
  name: "ButtonUpdate",
  props: ["value", "com_id"],
  data() {
    return {
      id: null,
    };
  },
  created() {
    this.id = this.$route.params.id;
  },
  methods: {
    update: function () {
      if (this.value == 0) {
        // if the user is updating a post
        this.$router.push({ name: "PostUpdate", params: { id: this.id } });
      } else if (this.value == 1) {
        // if the user is updating a comment
        this.$router.push({
          name: "CommentUpdate",
          params: { com_id: this.com_id, id: this.id },
        });
      }
    },
  },
};
</script>

<style lang="scss">
#modify-btn {
  display: flex;
  padding: 0.5em;
  background-color: lighten(blue, 30);
  border-radius: 5px;
  transition: 500ms;
  align-items: center;
  cursor: pointer;
  &:hover {
    scale: 1.1;
    background-color: lighten(blue, 25);
  }
}

.gg-pen {
  margin-right: 0.5em;
}
#button-send {
  color: black;
  font-weight: bold;
}
</style>