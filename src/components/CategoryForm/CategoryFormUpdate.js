import "./CategoryForm.scss";

import { useState } from "react";
import axios from "axios";

import iconsList from "../../assets/data/icons.json";

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
  } = props;

  const [iconSelector, setIconSelector] = useState(false);

  const catchChangeName = (event) => {
    const newValue = event.target.value;
    setUpdateName(newValue);
  };

  const catchChangeColor = (event) => {
    const newValue = event.target.value;
    setUpdateColor(newValue);
  };

  const updateCategory = async (event) => {
    event.preventDefault();

    const toUpCategory = {
      category_name: updateName,
      category_color: updateColor,
      category_icon: updateIcon,
      category_id: updateId,
    };

    await axios.put("http://localhost:3001/category/update", toUpCategory);

    setOpenCategoryFormUpdate(false);
    setRefreshAllCategories(!refreshAllCategories);
  };

  const catchSearchIcon = (event) => {
    setIconSelector(false);
    const newValue = event.target.value;
    setUpdateIcon(newValue);
  };

  let iconToSelect = [];
  const searchIcon = () => {
    iconToSelect = [];

    if (updateIcon.length >= 2) {
      for (let i = 0; i < iconsList.length; i++) {
        if (
          iconsList[i].l.toLowerCase().indexOf(updateIcon.toLowerCase()) !== -1
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
      <i
        className="fas fa-times"
        onClick={() => {
          setOpenCategoryFormUpdate(false);
        }}
      ></i>
      <form onSubmit={updateCategory}>
        <div className="CategoryForm__input">
          <input
            type="text"
            name="updateName"
            placeholder="New category"
            value={updateName}
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
                <i className={`fa ${updateIcon}`}></i>
              </div>
            </div>
            <div className="CategoryForm__iconPicker--suggestion">
              {searchIcon().map((item, index) => {
                return (
                  <div
                    key={index}
                    onClick={() => {
                      setUpdateIcon(item.c);
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
            value={updateColor}
            onChange={catchChangeColor}
          />
        </div>
        <button type="submit">Modify category</button>
      </form>
    </div>
  );
};

export default CategoryFormUpdate;
