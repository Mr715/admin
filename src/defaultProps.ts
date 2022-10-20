import { mapValues, without } from "lodash-es";
//初始化一些值的地方
export interface CommonComponentProps {
  // actions
  actionType: string;
  url: string;
  // size
  height: string;
  width: string;
  paddingLeft: string;
  paddingRight: string;
  paddingTop: string;
  paddingBottom: string;
  // border type
  borderStyle: string;
  borderColor: string;
  borderWidth: string;
  borderRadius: string;
  // shadow and opacity
  boxShadow: string;
  opacity: string;
  // position and x,y
  position: string;
  left: string;
  top: string;
  right: string;
}

export const commonDefaultProps = {
  // actions
  actionType: "",
  url: "",
  // size
  height: "",
  width: "373px",
  paddingLeft: "0px",
  paddingRight: "0px",
  paddingTop: "0px",
  paddingBottom: "0px",
  // border type
  borderStyle: "none",
  borderColor: "#000",
  borderWidth: "0",
  borderRadius: "0",
  // shadow and opacity
  boxShadow: "0 0 0 #000000",
  opacity: "1",
  // position and x,y
  position: "absolute",
  left: "0",
  top: "0",
  right: "0",
};
export interface TextComponentProps extends CommonComponentProps {
  text: string;
  fontSize: string;
  fontFamily: string;
  fontWeight: string;
  fontStyle: string;
  textDecoration: string;
  lineHeight: string;
  textAlign: string;
  color: string;
  backgroundColor: string;
}

export const textDefaultProps = {
  // basic props - font styles
  text: "正文内容",
  fontSize: "14px",
  fontFamily: "",
  fontWeight: "normal",
  fontStyle: "normal",
  textDecoration: "none",
  lineHeight: "1",
  textAlign: "left",
  color: "#000000",
  backgroundColor: "",
  ...commonDefaultProps,
};
export interface ImageComponentProps extends CommonComponentProps {
  src: string;
}

export const imageDefaultProps: ImageComponentProps = {
  src: "test.url",
  ...commonDefaultProps,
};

export const textStylePropNames = without(
  //without创建一个剔除所有给定值的新数组 生成所有style的属性
  Object.keys(textDefaultProps),
  "actionType",
  "url",
  "text"
);
export const imageStylePropsNames = without(
  Object.keys(imageDefaultProps),
  "src"
);

export const transformToComponentProps = <T extends { [key: string]: any }>(
  props: T
) => {
  return mapValues(props, (item) => {
    //mapValues创建一个对象，这个对象的key与object对象相同，值是通过 iteratee 运行 object 中每个自身可枚举属性名字符串产生的
    //这里key和props一样，返回组件内部生成props的属性方法
    return {
      type: item.constructor,
      default: item,
    };
  });
};
