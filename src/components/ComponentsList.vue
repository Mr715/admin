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
import { defineComponent } from 'vue';
import LText from '../components/LText.vue';
import { v4 as uuidv4 } from 'uuid';
import { message } from 'ant-design-vue';
import { ComponentsData } from '../store/editor';
import { UploadResp } from '../extraType';
import StyledUploader from '../components/StyledUploader.vue';
import { TextComponentProps } from '@/defaultProps';
import { imageDefaultProps } from '@/defaultProps';
import { getImageDimensions } from '@/helper';

export default defineComponent({
  props: {
    list: {
      type: Array,
      required: true,
    },
  },
  emits: ['on-item-click'],
  name: 'components-list',
  components: {
    LText,
    StyledUploader,
  },
  setup(props, context) {
    const onItemClick = (data: TextComponentProps) => {
      const componentData: ComponentsData = {
        name: 'l-text',
        id: uuidv4(),
        props: Object.assign({}, data),
      };
      context.emit('on-item-click', componentData);
    };

    const onImageUploaded = (data: { resp: UploadResp; file: File }) => {
      const { resp, file } = data;
      const componentData: ComponentsData = {
        name: 'l-image',
        id: uuidv4(),
        props: {
          ...imageDefaultProps,
        },
      };
      message.success('上传成功');
      console.log(data);
      // componentData.props.src = resp.data.url;

      componentData.props.src =
        'http://vue-maker.oss-cn-hangzhou.aliyuncs.com/vue-marker/5f3e3a17c305b1070f455202.jpg';

      getImageDimensions(file).then(({ width }) => {
        console.log(width);
        const maxWidth = 373;
        componentData.props.width =
          (width > maxWidth ? maxWidth : width) + 'px';
        context.emit('on-item-click', componentData);
      });
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
