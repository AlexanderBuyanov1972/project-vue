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
      @edit_post="editPost"
      v-if="!isPostsLoading"
    />
    <div v-else><h1>Loading...</h1></div>
    <div v-intersection="loadMorePosts" class="observer"></div>
    <!-- <div class="page_wrapper">
        <div
          class="page"
          v-for="page in totalPages"
          :key="page"
          :class="{ page_current: page === current_page }"
          @click="changePage(page)"
        >
          {{ page }}
        </div>
      </div> -->
  </div>
</template>

<script>
import PostForm from "@/components/PostForm.vue";
import PostList from "@/components/PostList.vue";
import MyDialog from "@/components/ui/MyDialog.vue";
import MyButton from "@/components/ui/MyButton.vue";
import axios from "axios";
import MySelect from "@/components/ui/MySelect.vue";

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
      posts: [],
      dialogVisiable: false,
      isPostsLoading: false,
      selectedSort: "",
      searchQuery: "",
      current_page: 1,
      limit: 10,
      totalPages: 0,
      sortOptions: [
        { value: "id", name: "По id" },
        { value: "userId", name: "По user id" },
        { value: "title", name: "По названию" },
        { value: "body", name: "По содержимому" },
      ],
    };
  },
  methods: {
    createPost(post) {
      this.posts.push(post);
      this.dialogVisiable = false;
    },
    removePost(post) {
      this.posts = this.posts.filter((p) => p.id !== post.id);
    },
    editPost(post) {
      console.log("post for edit :", post);
    },
    showDialog() {
      this.dialogVisiable = true;
    },
    async fetchPosts() {
      try {
        this.isPostsLoading = true;
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
        this.posts = response.data;
      } catch (error) {
        alert("Error");
      } finally {
        this.isPostsLoading = false;
      }
    },
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
    // changePage(newPage) {
    //   this.current_page = newPage;
    // },
  },
  mounted() {
    this.fetchPosts();
    console.log(this.$refs.observer);

    // const options = {
    //   rootMargin: "0px",
    //   threshold: 1.0,
    // };

    // const callback = (entries) => {
    //   if (entries[0].isIntersecting && this.current_page < this.totalPages) {
    //     this.loadMorePosts();
    //   }
    // };

    // const observer = new IntersectionObserver(callback, options);
    // observer.observe(this.$refs.observer);
  },
  computed: {
    sortedPosts() {
      return [...this.posts].sort((post1, post2) => {
        if (this.selectedSort === "title" || this.selectedSort === "body")
          return post1[this.selectedSort]?.localeCompare(
            post2[this.selectedSort]
          );
        return post1[this.selectedSort] - post2[this.selectedSort];
      });
    },
    sortedAndSearchedPosts() {
      return this.sortedPosts.filter((post) =>
        post.title.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    },
  },
  watch: {
    // selectedSort(newValue) {
    //   console.log("watch selectedSort : ", newValue);
    //   this.posts.sort((post1, post2) => {
    //     if (newValue === "title" || newValue === "body")
    //       return post1[newValue]?.localeCompare(post2[newValue]);
    //     return post1[newValue] - post2[newValue];
    //   });
    // },
    // current_page() {
    //   this.fetchPosts();
    // },
    dialogVisiable(newValue) {
      console.log("watch dialogVisiable : ", newValue);
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
