import {useState} from 'react';
import { useMutation } from 'react-query';

import TodoItem from '../components/Todo/todo-item';
import Button from '../components/Button/button';
import Input from '../components/Input/input';
import Modal from '../components/Modal/modal';
import {prisma} from '../config/prisma';

const saveTodo = async(data) => {
  const response = await fetch('/api/todos-add', {
    method: 'POST',
    body: JSON.stringify(data)
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return await response.json();
}

export default function Home(props) {
  const {todos} = props;
  const [allTodos, setAllTodos] = useState(todos);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [visible, setVisible] = useState(false);

  const onChangeTextHandler = (e) =>  {
    if (e.target.name === 'title') {
      setTitle(e.target.value)
    } else {
      setDescription(e.target.value)
    }
  }

  const {mutate, isLoading} = useMutation(() => saveTodo({title, description, completed: false}), {
    onMutate: data => {

    },
    onSuccess: (data) => {
        setAllTodos([...allTodos, data])
        setVisible(false);
    },
    onError: (error) => {
        console.log('Error', error)
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
        <Button
          title='Save'
          onPress={() =>
              mutate()
          }
          round
          />
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

export const getServerSideProps = async() => {
  const todos = await prisma.todo.findMany();

  return {
    props: {
      todos
    }
  }
}
