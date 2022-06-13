import "./InputText.scss";

const InputText = (props) => {
  const { type, placeholder, value, setValue } = props;

  const handleValue = (event) => {
    setValue(event.target.value);
  };

  return (
    <input
      type={type ? type : "text"}
      placeholder={placeholder && placeholder}
      value={value}
      onChange={handleValue}
      className={"InputText"}
    />
  );
};

export default InputText;
