import { createApp } from "vue";
import App from "./App.vue";
import mitt from "mitt";
import Antd from "ant-design-vue";
import "ant-design-vue/dist/antd.css";
import router from "./router/index";
import store from "./store/index";

createApp(App).use(Antd).use(store).use(router).mount("#app");
