import classes from './todo-item.module.css'
import {BsFillArrowRightCircleFill} from 'react-icons/bs'
import Link from 'next/link';

const TodoItem = (props) => {
    const {title, completed, link} = props;

    return (
        <div className={classes.container}>
            <div className={completed ? classes.indicatorComplete : classes.indicatorInComplete} />
            <div className={classes.titleContainer}>
                <div className={classes.todoTitle}>{title}</div>
                <Link href={`${link}`}>
                    <BsFillArrowRightCircleFill className={completed ? classes.iconComplete : classes.iconInComplete} />
                </Link>
            </div>
        </div>
    )
}

export default TodoItem;