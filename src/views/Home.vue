<template>
  <a-layout>
    <div>
      <hello-word msg="123"></hello-word>
    </div>

    <a-layout-header>Header</a-layout-header>
    <a-layout-content>
      <router-link :to="'/edit'">editssss</router-link>
      <a-button @click="login">{{ template.author }}</a-button>
      <hello mes="111"></hello>
      <div v-for="key in testData" v-bind:key="key.id">
        <div>{{ key.id }}</div>
      </div>
    </a-layout-content>
    <a-layout-footer>Footer</a-layout-footer>
  </a-layout>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import Hello from "../components/Hello";
import HelloWord from "../components/HelloWorld.vue";
import { useRouter, useRoute } from "vue-router";
import { GlobalDataProps, TemplateProps } from "../store/index";
import { useStore } from "vuex";

export default defineComponent({
  name: "App",
  components: { Hello, HelloWord },
  setup() {
    const store = useStore<GlobalDataProps>();
    const routerFn = useRouter();
    const router = useRoute(); //route内容,router是跳转方法
    const testData = computed(() => {
      return store.state.templates.data;
    });

    const template = computed<TemplateProps>(() =>
      store.getters.getTemplateById(1)
    );

    const login = () => {
      store.commit("login");
    };
    return {
      router,
      testData,
      template,
      login,
    };
    // setTimeout(() => {
    //   router.push({ name: "edit", params: {} });
    // }, 1000);
  },
});
</script>

<style></style>
