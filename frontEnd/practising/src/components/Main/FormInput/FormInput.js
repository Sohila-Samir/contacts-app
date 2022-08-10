import './FormInput.css';

const FormInput = ({ ...inputOptions }) => {
  return(
    <input
      className={inputOptions.className}
      type={inputOptions.type}
      placeholder={inputOptions.placeholder}
      name={inputOptions.name}
      required={inputOptions.isRequired}
      value={inputOptions.value}
      onChange={inputOptions.onChangeHandlerFN}
    >
    </input>
  );
}

export default FormInput;