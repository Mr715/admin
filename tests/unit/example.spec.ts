import { shallowMount, mount } from "@vue/test-utils";
import HelloWorld from "@/components/HelloWorld.vue";
import hello from "../../src/components/hi.vue";
import axios from "axios";

jest.mock("axios");

//保留axios方法 并且有jest的方法
const mockAxios = axios as jest.Mocked<typeof axios>;

describe("HelloWorld.vue", () => {
  //beforeAll
  //

  it("renders props.msg when passed", () => {
    const msg = "new message";
    const wrapper = shallowMount(HelloWorld, {
      props: { msg },
    });
    // console.log(wrapper.html());
    // console.log(wrapper.get("div").text());

    console.log(wrapper.getComponent(hello));

    expect(wrapper.text()).toMatch(msg);
  });
  //async  await 同步
  it("clicking button", async () => {
    const msg = "new message";
    const wrapper = shallowMount(HelloWorld, {
      props: { msg },
    });
    await wrapper.get("button").trigger("click");
    expect(wrapper.get("button").text()).toBe("2");
  });

  it("clicking todo", async () => {
    const msg = "new message";
    const wrapper = shallowMount(HelloWorld, {
      props: { msg },
    });
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
    const msg = "new message";
    const wrapper = shallowMount(HelloWorld, {
      props: { msg },
    });
    // mockAxios.get.mockResolvedValueOnce({
    //   data: { city: "123" },
    // });
  });
});
