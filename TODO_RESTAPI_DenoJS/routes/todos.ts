import { Router } from "https://deno.land/x/oak/mod.ts";

const router = new Router()

interface Todo {
    id: string,
    text: string
}

let todos: Todo[] = []

router.get("/todos", (ctx) => {
    ctx.response.body = { todos: todos }
})

router.post("/todos", async (ctx) => {
    const { value } = ctx.request.body({ type: "json" });
    const { text } = await value;
    const newTodo: Todo = {
        id: new Date().toISOString(),
        text: text
    }

    todos.push(newTodo)

    ctx.response.body = { message: "Item Added", todos: todos}
})

router.put("/todos/:todoId", async (ctx) => {
    const { value } = ctx.request.body({ type: "json" });
    const { text } = await value;

    const id = ctx.params.todoId

    const itemIndex = todos.findIndex(item => item.id === id)
    todos[itemIndex] = {
        id: todos[itemIndex].id,
        text: text
    }
    
    ctx.response.body = { message: "Updated Todo"}
})

router.delete("/todos/:todoId", (ctx) => {
    const id = ctx.params.todoId

    todos = todos.filter(item => item.id !== id)
    ctx.response.body = { message: "Deleted Todo"}
})


export default router