import "./CategoryForm.scss";

// ** Dependencies **
import axios from "axios";

// ** Components **
import InputText from "../InputText/InputText";
import SubmitButton from "../SubmitButton/SubmitButton";
import IconPicker from "../IconPicker/IconPicker";

const CategoryFormUpdate = (props) => {
  const {
    setOpenCategoryFormUpdate,
    refreshAllCategories,
    setRefreshAllCategories,
    updateName,
    setUpdateName,
    updateIcon,
    setUpdateIcon,
    updateColor,
    setUpdateColor,
    updateId,
    bearerToken,
  } = props;

  /********************* Functions ***********************/

  const updateCategory = async (event) => {
    event.preventDefault();

    const toUpCategory = {
      category_name: updateName,
      category_color: updateColor,
      category_icon: updateIcon,
      category_id: updateId,
    };

    await axios.put("http://localhost:3001/category/update", toUpCategory, {
      headers: {
        Authorization: `Bearer ${bearerToken}`,
      },
    });

    setOpenCategoryFormUpdate(false);
    setRefreshAllCategories(!refreshAllCategories);
  };

  /********************* Component ***********************/

  return (
    <div className="CategoryForm">
      <div
        className="CategoryForm__close"
        onClick={() => {
          setOpenCategoryFormUpdate(false);
        }}
      >
        <i className="fas fa-times"></i>
      </div>

      <form onSubmit={updateCategory}>
        <div className="CategoryForm__input">
          <InputText
            placeholder="New category"
            value={updateName}
            setValue={setUpdateName}
          />

          <IconPicker inputIcon={updateIcon} setInputIcon={setUpdateIcon} />

          <InputText
            type="color"
            value={updateColor}
            setValue={setUpdateColor}
          />
        </div>

        <SubmitButton title="Update category" />
      </form>
    </div>
  );
};

export default CategoryFormUpdate;
