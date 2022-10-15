<template>
  <div class="he1">
    <div>{{ msg }}</div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { TemplateProps } from "../store/index";

export default defineComponent({
  name: "hello1",
  props: {
    msg: {
      type: String, //使用VUE3.-的方法 进行类型转化
      required: true,
    },
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
