import "./CategoryForm.scss";

// ** Hooks **
import { useState } from "react";

// ** Dependencies **
import axios from "axios";

// ** Components **
import InputText from "../InputText/InputText";
import SubmitButton from "../SubmitButton/SubmitButton";
import IconPicker from "../IconPicker/IconPicker";

const CategoryForm = (props) => {
  const { setOpenCategoryForm, refreshAllCategories, setRefreshAllCategories } =
    props;

  // States for form
  const [categoryName, setCategoryName] = useState("");
  const [categoryColor, setCategoryColor] = useState("#7E54F9");
  const [categoryIcon, setCategoryIcon] = useState("");

  /********************* Functions ***********************/

  // Create new category
  const submitNewCategory = async (event) => {
    event.preventDefault();

    const newCategory = {
      category_name: categoryName,
      category_color: categoryColor,
      category_icon: categoryIcon,
    };
    await axios.post("http://localhost:3001/category/create", newCategory);

    setOpenCategoryForm(false);
    setRefreshAllCategories(!refreshAllCategories);
  };

  /********************* Component ***********************/

  return (
    <div className="CategoryForm">
      <div
        className="CategoryForm__close"
        onClick={() => {
          setOpenCategoryForm(false);
        }}
      >
        <i className="fas fa-times"></i>
      </div>
      <form onSubmit={submitNewCategory}>
        <div className="CategoryForm__input">
          <InputText
            placeholder="New category"
            value={categoryName}
            setValue={setCategoryName}
          />

          <IconPicker inputIcon={categoryIcon} setInputIcon={setCategoryIcon} />

          <InputText
            type="color"
            value={categoryColor}
            setValue={setCategoryColor}
          />
        </div>

        <SubmitButton icon={"fas fa-plus"} title="Add new category" />
      </form>
    </div>
  );
};

export default CategoryForm;
