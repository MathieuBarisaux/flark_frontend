import "./SubmitButton.scss";

const SubmitButton = (props) => {
  const { title, onclick, color, icon } = props;

  return (
    <button
      type="submit"
      className={
        color === "red"
          ? "SubmitButton SubmitButton--red"
          : "SubmitButton SubmitButton--purple"
      }
      onClick={
        onclick
          ? () => {
              onclick();
            }
          : null
      }
    >
      {title} {icon && <i className={`${icon}`}></i>}
    </button>
  );
};

export default SubmitButton;
