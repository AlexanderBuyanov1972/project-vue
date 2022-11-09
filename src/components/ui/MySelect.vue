<template>
  <select v-model="modelValue" @change="changeOption" class="select">
    <option disabled>Select from list</option>
    <option disabled>--------------------</option>
    <option v-for="option in options" :key="option.value" :value="option.value">
      {{ option.name }}
    </option>
  </select>
</template>
<script>
export default {
  data() {
    return {
      modelValue: "",
    };
  },
  name: "my-select",
  props: {
    options: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    changeOption(event) {
      this.$emit("update:modelValue", event.target.value);
    },
  },
};
</script>
<style scoped>
.select {
  margin: 15px;
  border: 1px solid teal;
}
.line {
  width: 100px;
  height: 3px;
  background-color: black;
  margin: 15px auto 30px;
}
</style>
