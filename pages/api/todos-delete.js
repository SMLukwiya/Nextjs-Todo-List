// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { prisma } from "../../config/prisma";

const deleteTodo = async(req, res) => {
  if (req.method !== 'DELETE') {
    return res.status(405).json({message:  'Method not allowed'});
  }

  const todo = JSON.parse(req.body);

  const deletedData = await prisma.todo.delete({
    where: {
        id: todo.id
    }
  })

  res.json(deletedData);
}

export default deleteTodo;
