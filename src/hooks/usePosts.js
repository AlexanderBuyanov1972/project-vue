import axios from "axios";
import { onMounted, ref } from "vue";

export default function usePosts() {
  const posts = ref([]);
  const isPostsLoading = ref(true);
  const totalPages = ref([]);
  const limit = ref(10);
  const fetching = async () => {
    try {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/posts",
        {
          params: {
            _page: 1,
            _limit: limit.value,
          },
        }
      );
      totalPages.value = Math.ceil(
        Number(response.headers["x-total-count"]) / limit.value
      );
      posts.value = response.data;
    } catch (error) {
      alert("Error");
    } finally {
      isPostsLoading.value = false;
    }
  };

  onMounted(fetching);

  return { posts, isPostsLoading };
}
