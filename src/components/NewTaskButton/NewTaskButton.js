import "./NewTaskButton.scss";

const NewTaskButton = ({ setTaskFormOpen }) => {
  return (
    <div className="NewTaskButton" onClick={() => setTaskFormOpen(true)}>
      <i className="fas fa-plus"></i>
    </div>
  );
};

export default NewTaskButton;
