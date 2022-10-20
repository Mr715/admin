<template>
  <div class="create-component-list">
    <div
      class="component-item"
      v-for="(item, index) in list"
      :key="index"
      @click="onItemClick(item)"
    >
      <l-text v-bind="item"></l-text>
    </div>
    <StyledUploader @success="onImageUploaded"></StyledUploader>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import LText from "../components/LText.vue";
import { v4 as uuidv4 } from "uuid";
import { message } from "ant-design-vue";
import { ComponentsData } from "../store/editor";
import { UploadResp } from "../extraType";
import StyledUploader from "../components/StyledUploader.vue";
import { imageDefaultProps } from "@/defaultProps";

export default defineComponent({
  props: {
    list: {
      type: Array,
      required: true,
    },
  },
  emits: ["on-item-click"],
  name: "components-list",
  components: {
    LText,
    StyledUploader,
  },
  setup(props, context) {
    const onItemClick = (data: ComponentsData) => {
      const componentData: ComponentsData = {
        name: "l-text",
        id: uuidv4(),
        props,
      };
      context.emit("on-item-click", componentData);
    };

    // const onImageUploaded = (data: { resp: UploadResp; file: File }) => {
    //   const { resp, file } = data;
    //   const componentData: ComponentData = {
    //     name: "l-image",
    //     id: uuidv4(),
    //     props: {
    //       ...imageDefaultProps,
    //     },
    //   };
    //   message.success("上传成功");
    //   componentData.props.src = resp.data.url;
    //   getImageDimensions(file).then(({ width }) => {
    //     const maxWidth = 373;
    //     componentData.props.width =
    //       (width > maxWidth ? maxWidth : width) + "px";
    //     context.emit("on-item-click", componentData);
    //   });
    // };

    const onImageUploaded = (resp: UploadResp) => {
      const componentData: ComponentsData = {
        name: "l-image",
        id: uuidv4(),
        props: {
          ...imageDefaultProps,
        },
      };
      message.success("上传成功");
      console.log(resp);
      // componentData.props.src = resp.data.url;

      componentData.props.src =
        "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Flmg.jj20.com%2Fup%2Fallimg%2F1114%2F121420113514%2F201214113514-6-1200.jpg&refer=http%3A%2F%2Flmg.jj20.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1668841581&t=a103d730362e6865d211ee1a52327ad7";

      context.emit("on-item-click", componentData);
    };

    return {
      onItemClick,
      onImageUploaded,
    };
  },
});
</script>
>
<style>
.component-item {
  width: 100px;
  margin: 0 auto;
  margin-bottom: 15px;
}
</style>
