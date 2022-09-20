import "./SubmitButton.scss";

const SubmitButton = (props) => {
  const { title, onclick, color, icon, isLoading } = props;

  return (
    <button
      type="submit"
      disabled={isLoading ? true : false}
      className={
        color === "red"
          ? "SubmitButton SubmitButton--red"
          : "SubmitButton SubmitButton--purple"
      }
      onClick={
        isLoading
          ? null
          : onclick
          ? () => {
              onclick();
            }
          : null
      }
    >
      {isLoading ? (
        <i className="fas fa-spinner"></i>
      ) : (
        <>
          {title} {icon && <i className={`${icon}`}></i>}
        </>
      )}
    </button>
  );
};

export default SubmitButton;
