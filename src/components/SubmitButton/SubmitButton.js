import "./SubmitButton.scss";

const SubmitButton = (props) => {
  const { title } = props;

  return <button type="submit">{title}</button>;
};

export default SubmitButton;
