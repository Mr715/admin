<template>
  <div class="hello">
    <div>{{ msg }}</div>
  </div>
  <button class="button" @click="onCount">{{ count }}</button>
  <input type="text" v-model="todo" />

  <button class="addTodo" @click="addTodo">{{ count }}</button>

  <ul>
    <li v-for="(todo, index) in todos" :key="index">
      {{ todo }}
    </li>
  </ul>

  <hello msg="123567"></hello>

  <button class="loadUser" @click="loadUser"></button>

  <p v-if="user.loading" class="loading">loading</p>
  <div v-else class="userName">{{ user.data && user.data.city }}</div>

  <p v-if="user.error" class="error">error!</p>
</template>

<script lang="ts">
import hello from "./hi.vue";
import axios from "axios";
import { defineComponent, PropType, reactive, Ref, ref } from "vue";
import { TemplateProps } from "../store/index";

export default defineComponent({
  name: "HelloWorld",
  components: {
    hello,
  },
  emits: ["send"],
  props: {
    msg: {
      type: String,
      required: true,
    },
  },
  setup(props, context) {
    const count = ref(1);
    const todo = ref("");
    const todos: Ref = ref([]);
    const onCount = () => {
      count.value++;
    };

    const user = reactive({
      data: null as any,
      loading: false,
      error: false,
    });

    const loadUser = () => {
      user.loading = true;
      axios
        .get(
          `https://www.tianqiapi.com/free/day?appid=23035354&appsecret=8YvlPNrz`
        )
        .then((resp) => {
          user.data = resp.data;
        })
        .catch(() => {
          user.error = true;
        })
        .finally(() => {
          user.loading = false;
        });
    };

    const addTodo = () => {
      if (todo.value) {
        todos.value.push(todo);
        context.emit("send", todo.value);
      }
    };

    return {
      count,
      onCount,
      todo,
      todos,
      addTodo,
      loadUser,
      user,
    };
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
