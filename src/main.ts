import { createApp } from "vue";
import App from "./App.vue";
import mitt from "mitt";
import Antd from "ant-design-vue";
import "ant-design-vue/dist/antd.css";
import router from "./router/index";
import store from "./store/index";
import WComponents from "wzx-components";
import "wzx-components/dist/bundle.css";

createApp(App).use(Antd).use(WComponents).use(store).use(router).mount("#app");
