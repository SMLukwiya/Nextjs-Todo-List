import {useState, useEffect} from 'react';

import TodoItem from '../components/Todo/todo-item';
import Button from '../components/Button/button';
import Input from '../components/Input/input';
import Modal from '../components/Modal/modal';
import {prisma} from '../config/prisma';
import { useFetchTodo } from '../utils/hooks/useFetchTodo';
import { useMutateTodo } from '../utils/hooks/useMutateTodo';
import { saveTodo, getAllTodos } from '../utils/api-functions';

export default function Home(props) {
  const {todos} = props;
  const [allTodos, setAllTodos] = useState(todos);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  // Modal
  const [visible, setVisible] = useState(false);

  const onChangeTextHandler = (e) =>  {
    if (e.target.name === 'title') {
      setTitle(e.target.value)
    } else {
      setDescription(e.target.value)
    }
  }

  const [isLoading, data, isError, error] = useFetchTodo({
    queryId: 'fetch-all-todos',
    fetchFn: getAllTodos
  });

  console.log(data)

  useEffect(() => {
    if (data) {
      setAllTodos(data)
    }

    if (isError) {
      console.log(error);
    }
  }, [data, isError, error])

  const {mutate, isMutating} = useMutateTodo({
    mutateFn: () => saveTodo({title, description, completed: false}),
    onSuccess: (data) => {
      setAllTodos([...allTodos, data]);
      setVisible(false);
    },
    onError: (error) => {
      console.log(error);
      setVisible(false);
    }
  })

  const AddTodoComponent = () => (
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
      <>
        {isMutating ? <div>Saving</div> :
          <Button
            title='Save'
            onPress={() =>
                mutate()
            }
            round
          />
        }
      </>
    </div>
  )
  
  return (
    <div className="h-screen w-screen flex flex-col items-center justify-start py-16">
      <div className="text-3xl">All Todos</div>
      <>
        {allTodos.map((todo) => <TodoItem key={todo.id} title={todo.title} completed={todo.completed} link={todo.id} />)}
      </>
      <div className="flex justify-between w-96">
        <Button title='Complete' completed />
        <Button
          title='Add'
          round
          onPress={() => setVisible(true)}
        />
        <Button title='Incomplete' />
      </div>
      {visible && <Modal onClose={() => setVisible(false)}>{AddTodoComponent()}</Modal>}
      {isLoading && <div>Loading</div>}
    </div>
  )
}

export const getStaticProps = async() => {
  const todos = await prisma.todo.findMany();

  return {
    props: {
      todos
    }
  }
}
