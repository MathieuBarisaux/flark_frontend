import "./Alert.scss";

// ** Components **
import SubmitButton from "../SubmitButton/SubmitButton";

// ** Dependencies **
import axios from "axios";

const Alert = (props) => {
  const {
    setAlertDeleteCategorie,
    updateId,
    updateName,
    refreshAllCategories,
    setRefreshAllCategories,
    refreshAllTasks,
    setRefreshAllTasks,
    bearerToken,
  } = props;

  const deleteCategory = async () => {
    try {
      await axios.delete(
        `https://flark.herokuapp.com/category/delete?category_id=${updateId}`,
        {
          headers: {
            Authorization: `Bearer ${bearerToken}`,
          },
        }
      );

      setRefreshAllCategories(!refreshAllCategories);
      setRefreshAllTasks(!refreshAllTasks);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="Alert" onClick={() => setAlertDeleteCategorie(false)}>
      <div className="Alert__container">
        <p>
          Are your sure you want to delete this category
          <em> "{updateName}" </em>
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
