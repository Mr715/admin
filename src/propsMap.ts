import { AllComponentProps } from './defaultProps';

export interface PropToForm {
  component: string;
  subComponent?: string;
  extraProps?: { [key: string]: any };
  text?: string;
  options?: { text: string; value: any }[];
  initTransForm?: (v: any) => any;
  afterTransform?: (v: any) => any;
  valueProp?: string | undefined;
  eventName?: string;
}

export type PropsToForms = {
  [P in keyof AllComponentProps]?: PropToForm;
};

export const mapPropsToForms: PropsToForms = {
  // text: {
  //   component: "a-input",
  // },
  src: {
    component: 'image-processer',
  },

  text: {
    text: '文本',
    component: 'a-textarea',
    extraProps: { row: 3 },
    afterTransform: (e: any) => e.target.value,
  },
  fontSize: {
    text: '字号',
    component: 'a-input-number',
    initTransForm: (v: string) => parseInt(v),
    afterTransform: (e: number) => (e ? `${e}px` : ''),
  },
  lineHeight: {
    text: '行高',
    component: 'a-slider',
    extraProps: { min: 0, max: 3, step: 0.1 },
    initTransForm: (v: string) => parseFloat(v),
    afterTransform: (e: number) => e.toString(),
  },
  textAlign: {
    component: 'a-radio-group',
    subComponent: 'a-radio-button',
    text: '对齐',
    options: [
      { value: 'left', text: '左' },
      { value: 'center', text: '中' },
      { value: 'right', text: '右' },
    ],
    afterTransform: (e: any) => e.target.value,
  },
  fontFamily: {
    component: 'a-select',
    subComponent: 'a-select-option',
    text: '字体',
    options: [
      { value: '', text: '无' },
      { value: '"FangSong","STFangsong"', text: '仿宋' },
      { value: '"SimeHei","STHeiti"', text: '黑体' },
    ],
  },
  color: {
    component: 'color-picker',
    text: '颜色',
  },
};
