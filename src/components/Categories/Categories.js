import "./Categories.scss";

import { useState } from "react";

import Alert from "../Alert/Alert";
import CategoryForm from "../CategoryForm/CategoryForm";
import CategoryFormUpdate from "../CategoryForm/CategoryFormUpdate";

const Categories = (props) => {
  const {
    allCategories,
    allCategoriesLoading,
    refreshAllCategories,
    setRefreshAllCategories,
    refreshAllTasks,
    setRefreshAllTasks,
  } = props;

  // ** States Modales **
  const [alertDeleteCategorie, setAlertDeleteCategorie] = useState(false);
  const [openCategoryForm, setOpenCategoryForm] = useState(false);

  const [targetCategorieID, setTargetCategorieID] = useState("");
  const [targetCategoryName, setTargetCategoryName] = useState("");

  // ** States Form **
  const [openCategoryFormUpdate, setOpenCategoryFormUpdate] = useState(false);
  const [updateName, setUpdateName] = useState("");
  const [updateId, setUpdateId] = useState("");
  const [updateIcon, setUpdateIcon] = useState("");
  const [updateColor, setUpdateColor] = useState("");

  // TODO modify categories Form

  return (
    <div className="Categories">
      <div className="Categories__newCategory">
        <h3 className="container">New category</h3>
        <div
          className="NewCategory__icon"
          onClick={() => setOpenCategoryForm(!openCategoryForm)}
        >
          <i className="fas fa-plus"></i>
        </div>
      </div>

      <div className="Categories__container">
        {allCategoriesLoading === false ? (
          <div className="Loader">
            <i class="fas fa-spinner"></i>
          </div>
        ) : (
          allCategories.map((item) => {
            return (
              <div
                className="Category"
                key={item._id}
                style={{ backgroundColor: item.category_color }}
              >
                <div className="Category__tools">
                  <i className="fas fa-ellipsis-v"></i>
                  <ul>
                    <li
                      onClick={() => {
                        setOpenCategoryFormUpdate(!openCategoryFormUpdate);
                        setUpdateName(item.category_name);
                        setUpdateId(item._id);
                        setUpdateIcon(item.category_icon);
                        setUpdateColor(item.category_color);
                      }}
                    >
                      <i className="fas fa-eraser"></i>
                      Modify
                    </li>
                    <li
                      onClick={() => {
                        setAlertDeleteCategorie(true);
                        setTargetCategorieID(item._id);
                        setTargetCategoryName(item.category_name);
                      }}
                    >
                      <i className="fas fa-trash-alt"></i>
                      Delete
                    </li>
                  </ul>
                </div>
                <p>{item.number_of_todo}</p>
                <p>{item.category_name}</p>
                <i className={`fa ${item.category_icon}`}></i>
              </div>
            );
          })
        )}
      </div>

      {/* Modales */}
      {alertDeleteCategorie && (
        <Alert
          setAlertDeleteCategorie={setAlertDeleteCategorie}
          targetCategorieID={targetCategorieID}
          targetCategoryName={targetCategoryName}
          refreshAllCategories={refreshAllCategories}
          setRefreshAllCategories={setRefreshAllCategories}
          refreshAllTasks={refreshAllTasks}
          setRefreshAllTasks={setRefreshAllTasks}
        />
      )}

      {openCategoryForm === true && (
        <CategoryForm
          setOpenCategoryForm={setOpenCategoryForm}
          openCategoryForm={allCategories && allCategories}
          refreshAllCategories={refreshAllCategories}
          setRefreshAllCategories={setRefreshAllCategories}
          targetCategoryName={targetCategoryName}
          setTargetCategoryName={setTargetCategoryName}
        />
      )}

      {openCategoryFormUpdate === true && (
        <CategoryFormUpdate
          setOpenCategoryFormUpdate={setOpenCategoryFormUpdate}
          refreshAllCategories={refreshAllCategories}
          setRefreshAllCategories={setRefreshAllCategories}
          updateName={updateName}
          setUpdateName={setUpdateName}
          updateId={updateId}
          updateIcon={updateIcon}
          setUpdateIcon={setUpdateIcon}
          updateColor={updateColor}
          setUpdateColor={setUpdateColor}
        />
      )}
    </div>
  );
};

export default Categories;
