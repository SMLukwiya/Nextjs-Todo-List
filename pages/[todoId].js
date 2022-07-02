import {AiFillEdit, AiFillDelete} from 'react-icons/ai';
import {useState, useEffect} from 'react';
import { useRouter } from 'next/router';
import { useQueryClient } from 'react-query';

import Input from '../components/Input/input';
import Button from '../components/Button/button';
import Modal from '../components/Modal/modal';
import { prisma } from "../config/prisma";
import { useFetchTodoById } from '../utils/hooks/useFetchTodoById';
import {useMutateTodo} from '../utils/hooks/useMutateTodo';
import { getTodo, updateTodo, deleteTodo } from '../utils/api-functions';

const Todo = (props) => {
    const {todo} = props;

    const [_todo, setTodo] = useState(todo);

    const [title, setTitle] = useState(todo.title);
    const [description, setDescription] = useState(todo.description);
    const [completed, setCompleted] = useState(todo.completed);
    // Modal
    const [visible, setVisible] = useState(false);
    // router
    const router = useRouter();
    const { query: {todoId}} = router;
    // client
    const queryClient = useQueryClient();

    const onChangeTextHandler = (e) => {
        if (e.target.name === 'title') {
            setTitle(e.target.value)
        } else if (e.target.name === 'description') {
            setDescription(e.target.value)
        } else {
            setCompleted(e.target.value)
        }
    }

    const [isLoading, data, isError, error] = useFetchTodoById(todoId, () => getTodo({todoId}));
    
    useEffect(() => {
        if (data) {
            setTodo(data);
        }

        if (isError) {
            console.log(error)
        }
    }, [data, isError, error]);

    const {mutate : update, isMutating: updating} = useMutateTodo({
        mutateFn: () => updateTodo({id: +todoId, title, description, completed: completed === 'true' ? true : false}),
        onSuccess: (data, variables) => {
            queryClient.setQueryData(['todo', todoId], data)
            setVisible(false);
        },
        onError: (error) => {
            console.log('Update Error', error);
            setVisible(false);
        }
    });

    const {mutate : delTodo, isMutating: deleting} = useMutateTodo({
        mutateFn: () => deleteTodo({id: +todoId, title, description, completed: completed === 'true' ? true : false}),
        onSuccess: () => {
            router.push('/')
        },
        onError: (error) => {
            console.log('Delete Error: ', error);
        }
    });

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

export const getStaticProps = async(context) => {
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

export const getStaticPaths = async() => {
    const todos = await prisma.todo.findMany();
    const paths = todos.map(todo => ({params: {todoId: `${todo.id}`}}));

    return {
        paths: paths,
        fallback: true
    }
}

export default Todo;