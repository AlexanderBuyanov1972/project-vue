<template>
  <div class="post">
    <div>
      <div><strong>user id :</strong> {{ post.userId }}</div>
      <div><strong>id :</strong> {{ post.id }}</div>
      <div><strong>title :</strong> {{ post.title }}</div>
      <div><strong>body :</strong> {{ post.body }}</div>
    </div>
    <div class="post_btn">
      <my-button class="btn" @click="removePost">Delete</my-button>
      <my-button class="btn" @click="openPost">Open</my-button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    post: {
      type: Object,
      required: true,
    },
  },
  methods: {
    removePost() {
      this.$emit("remove_post", this.post);
    },
    openPost() {
      this.$router.push(`/posts/${this.post.id}`);
    },
  },
};
</script>

<style scoped>
.post {
  padding: 15px;
  margin: 15px;
  border: 1px solid teal;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.btn {
  margin: 5px;
}
</style>
