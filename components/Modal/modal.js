import { AiOutlineClose } from 'react-icons/ai';

const Modal = (props) => {
    const {children, onClose} = props;

    return (
        <div className='bg-black/50 absolute top-0 w-screen h-screen flex items-center justify-center'>
            <div>
                <AiOutlineClose onClick={onClose} className='text-gray-500 bg-white text-xl w-8 h-8 rounded-2xl' />
                {children}
            </div>
        </div>
    )
}

export default Modal;