import {MdDoneAll, MdRemoveDone, MdAddCircle} from 'react-icons/md';

const Button = (props) => {
    const {title, completed, round, onPress} = props;

    if (round) {
        return (
            <div 
                className='w-16 h-16 flex flex-col items-center justify-center border border-solid border-gray-800 rounded-2xl'
                onClick={onPress}
            >
                <MdAddCircle className='text-gray-700 text-2xl' />
                <div className='text-black text-xs'>
                    {title}
                </div>
            </div>
        )
    }

    return (
        <div 
            className={`flex items-center justify-between h-10 w-32 rounded-xl px-2 my-2.5 cursor-pointer ${completed ? 'bg-green-700' : 'bg-orange-400'}`}
            onClick={onPress}
        >
            <div className='text-white text-xs'>
                {title}
            </div>
            {completed ? 
                <MdDoneAll className='text-white text-xl' /> :
                <MdRemoveDone className='text-white text-xl' />
            }
        </div>
    )
}

export default Button;