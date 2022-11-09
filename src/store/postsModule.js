import axios from "axios";

export default {
  state: () => ({
    posts: [],
    isPostsLoading: false,
    selectedSort: "",
    searchQuery: "",
    currentPage: 1,
    limit: 10,
    totalPages: 0,
    sortOptions: [
      { value: "id", name: "По id" },
      { value: "userId", name: "По user id" },
      { value: "title", name: "По названию" },
      { value: "body", name: "По содержимому" },
    ],
  }),
  getters: {
    sortedPosts(state) {
      return [...state.posts].sort((post1, post2) => {
        if (state.selectedSort === "title" || state.selectedSort === "body")
          return post1[state.selectedSort]?.localeCompare(
            post2[state.selectedSort]
          );
        return post1[state.selectedSort] - post2[state.selectedSort];
      });
    },
    sortedAndSearchedPosts(state, getters) {
      return getters.sortedPosts.filter((post) =>
        post.title.toLowerCase().includes(state.searchQuery.toLowerCase())
      );
    },
  },
  mutations: {
    setPosts(state, value) {
      state.posts = value;
    },
    setLoading(state, bool) {
      state.isPostsLoading = bool;
    },
    setCurrentPage(state, value) {
      state.currentPage = value;
    },
    setSelectedSort(state, value) {
      state.selectedSort = value;
    },
    setSearchQuery(state, value) {
      state.searchQuery = value;
    },
    setLimit(state, value) {
      state.limit = value;
    },
    setTotalPage(state, value) {
      state.totalPage = value;
    },
  },
  actions: {
    async fetchPosts({ state, commit }) {
      try {
        commit("setLoading", true);
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/posts",
          {
            params: {
              _page: state.currentPage,
              _limit: state.limit,
            },
          }
        );
        commit(
          "setTotalPages",
          Math.ceil(Number(response.headers["x-total-count"]) / state.limit)
        );
        commit("setPosts", response.data);
      } catch (error) {
        alert("Error");
      } finally {
        commit("setLoading", false);
      }
    },
    async loadMorePosts({ state, commit }) {
      try {
        commit("setCurrentPage", state.currentPage + 1);
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/posts",
          {
            params: {
              _page: state.currentPage,
              _limit: state.limit,
            },
          }
        );
        commit(
          "setTotalPage",
          Math.ceil(Number(response.headers["x-total-count"]) / state.limit)
        );
        commit("setPosts", [...state.posts, ...response.data]);
      } catch (error) {
        alert("Error");
      }
    },
  },
  namespaced: true,
};
