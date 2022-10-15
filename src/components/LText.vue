<template>
  <component
    @click="handleClick"
    :is="tag"
    :style="styleProps"
    class="l-text-component"
  >
    {{ text }}
  </component>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import {
  transformToComponentProps,
  textDefaultProps,
  textStylePropNames,
} from "../defaultProps";
import useComponentComm from "../hooks/useComponentCommon";
const defaultProps = transformToComponentProps(textDefaultProps);
export default defineComponent({
  name: "l-text",
  props: {
    tag: {
      type: String,
      default: "div",
    },
    ...defaultProps,
  },
  setup(props) {
    const { styleProps, handleClick } = useComponentComm(
      props,
      textStylePropNames
    );
    return {
      styleProps,
      handleClick,
    };
  },
});
</script>
<style>
.l-text-component {
  position: relative !important;
}
</style>
