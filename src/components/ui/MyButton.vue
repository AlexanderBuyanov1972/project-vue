<template>
  <button class="btn"><slot></slot></button>
</template>
<script>
export default {
  name: "my-button",
};
</script>
<style scoped>
.btn {
  padding: 10px 10px;
  background: none;
  color: rgb(204, 0, 255);
  border: 1px solid teal;
  align-self: flex-end;
  min-width: 60px;
  text-align: left;
}
</style>
