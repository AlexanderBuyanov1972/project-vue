<template>
  <div class="">
    <h1>List of posts</h1>
    <my-input
      v-focus
      placeholder="search..."
      :model-value="searchQuery"
      @update:model-value="setSearchQuery"
    />
    <div class="app_btns">
      <my-button @click="showDialog">Create post</my-button>
      <my-select
        :model-value="selectedSort"
        @update:model-value="setSelectedSort"
        :options="sortOptions"
      />
    </div>
    <my-dialog v-model:show="dialogVisiable">
      <post-form @create_post="createPost" />
    </my-dialog>
    <post-list
      v-bind:posts="sortedAndSearchedPosts"
      @remove_post="removePost"
      v-if="!isPostsLoading"
    />
    <div v-else><h1>Loading...</h1></div>
    <div v-intersection="loadMorePosts" class="observer"></div>
  </div>
</template>

<script>
import PostForm from "@/components/PostForm.vue";
import PostList from "@/components/PostList.vue";
import MyDialog from "@/components/ui/MyDialog.vue";
import MyButton from "@/components/ui/MyButton.vue";
import MySelect from "@/components/ui/MySelect.vue";
import { mapActions, mapMutations, mapState, mapGetters } from "vuex";

export default {
  components: {
    PostForm,
    PostList,
    MyDialog,
    MyButton,
    MySelect,
  },
  data() {
    return {
      dialogVisiable: false,
    };
  },
  methods: {
    ...mapMutations({
      setCurrentPage: "posts/setCurrentPage",
      setSearchQuery: "posts/setSearchQuery",
      setSelectedSort: "posts/setSelectedSort",
    }),
    ...mapActions({
      loadMorePosts: "posts/loadMorePosts",
      fetchPosts: "posts/fetchPosts",
    }),
    createPost(post) {
      this.posts.push(post);
      this.dialogVisiable = false;
    },
    removePost(post) {
      this.posts = this.posts.filter((p) => p.id !== post.id);
    },
    showDialog() {
      this.dialogVisiable = true;
    },
  },
  mounted() {
    this.fetchPosts();
  },
  computed: {
    ...mapState({
      posts: (state) => state.posts.posts,
      isPostsLoading: (state) => state.posts.isPostsLoading,
      selectedSort: (state) => state.posts.selectedSort,
      searchQuery: (state) => state.posts.searchQuery,
      currentPage: (state) => state.posts.currentPage,
      limit: (state) => state.posts.limit,
      totalPages: (state) => state.posts.totalPages,
      sortOptions: (state) => state.posts.sortOptions,
    }),
    ...mapGetters({
      sortedPosts: "posts/sortedPosts",
      sortedAndSearchedPosts: "posts/sortedAndSearchedPosts",
    }),
  },
  watch: {},
};
</script>

<style>
h1 {
  padding: 15px;
}
.app_btns {
  margin: 15px 0;
  display: flex;
  justify-content: space-between;
}
.page_wrapper {
  display: flex;
  margin-top: 15px;
}
.page {
  border: 1px solid black;
  padding: 10px;
}
.page_current {
  border: 2px solid red;
}
.observer {
  height: 30px;
  background: #000;
}
</style>
