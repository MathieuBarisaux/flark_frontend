import "./SwitchButton.scss";

const SwitchButton = ({ value, setValue }) => {
  return (
    <div
      className={
        value === true ? "SwitchButton" : "SwitchButton SwitchButton--false"
      }
      onClick={() => setValue(!value)}
    >
      {value === true ? (
        <p className={"SwitchButton__text"}>Yes</p>
      ) : (
        <p className={"SwitchButton__text SwitchButton__text--false"}>No</p>
      )}

      <div
        className={
          value === true
            ? "SwitchButton__round"
            : "SwitchButton__round SwitchButton__round--false"
        }
      ></div>
    </div>
  );
};

export default SwitchButton;
