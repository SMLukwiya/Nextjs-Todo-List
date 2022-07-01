import {AiFillEdit, AiFillDelete} from 'react-icons/ai';
import {useState} from 'react';
import { useMutation } from 'react-query';
import { useRouter } from 'next/router';

import Input from '../components/Input/input';
import Button from '../components/Button/button';
import Modal from '../components/Modal/modal';
import { prisma } from "../config/prisma";

const updateTodo = async(data) => {
    const response = await fetch('/api/todos-update', {
      method: 'POST',
      body: JSON.stringify(data)
    });

    return response.json();
}

const deleteTodo = async(id) => {
    const response = await fetch('/api/todos-delete', {
        method: 'DELETE',
        body: JSON.stringify(id)
    });

    return response.json();
}

const Todo = (props) => {
    const {todo} = props;

    const [_todo, setTodo] = useState(todo);
    const [title, setTitle] = useState(todo.title);
    const [description, setDescription] = useState(todo.description);
    const [completed, setCompleted] = useState(todo.completed);
    const [visible, setVisible] = useState(false);
    const router = useRouter();
    const { query: {todoId}} = router;

    if (!props.todo) {
        return (
            <div>Todo not found</div>
        )
    }

    const {mutate: update, isLoading: updating} = useMutation(() => updateTodo({id: +todoId, title, description, completed: completed === 'true' ? true : false}), {
        onSuccess: (data) => {
            setTodo(data);
            setVisible(false);
        },
        onError: (error) => {
            console.log('Update Error', error)
        }
    })

    const {mutate: delTodo, isLoading: deleting} = useMutation(() => deleteTodo({id: +todoId}), {
        onSuccess: () => {
            router.push('/')
        },
        onError: (error) => {
            console.log('Delete Error: ', error);
        }
    })

    const onChangeTextHandler = (e) => {
        if (e.target.name === 'title') {
            setTitle(e.target.value)
        } else if (e.target.name === 'description') {
            setDescription(e.target.value)
        } else {
            setCompleted(e.target.value)
        }
    }

    const UpdateTodoComponent = () => (
        <div className="flex flex-col items-center justify-center w-96 bg-white p-2.5 rounded-md">
          <>
            <Input 
              value={title}
              label='Title'
              type='text'
              name='title'
              onChange={onChangeTextHandler}
            />
          </>
          <>
            <Input 
              value={description}
              label='Description'
              type='text'
              name='description'
              onChange={onChangeTextHandler}
            />
          </>
          <div className="w-full">
            <label className="text-xs">Status: </label>
            <select 
                value={completed}
                onChange={onChangeTextHandler}
                name='status'
                className="my-4 border border-gray-600 border-solid rounded-lg p-1.5 text-sm"
            >
                <option value={true}>Completed</option>
                <option value={false}>Not Completed</option>
            </select>
          </div>
          <>
            <Button
              title='Update'
              onPress={() =>
                update()
              }
              round
              />
          </>
          {updating && <div>Updating</div>}
          {deleting && <div>Deleting</div>}
        </div>
    )

    return (
        <div className="h-screen w-screen flex flex-col items-center justify-start py-16">
            <div className="border border-gray-400 border-solid rounded-md p-1.5 w-80">
                <>
                    <div className="text-xl text-gray-800">
                        {_todo.title}
                    </div>
                    <div className="text-base mt-2.5 mb-1.5">
                        {_todo.description}
                    </div>
                    <div className="text-green p-1 items-end rounded-xl border border-solid border-green-900 text-xs w-20 text-center">
                        {_todo.completed ? 'Complete' : 'Incomplete'}
                    </div>
                </>
                <div className="flex items-center justify-between mt-2.5 mb-1.5">
                    <div className="flex items-center justify-center">
                        <span className="text-xs">Edit</span>
                        <AiFillEdit 
                            className="text-base text-gray-700 cursor-pointer"
                            onClick={() => setVisible(true)}
                        />
                    </div>
                    <div className="flex items-center justify-center">
                        <span className="text-xs">Delete</span>
                        <AiFillDelete
                            className="text-base text-red-700 cursor-pointer"
                            onClick={() => delTodo()}
                        />
                    </div>
                </div>
            </div>
            {visible && 
                <Modal onClose={() =>setVisible(false)}>
                    {UpdateTodoComponent()}
                </Modal>
            }
        </div>
    )
}

export const getServerSideProps = async(context) => {
    const todoId = context.params.todoId;

    const todo = await prisma.todo.findUnique({
        where: {
            id: +todoId
        }
    });
  
    return {
      props: {
        todo
      },
    }
  }

/*export const getStaticPaths = async() => {
    const todos = await prisma.todo.findMany();
    const paths = todos.map(todo => ({params: {todoId: `${todo.id}`}}));

    return {
        paths: paths,
        fallback: true
    }
}*/

export default Todo;