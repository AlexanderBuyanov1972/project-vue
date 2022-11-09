<template>
  <div class="navbar">
    <div @click="$router.push('/')">Vue 3</div>
    <div class="navbar_btn">
      <my-button @click="$router.push('/posts')">Posts</my-button>
      <my-button @click="$router.push('/about')">About</my-button>
      <my-button @click="$router.push('/store')">Store</my-button>
      <my-button @click="$router.push('/api')">Composition Api</my-button>
    </div>
  </div>
</template>
<script>
export default {};
</script>
<style scoped>
.navbar {
  height: 60px;
  background-color: lightgray;
  box-shadow: 2px 2px 4px gray;
  display: flex;
  align-items: center;
}
.navbar_btn {
  margin-left: auto;
}
</style>
