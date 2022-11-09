// import axios from "axios";
// import { ref, computed } from "vue";

// export default function useLoadMorePosts() {
//   const posts = ref([]);
//   const limit = ref(10);
//   const currentPage = ref(1);
//   const loadMorePosts = async () => {
//     try {
//       currentPage.value += 1;
//       const response = computed(
//         await axios.get("https://jsonplaceholder.typicode.com/posts", {
//           params: {
//             _page: currentPage.value,
//             _limit: limit.value,
//           },
//         })
//       );
//       posts.value = [...posts.value, ...response.data];
//     } catch (error) {
//       console.log("Error");
//     }

//     return { loadMorePosts };
//   };
// }
