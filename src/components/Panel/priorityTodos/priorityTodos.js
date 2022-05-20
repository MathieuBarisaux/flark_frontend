import "./PriorityTodos.scss";

const PriorityTodos = () => {
  return (
    <div className="PriorityTodos PriorityTodos--blue">
      <h3>Urgent & important</h3>
      <h4>Your favorite categorie</h4>
      <div className="PriorityTodos__todoContainer">
        <div>
          <p>
            Complet <i className="fas fa-check-circle"></i>
          </p>
          <p>12</p>
        </div>
        <div>
          <p>
            In progress <i className="fas fa-circle-notch"></i>
          </p>
          <p>12</p>
        </div>
      </div>
    </div>
  );
};

export default PriorityTodos;
