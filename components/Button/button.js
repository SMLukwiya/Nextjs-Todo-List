import {MdDoneAll, MdRemoveDone, MdAddCircle} from 'react-icons/md';

import classes from './button.module.css';

const Button = (props) => {
    const {title, completed, round, onPress, icon} = props;

    if (round) {
        return (
            <div className={classes.addButtonContainer} onClick={onPress}>
                <MdAddCircle className={classes.addIcon} />
                <div className={classes.addTitle}>{title}</div>
            </div>
        )
    }

    return (
        <div className={classes.container} style={{backgroundColor: completed ? 'green' : '#faaa41'}} onClick={onPress}>
            <div className={classes.buttonTitle}>{title}</div>
            {completed ? 
                <MdDoneAll className={classes.iconComplete} /> :
                <MdRemoveDone className={classes.iconComplete} />
            }
        </div>
    )
}

export default Button;