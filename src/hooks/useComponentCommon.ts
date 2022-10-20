import { computed } from "vue";
import { pick } from "lodash-es";
import { TextComponentProps } from "../defaultProps";
const useComponentCommon = (
  props: Readonly<Partial<TextComponentProps>>,
  picks: string[]
) => {
  const styleProps = computed(() => pick(props, picks)); //pick方法 创建一个从 object 中选中的属性的对象。因为props可以传很多值，只选择我这边需要的值处理。
  const handleClick = () => {
    if (props.actionType === "url" && props.url) {
      window.location.href = props.url;
    }
  };
  return {
    styleProps,
    handleClick,
  };
};

export default useComponentCommon;
