<template>
  <div class="">
    <h1>List of posts</h1>
    <my-input v-focus placeholder="search..." v-model="searchQuery" />
    <div class="app_btns">
      <my-button @click="showDialog">Create post</my-button>
      <my-select v-model="selectedSort" :options="sortOptions" />
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
import usePosts from "@/hooks/usePosts";
import useSortedPosts from "@/hooks/useSortedPosts";
import useSortedAndSeachedPosts from "@/hooks/useSortedAndSeachedPosts";
import axios from "axios";

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
      sortOptions: [
        { value: "id", name: "По id" },
        { value: "userId", name: "По user id" },
        { value: "title", name: "По названию" },
        { value: "body", name: "По содержимому" },
      ],
    };
  },
  setup() {
    const { posts, isPostsLoading } = usePosts();
    const { sortedPosts, selectedSort } = useSortedPosts(posts);
    const { searchQuery, sortedAndSearchedPosts } =
      useSortedAndSeachedPosts(sortedPosts);

    return {
      posts,
      isPostsLoading,
      sortedPosts,
      selectedSort,
      searchQuery,
      sortedAndSearchedPosts,
    };
  },

  methods: {
    async loadMorePosts() {
      try {
        this.current_page += 1;
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/posts",
          {
            params: {
              _page: this.current_page,
              _limit: this.limit,
            },
          }
        );
        this.totalPages = Math.ceil(
          Number(response.headers["x-total-count"]) / this.limit
        );
        this.posts = [...this.posts, ...response.data];
      } catch (error) {
        alert("Error");
      }
    },
  },
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
