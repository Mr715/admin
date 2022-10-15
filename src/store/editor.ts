import { Module } from "vuex";
import { v4 as uuidv4 } from "uuid";
import { GlobalDataProps } from "@/store";
import { TextComponentProps } from "@/defaultProps";

export interface EditorProps {
  components: ComponentsData[];
  currentElement: string;
}

interface ComponentsData {
  props: { [key: string]: any };
  id: string;
  name: string;
}

export const testComponents: ComponentsData[] = [
  {
    id: uuidv4(),
    name: "l-text",
    props: {
      text: "hello",
      fontSize: "20px",
      lineHeight: 1,
      textAlign: "center",
      color: "#00000",
    },
  },
  {
    id: uuidv4(),
    name: "l-text",
    props: {
      text: "hello1",
      fontSize: "15px",
      lineHeight: 1,
      actionType: "url",
      textAlign: "right",
      fontFamily: "",
    },
  },
  {
    id: uuidv4(),
    name: "l-text",
    props: {
      text: "hello2",
      fontSize: "10px",
      lineHeight: 1,
      fontWeight: "bold",
      textAlign: "left",
      fontFamily: "",
    },
  },
];

const editor: Module<EditorProps, GlobalDataProps> = {
  state: {
    components: testComponents,
    currentElement: "",
  },
  mutations: {
    addComponent(state, props) {
      const newComponent: ComponentsData = {
        id: uuidv4(),
        name: "l-text",
        props,
      };
      state.components.push(newComponent);
    },
    setActive(state, props) {
      state.currentElement = props;
    },
    updateComponent(state, { key, value }) {
      const updateComponent = state.components.find(
        (component) => component.id === state.currentElement
      );
      if (updateComponent) {
        updateComponent.props[key as keyof TextComponentProps] = value;
      }
    },
  },
  getters: {
    getCurrentElement: (state) => {
      return state.components.find(
        (component) => component.id === state.currentElement
      );
    },
  },
};

export default editor;
