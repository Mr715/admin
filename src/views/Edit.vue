<template>
  <div class="editor-container">
    <a-layout>
      <a-layout-sider width="300" style="background: #fff">
        <div>
          组件列表
          <components-list
            :list="defaultTextTemplates"
            @on-item-click="addItem"
          ></components-list>
        </div>
      </a-layout-sider>
      <a-layout>
        <a-layout-content class="preview-container">
          <div>画布区域</div>
          <edit-wrapper
            @set-active="setActive"
            v-for="list in elementLists"
            :key="list.id"
            :id="list.id"
            :active="list.id == (currentElement && currentElement.id)"
          >
            <component :is="list.name" v-bind="list.props"></component>
          </edit-wrapper>
        </a-layout-content>
      </a-layout>
      <a-layout-sider width="30%" style="background: white">
        <a-layout-content>
          <props-table
            v-if="currentElement && currentElement.props"
            :props="currentElement.props"
            @change="handleChange"
          >
          </props-table>

          <pre>{{ currentElement }}</pre>
        </a-layout-content>
      </a-layout-sider>
    </a-layout>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { useStore } from "vuex";
import { GlobalDataProps } from "../store/index";
import LText from "../components/LText.vue";
import LImage from "../components/LImage.vue";
import { defaultTextTemplates } from "@/defaultTemplates";
import ComponentsList from "../components/ComponentsList.vue";
import EditWrapper from "../components/EditorWrapper.vue";
import PropsTable from "@/components/PropsTable.vue";

export default defineComponent({
  name: "App",
  components: {
    LText,
    ComponentsList,
    EditWrapper,
    PropsTable,
    LImage,
  },
  setup() {
    const store = useStore<GlobalDataProps>();

    const elementLists = computed(() => store.state.editor.components);
    const currentElement = computed(() => store.getters.getCurrentElement);
    const addItem = (props: any) => {
      store.commit("addComponent", props);
    };
    const setActive = (id: any) => {
      store.commit("setActive", id);
    };
    const handleChange = (e: any) => {
      console.log("event", e);
      store.commit("updateComponent", e);
    };
    return {
      elementLists,
      defaultTextTemplates,
      addItem,
      setActive,
      currentElement,
      handleChange,
    };
  },
});
</script>

<style>
.editor-container .preview-container {
  padding: 24px;
  margin: 0;
  min-height: 85vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
}
.editor-container .preview-list {
  padding: 0;
  margin: 0;
  min-width: 375px;
  min-height: 200px;
  border: 1px solid #efefef;
  background: #fff;
  overflow-x: hidden;
  overflow-y: auto;
  position: fixed;
  margin-top: 50px;
  max-height: 80vh;
}
</style>
