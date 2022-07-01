import { AiOutlineClose } from 'react-icons/ai';
import classes from './modal.module.css';

const Modal = (props) => {
    const {children, onClose} = props;

    return (
        <div className={classes.container}>
            <div>
                <AiOutlineClose onClick={onClose} className={classes.addIcon} />
                {children}
            </div>
        </div>
    )
}

export default Modal;