<template>
  <div class="props-table">
    <div class="prop-item" v-for="(value, key) in finalProps" :key="key">
      <span class="label" v-if="value.text">{{ value.text }}</span>
      <div class="prop-component">
        <component
          v-if="value"
          :is="value.component"
          :[value.valueProp]="value.value"
          v-bind="value.extraProps"
          v-on="value.events"
        >
          <template v-if="value.options">
            <component
              :is="value.subComponent"
              :key="k"
              v-for="(v, k) in value.options"
              :value="v.value"
            >
              {{ v.text }}
            </component>
          </template>
        </component>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, PropType } from 'vue';
import { reduce } from 'lodash';
import { PropsToForms, mapPropsToForms } from '../propsMap';
import { TextComponentProps } from '../defaultProps';
import ImageProcesser from './ImageProcesser.vue';

import ColorPicker from './ColorPicker.vue';

interface FormProps {
  component: string;
  subComponent?: string;
  value: string;
  extraProps?: { [key: string]: any };
  text?: string;
  options?: { text: string; value: any }[];
  valueProp: string | undefined;
  eventName: string;
  events: { [key: string]: (e: any) => void };
}

export default defineComponent({
  name: 'props-table',
  components: {
    ColorPicker,
    ImageProcesser,
  },
  props: {
    props: Object as PropType<TextComponentProps>,
  },
  emits: ['change'],
  setup(props, context) {
    console.log(props, '1111111');
    const finalProps = computed(() => {
      return reduce(
        //通过 iteratee 遍历 collection 中的每个元素,每次返回的值会作为下一次迭代的第一个参数使用,如果没有提供 accumulator,则
        //collection 中的第一个元素作为初始值,iteratee 调用 4 个参数(accumlator, value,index|key,collection)
        props.props,
        (result, value, key) => {
          const newKey = key as keyof TextComponentProps;
          const item = mapPropsToForms[newKey];
          if (item) {
            const {
              valueProp = 'value',
              eventName = 'change',
              initTransForm,
              afterTransform,
            } = item;
            const newItem: FormProps = {
              ...item,
              value: initTransForm ? initTransForm(value) : value,
              valueProp,
              eventName,
              events: {
                [eventName]: (e: any) => {
                  context.emit('change', {
                    key,
                    value: afterTransform ? afterTransform(e) : e,
                  });
                },
              },
            };

            result[newKey] = newItem;
          }
          return result;
        },
        {} as { [key: string]: FormProps }
      );
    });
    return {
      finalProps,
    };
  },
});
</script>

<style>
.prop-item {
  display: flex;
  margin-bottom: 10px;
  align-items: center;
}
.label {
  width: 28%;
}
.prop-component {
  width: 70%;
  text-align: left;
}
</style>
