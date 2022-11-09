<template>
  <div v-if="posts.length > 0">
    <h3>List of languages</h3>
    <transition-group name="post-list">
      <post-item
        v-for="post in posts"
        :post="post"
        :key="post.id"
        @remove_post="removePost"
      />
    </transition-group>
  </div>
  <h2 v-else>List posts is empty</h2>
</template>

<script>
import PostItem from "@/components/PostItem.vue";
export default {
  components: {
    PostItem,
  },
  props: {
    posts: {
      type: Array,
      required: true,
    },
  },
  methods: {
    removePost(post) {
      this.$emit("remove_post", post);
    },
  },
};
</script>

<style scoped>
h3 {
  margin: 15px;
}
h2 {
  color: red;
}
.post-list-move, /* apply transition to moving elements */
.post-list-enter-active,
.post-list-leave-active {
  transition: all 0.5s ease;
}

.post-list-enter-from,
.post-list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

/* ensure leaving items are taken out of layout flow so that moving
   animations can be calculated correctly. */
.post-list-leave-active {
  position: absolute;
}
</style>
