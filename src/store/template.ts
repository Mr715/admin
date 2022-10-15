import { Module } from "vuex";
import { GlobalDataProps } from "./index";

export interface TemplateProps {
  id: number;
  title: string;
  author: string;
}

const testData = [
  { id: 1, title: "ab", author: "zhangsan" },
  { id: 2, title: "dd", author: "x" },
  { id: 3, title: "ff", author: "wang" },
];

export interface TemplatesProps {
  data: TemplateProps[];
}

const templates: Module<TemplatesProps, GlobalDataProps> = {
  state: {
    data: testData,
  },
  getters: {
    getTemplateById: (state) => (id: number) => {
      return state.data.find((t) => t.id === id);
    },
  },
};

export default templates;
