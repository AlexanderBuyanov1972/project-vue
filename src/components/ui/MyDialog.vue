<template>
  <div class="dialog" v-if="show" @click="hideDialog">
    <div class="content_dialog" @click.stop>
      <slot></slot>
    </div>
  </div>
</template>
<script>
import toggleMixin from "@/mixins/toggleMixin";
export default {
  name: "my-dialog",
  mixins: [toggleMixin],
};
</script>
<style scoped>
.dialog {
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  display: flex;
}
.content_dialog {
  margin: auto;
  background: white;
  border-radius: 15px;
  min-height: 100px;
  min-width: 400px;
  padding: 20px;
}
</style>
