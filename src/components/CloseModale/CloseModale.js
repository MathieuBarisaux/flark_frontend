import "./CloseModale.scss";

const CloseModale = ({ setValue }) => {
  /********************* Component ***********************/
  return (
    <div
      className="CloseModale"
      onClick={() => {
        setValue(false);
      }}
    >
      <i className="fas fa-times"></i>
    </div>
  );
};

export default CloseModale;
