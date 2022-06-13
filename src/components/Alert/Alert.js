import "./Alert.scss";

// ** Components **
import SubmitButton from "../SubmitButton/SubmitButton";

// ** Dependencies **
import axios from "axios";

const Alert = (props) => {
  const {
    setAlertDeleteCategorie,
    targetCategorieID,
    targetCategoryName,
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
    <div className="Alert" onClick={() => setAlertDeleteCategorie(false)}>
      <div className="Alert__container">
        <p>
          Are your sure you want to delete this category
          <em> "{targetCategoryName}" </em>
          and all the task it contains ?
        </p>
        <p>If you delete this, you can't recover it.</p>
        <div className="Alert__btns">
          <SubmitButton
            title={"Yes"}
            onclick={() => {
              deleteCategory();
              setAlertDeleteCategorie(false);
            }}
            color={"red"}
          />

          <SubmitButton
            title={"No"}
            onclick={() => setAlertDeleteCategorie(false)}
            color={"purple"}
          />
        </div>
      </div>
    </div>
  );
};

export default Alert;
