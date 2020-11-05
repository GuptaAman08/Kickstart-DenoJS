import { Application } from "https://deno.land/x/oak/mod.ts";
import todosRoutes from "./routes/todos.ts"

const app = new Application();

app.use(async (ctx, next) => {
    console.log('Some Middleware')
    // You need to wait for upcoming middlewares to be done and Deno doesnt wait if there exosts any async tasks in upcoming middlewares. So, you use await to wait explicitly 
    await next()
})

app.use(todosRoutes.routes())
app.use(todosRoutes.allowedMethods())

await app.listen({ port: 3000 });