import { prisma } from "../../config/prisma";

const getTodos = async(req, res) => {
    const todos = await prisma.todo.findMany();
  
    res.json(todos);
}

export default getTodos;