import { prisma } from "../../config/prisma";

const getTodo = async(req, res) => {
    const {todoId} = JSON.parse(req.body);

    const todo = await prisma.todo.findUnique({
        where: {
            id: +todoId
        }
    });
  
    res.json(todo);
}

export default getTodo;