<template> 
  <div id="delete-btn-trash" @click="delette">
    <i class="gg-trash"></i>
    <span id="button-send">Supprimer</span>
  </div>
</template>

<script>
export default {
  name: "ButtonDelete",
  props: ["id", "value"],
  created() {
    const storage = localStorage.getItem("user");
    const auth = JSON.parse(storage);
    if (auth === null) {
      return this.$router.push({ path: "/" });
    }
    this.token = auth.token;
    this.userId = auth.userId;
    this.role = auth.role;
  },
  methods: {
    delette: function () {
      if (this.value == 0) { // if the user is deleting a post
        fetch("http://localhost:5000/api/posts/" + this.$route.params.id, {
          method: "DELETE",
          headers: new Headers({
            "Content-Type": "application/json",
            Authorization: `Bearer ${this.token}`,
          }),
        })
          .then(async (result_) => {
            const res = await result_.json();
            if (!res.error) {
              return this.$router.push({ path: "/Home" });
            } else {
              alert("Un problème est survenue lors de la suppression");
            }
          })
          .catch((error) => {
            console.log(error);
          });
      } else if (this.value == 1) { // if the user is deleting a comment
        fetch("http://localhost:5000/api/comments/" + this.id, {
          method: "DELETE",
          headers: new Headers({
            "Content-Type": "application/json",
            Authorization: `Bearer ${this.token}`,
          }),
        })
          .then(async (result_) => {
            const res = await result_.json();
            if (!res.error) {
              location.reload()
              return this.$router.push({ path: "/Home" });
            } else {
              alert("Un problème est survenue lors de la suppression");
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
  },
};
</script>

<style lang="scss">
#delete-btn-trash {
  margin-right: 2em;
  display: flex;
  align-items: center;
  padding: 0.5em;
  background-color: lighten(red, 20);
  border-radius: 5px;
  transition: 500ms;
  cursor: pointer;
  &:hover {
    scale: 1.1;
    background-color: lighten(red, 15);
  }
}

.gg-trash {
  margin-right: 0.5em;
}
#button-send {
  color: black;
  font-weight: bold;
}
</style>