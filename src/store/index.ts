import { createStore } from "vuex";
import { message } from "ant-design-vue";
import templates, { TemplatesProps } from "./template";
import editor, { EditorProps } from "./editor";
import user, { UserProps } from "./user";

// export interface UserProps {
//   isLogin: boolean;
//   userName?: string;
// }
export interface TemplateProps {
  id: number;
  title: string;
  author: string;
}
export interface GlobalDataProps {
  user: UserProps;
  templates: TemplatesProps;
  editor: EditorProps;
}

const testData = [
  { id: 1, title: "ab", author: "zhangsan" },
  { id: 2, title: "dd", author: "x" },
  { id: 3, title: "ff", author: "wang" },
];

const store = createStore<GlobalDataProps>({
  modules: {
    templates,
    editor,
    user,
  },
});

export default store;
