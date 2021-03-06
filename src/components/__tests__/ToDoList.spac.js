import {shallowMount} from "@vue/test-utils";
import ToDoList from "@/components/ToDoList";
import API from "@/api";
import flushPromises from "flush-promises";

jest.mock("@/api")
const mockResponse = [
    {"id": 1, "description": "dummy data"},
    {"id": 2, "description": "dummy data"}
]

const spyaddBtnClick = jest.spyOn(ToDoList.methods, 'addBtnClick')


describe("ToDoList.vue", () => {
    let wrapper

    beforeAll(async () => {

        API.getTodoList.mockResolvedValue(mockResponse)
        API.addTodo.mockResolvedValue(mockResponse)
        wrapper = shallowMount(ToDoList)
        await flushPromises()
    })
    describe("should check exist", () => {
        it('should ToDoList component exist', () => {
            expect(wrapper.exists()).toBeTruthy()
        });
        it('should textbox exist', () => {
            const txt = wrapper.find("#addTxt");
            expect(txt.exists()).toBeTruthy()
        });
        it('should add button exist', () => {
            const btn = wrapper.find("#addBtn");
            expect(btn.exists()).toBeTruthy()
        });
        it('should todo list exist', () => {
            const todolist = wrapper.find("#todolist");
            expect(todolist.exists()).toBeTruthy()
        });
    })
    describe("ToDoList component event test", () => {
        it("click event test", async () => {
            await wrapper.find("#addBtn").trigger("click")
            expect(spyaddBtnClick).toHaveBeenCalled()
        });
        it("click event test functionality (addBtnClick) test", async () => {
            const localThis = {
                todo: 'dummy',
                todoList: {
                    push: jest.fn()
                },

            }
            await ToDoList.methods.addBtnClick.call(localThis)
            expect(localThis.todoList.push).toBeCalled()
        });
        it('created lifecycle test',  async () => {
            const todolistlength = wrapper.findAll("#todolist ul li").length;

            expect(todolistlength).toEqual(mockResponse.length)
        });
    })
})