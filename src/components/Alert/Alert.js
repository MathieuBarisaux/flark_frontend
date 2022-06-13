import axios from "axios";
import "./Alert.scss";

const Alert = (props) => {
  const {
    setAlertDeleteCategorie,
    targetCategorieID,
    targetCategorieName,
    refreshAllCategories,
    setRefreshAllCategories,
    refreshAllTasks,
    setRefreshAllTasks,
  } = props;

  const deleteCategory = async () => {
    try {
      await axios.delete(
        `http://localhost:3001/category/delete?category_id=${targetCategorieID}`
      );

      setRefreshAllCategories(!refreshAllCategories);
      setRefreshAllTasks(!refreshAllTasks);
    } catch (error) {
      console.log(error.response);
    }
  };

  return (
    <div className="Alert">
      <p>
        Are your sure you want to delete this category
        <em> "{targetCategorieName}" </em>
        and all the task it contains ?
      </p>
      <p>If you delete this, you can't recover it.</p>
      <div className="Alert__btns">
        <button
          onClick={() => {
            deleteCategory();
            setAlertDeleteCategorie(false);
          }}
        >
          Yes
        </button>
        <button onClick={() => setAlertDeleteCategorie(false)}>No</button>
      </div>
    </div>
  );
};

export default Alert;
