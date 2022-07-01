// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { prisma } from "../../config/prisma";

const addTodo = async(req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({message:  'Method not allowed'});
  }

  const todo = JSON.parse(req.body);

  const saveData = await prisma.todo.create({
    data: todo
  })

  res.json(saveData);
}

export default addTodo;
