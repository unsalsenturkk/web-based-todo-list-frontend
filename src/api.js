import axios from "axios";
import adapter from "axios/lib/adapters/http"

axios.defaults.adapter = adapter;

export class API {
    constructor(url) {
        if (url === undefined || url === "") {
            url = "http://localhost:3000/api/v1";
        }
        if (url.endsWith("/")) {
            url = url.substr(0, url.length - 1)
        }
        this.url = url
    }

    withPath(path) {
        if (!path.startsWith("/")) {
            path = "/" + path
        }
        return `${this.url}${path}`
    }

    async getTodoList() {
        return  axios
            .get(this.withPath('/api/v1/todolist'))
            .then(r => r.data)
    }

    async addTodo(todo) {
        return  axios
            .post(this.withPath('/api/v1/todolist'), {todo : todo})
            .then(r => r.data)

    }
}

export default new API("http://localhost:3000")
