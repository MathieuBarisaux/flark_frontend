import "./InputText.scss";

const InputText = (props) => {
  const { type, placeholder, value, setValue } = props;

  const handleValue = (event) => {
    setValue(event.target.value);
  };

  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={handleValue}
    />
  );
};

export default InputText;
