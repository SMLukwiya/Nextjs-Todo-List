import {BsFillArrowRightCircleFill} from 'react-icons/bs'
import Link from 'next/link';

const TodoItem = (props) => {
    const {title, completed, link} = props;

    return (
        <div className='w-96 h-14 flex items-center my-1.5 border border-solid border-gray-400 rounded-xl overflow-hidden'>
            <div className={`h-full w-5 ${completed ? 'bg-green-700'  : 'bg-orange-400'}`} />
            <div className='h-full w-full flex items-center justify-between mx-1.5'>
                <div className='text-sm'>{title}</div>
                <Link href={`${link}`}>
                    <BsFillArrowRightCircleFill className={`text-xl cursor-pointer ${completed ? 'text-green-700' : 'text-orange-400'}`} />
                </Link>
            </div>
        </div>
    )
}

export default TodoItem;