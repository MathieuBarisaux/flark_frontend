import "./CategoryForm.scss";

import { useState } from "react";
import axios from "axios";

import iconsList from "../../assets/data/icons.json";

const CategoryForm = (props) => {
  const { setOpenCategoryForm, refreshAllCategories, setRefreshAllCategories } =
    props;

  const [categoryName, setCategoryName] = useState("");
  const [categoryColor, setCategoryColor] = useState("#7E54F9");
  const [categoryIconSearch, setCategoryIconSearch] = useState("");
  const [categoryIcon, setCategoryIcon] = useState("");
  const [iconSelector, setIconSelector] = useState(false);

  const catchChangeName = (event) => {
    const newValue = event.target.value;
    setCategoryName(newValue);
  };

  const catchChangeColor = (event) => {
    const newValue = event.target.value;
    setCategoryColor(newValue);
  };

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

  const catchSearchIcon = (event) => {
    setIconSelector(false);
    const newValue = event.target.value;
    setCategoryIconSearch(newValue);
  };

  let iconToSelect = [];
  const searchIcon = () => {
    iconToSelect = [];

    if (categoryIconSearch.length >= 2) {
      for (let i = 0; i < iconsList.length; i++) {
        if (
          iconsList[i].l
            .toLowerCase()
            .indexOf(categoryIconSearch.toLowerCase()) !== -1
        ) {
          if (iconSelector === false) {
            iconToSelect.push(iconsList[i]);
          }
        }
      }
    } else {
      iconToSelect = [];
    }

    return iconToSelect;
  };

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
          <input
            type="text"
            name="categoryName"
            placeholder="New category"
            value={categoryName}
            onChange={catchChangeName}
          />

          <div className="CategoryForm__iconPicker">
            <div className="CategoryForm__iconPicker--input">
              <p>Add an icon :</p>
              <input
                type="text"
                placeholder="Search"
                name="CategoryIcon"
                autoComplete="off"
                onChange={catchSearchIcon}
              />
              <div>
                <i className={`fa ${categoryIcon}`}></i>
              </div>
            </div>
            <div className="CategoryForm__iconPicker--suggestion">
              {searchIcon().map((item, index) => {
                return (
                  <div
                    key={index}
                    onClick={() => {
                      setCategoryIcon(item.c);
                      setIconSelector(true);
                    }}
                  >
                    <i className={`fa ${item.c}`}></i>
                  </div>
                );
              })}
            </div>
          </div>

          <input
            type="color"
            name="category_color"
            value={categoryColor}
            onChange={catchChangeColor}
          />
        </div>
        <button type="submit">
          Add new category <i className="fas fa-plus"></i>
        </button>
      </form>
    </div>
  );
};

export default CategoryForm;
