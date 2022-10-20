import { shallowMount, mount, VueWrapper } from "@vue/test-utils";
import HelloWorld from "@/components/HelloWorld.vue";
import hello from "../../src/components/hi.vue";
import flushPromises from "flush-promises";
import axios from "axios";

jest.mock("axios");

//保留axios方法 并且有jest的方法
const mockAxios = axios as jest.Mocked<typeof axios>;
let wrapper: VueWrapper<any>;
const msg = "new message";
describe("HelloWorld.vue", () => {
  //beforeAll
  //
  beforeAll(() => {
    wrapper = shallowMount(HelloWorld, {
      props: { msg },
    });
  });

  it("renders props.msg when passed", () => {
    console.log(wrapper.getComponent(hello));

    expect(wrapper.text()).toMatch(msg);
  });
  //async  await 同步
  it("clicking button", async () => {
    await wrapper.get("button").trigger("click");
    expect(wrapper.get("button").text()).toBe("2");
  });

  it("clicking todo", async () => {
    await wrapper.get("input").setValue(msg);
    expect(wrapper.get("input").element.value).toBe(msg);
    await wrapper.get(".addTodo").trigger("click");
    expect(wrapper.findAll("li")).toHaveLength(1);
    console.log(wrapper.emitted());
    //先检测有没有send方法，才能继续往下走
    expect(wrapper.emitted()).toHaveProperty("send");
    const events = wrapper.emitted("send");
    expect(events && events[0]).toEqual([msg]);
  });
  //跑当前的
  it.only("clicking todo11", async () => {
    mockAxios.get.mockResolvedValueOnce({
      data: { city: "123" },
    });
    await wrapper.get(".loadUser").trigger("click");
    expect(mockAxios.get).toHaveBeenCalled();
    expect(wrapper.find(".loading").exists()).toBeTruthy();
    await flushPromises();
    // 界面更新完毕
    expect(wrapper.find(".loading").exists()).toBeFalsy();
    expect(wrapper.get(".userName").text()).toBe("123");
  });
  afterEach(() => {
    mockAxios.get.mockReset();
  });
});
