import "./SubmitButton.scss";

const SubmitButton = (props) => {
  const { title, onclick, color } = props;

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
      {title}
    </button>
  );
};

export default SubmitButton;
