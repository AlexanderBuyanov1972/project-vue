<template>
  <form @submit.prevent>
    <h2>Create Post</h2>
    <my-input v-focus v-model.trim="post.userId" placeholder="user id" />
    <my-input v-model.trim="post.id" placeholder="id" />
    <my-input v-model="post.title" placeholder="title" />
    <my-input v-model="post.body" placeholder="body" />
    <my-button v-if="emptyInput()" class="btn" @click="createPost"
      >Create</my-button
    >
  </form>
</template>

<script>
export default {
  data() {
    return {
      post: {
        userId: 0,
        id: 0,
        title: "",
        body: "",
      },
    };
  },
  methods: {
    createPost() {
      this.$emit("create_post", this.post);
      this.post = {
        userId: 0,
        id: 0,
        title: "",
        description: "",
      };
    },
    emptyInput() {
      return (
        this.post.id != 0 &&
        this.post.userId != 0 &&
        this.post.title != "" &&
        this.post.body != ""
      );
    },
  },
  watch: {
    post: {
      handler(newValue) {
        console.log("watch post : ", newValue);
      },
      deep: true,
    },
  },
};
</script>

<style>
form {
  display: flex;
  flex-direction: column;
}

h2,
.btn {
  margin: 15px;
}
</style>
