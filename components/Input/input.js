import classes from './input.module.css';

const Input = (props) => {
    const {label, value, type, name, onChange} = props;

    return (
        <div className={classes.container}>
            <label className={classes.label}>{label}</label>
            <input 
                type={type}
                value={value}
                name={name}
                className={classes.input}
                onChange={onChange}
            />
        </div>
    )
}

export default Input;