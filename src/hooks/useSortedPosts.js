import { computed, ref } from "vue";

export default function useSortedPosts(posts) {
  const selectedSort = ref("");
  const sortedPosts = computed(() => {
    return [...posts.value].sort((post1, post2) => {
      if (selectedSort.value === "title" || selectedSort.value === "body")
        return post1[selectedSort.value]?.localeCompare(
          post2[selectedSort.value]
        );
      return post1[selectedSort.value] - post2[selectedSort.value];
    });
  });

  return { sortedPosts, selectedSort };
}
