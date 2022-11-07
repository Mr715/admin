import { createApp } from 'vue';
import App from './App.vue';
// import mitt from 'mitt';
import Antd from './configAntD'
import 'ant-design-vue/dist/antd.less';
import router from './router/index';
import store from './store/index';
import 'cropperjs/dist/cropper.css';
// import WComponents from "wzx-components";
// import 'wzx-components/dist/bundle.css';

createApp(App).use(Antd).use(store).use(router).mount('#app');
