import {AiFillEdit, AiFillDelete} from 'react-icons/ai';
import {useState} from 'react';
import { useMutation } from 'react-query';
import { useRouter } from 'next/router';

import styles from '../styles/Todo.module.css';
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

    const [title, setTitle] = useState(todo.title);
    const [description, setDescription] = useState(todo.description);
    const [visible, setVisible] = useState(false);
    const [completed, setCompleted] = useState(todo.completed);
    const router = useRouter();
    const { query: {todoId}} = router;

    if (!props.todo) {
        return (
            <div>Todo not found</div>
        )
    }

    const {mutate: update, isLoading: updating} = useMutation(() => updateTodo({id: +todoId, title, description, completed: completed === 'true' ? true : false}), {
        onSuccess: (data) => {
            setTitle(data.title)
            setDescription(data.description)
            setCompleted(data.completed)
            setVisible(false);
        },
        onError: (error) => {
            console.log('Update Error', error)
        }
    })

    const {mutate: delTodo, isLoading: deleting} = useMutation(() => deleteTodo({id: +todoId}), {
        onSuccess: (data) => {
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
        <div className={styles.inputContainer}>
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
          <div className={styles.selectContainer}>
            <label className={styles.selectLabel}>Status: </label>
            <select value={completed} onChange={onChangeTextHandler} name='status' className={styles.select}>
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
        <div className={styles.container}>
            <div className={styles.content}>
                <>
                    <div className={styles.title}>{title}</div>
                    <div className={styles.description}>{description}</div>
                    <div className={styles.statusComplete}>{completed ? 'Complete' : 'Incomplete'}</div>
                </>
                <div className={styles.editContainer}>
                    <div className={styles.iconContainer}>
                        <span className={styles.edit}>Edit</span>
                        <AiFillEdit className={styles.icon} onClick={() => setVisible(true)} />
                    </div>
                    <div className={styles.iconContainer}>
                        <span className={styles.edit}>Delete</span>
                        <AiFillDelete className={styles.iconDelete} onClick={() => delTodo()} />
                    </div>
                </div>
            </div>
            {visible && <Modal onClose={() =>setVisible(false)}>{UpdateTodoComponent()}</Modal>}
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