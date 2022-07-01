
const Input = (props) => {
    const {label, value, type, name, onChange} = props;

    return (
        <div className='flex flex-col my-2.5 w-full'>
            <label className='text-gray-700 text-sm my-1.5 mx-1'>
                {label}
            </label>
            <input 
                type={type}
                value={value}
                name={name}
                className='text-black bg-white border border-solid border-gray-400 p-1.5 h-9 rounded-xl'
                onChange={onChange}
            />
        </div>
    )
}

export default Input;