import "./Categories.scss";

import { useState } from "react";

import Alert from "../Alert/Alert";
import CategoryForm from "../CategoryForm/CategoryForm";
import CategoryFormUpdate from "../CategoryForm/CategoryFormUpdate";
import Category from "../Category/Category";

const Categories = (props) => {
  const {
    allCategories,
    refreshAllCategories,
    setRefreshAllCategories,
    refreshAllTasks,
    setRefreshAllTasks,
    bearerToken,
  } = props;

  // ** States Modales **
  const [alertDeleteCategorie, setAlertDeleteCategorie] = useState(false);
  const [openCategoryForm, setOpenCategoryForm] = useState(false);

  // ** States Form **
  const [openCategoryFormUpdate, setOpenCategoryFormUpdate] = useState(false);
  const [updateName, setUpdateName] = useState("");
  const [updateId, setUpdateId] = useState("");
  const [updateIcon, setUpdateIcon] = useState("");
  const [updateColor, setUpdateColor] = useState("");

  return (
    <div className="Categories">
      <div className="Categories__newCategory">
        <h3 className="container">New category</h3>
        <div
          className="Categories__newCategory__icon"
          onClick={() => setOpenCategoryForm(!openCategoryForm)}
        >
          <i className="fas fa-plus"></i>
        </div>
      </div>

      <div className="Categories__container">
        {allCategories.length > 0 ? (
          allCategories.map((item) => {
            return (
              <Category
                key={item._id}
                category={item}
                setOpenCategoryFormUpdate={setOpenCategoryFormUpdate}
                setUpdateName={setUpdateName}
                setUpdateId={setUpdateId}
                setUpdateColor={setUpdateColor}
                setUpdateIcon={setUpdateIcon}
                setAlertDeleteCategorie={setAlertDeleteCategorie}
                refreshAllTasks={refreshAllTasks}
                setRefreshAllTasks={setRefreshAllTasks}
              />
            );
          })
        ) : (
          <div className="Categories__empty">
            <p>
              Create your first category and manage your tasks even better !
            </p>
          </div>
        )}
      </div>

      {/* Modales */}

      {/* Alerte for delete category */}
      {alertDeleteCategorie && (
        <Alert
          setAlertDeleteCategorie={setAlertDeleteCategorie}
          updateId={updateId}
          updateName={updateName}
          refreshAllCategories={refreshAllCategories}
          setRefreshAllCategories={setRefreshAllCategories}
          refreshAllTasks={refreshAllTasks}
          setRefreshAllTasks={setRefreshAllTasks}
          bearerToken={bearerToken}
        />
      )}

      {/* Form to create new category */}
      {openCategoryForm === true && (
        <CategoryForm
          setOpenCategoryForm={setOpenCategoryForm}
          openCategoryForm={allCategories && allCategories}
          refreshAllCategories={refreshAllCategories}
          setRefreshAllCategories={setRefreshAllCategories}
          bearerToken={bearerToken}
        />
      )}

      {/* Form to update a category */}
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
          bearerToken={bearerToken}
        />
      )}
    </div>
  );
};

export default Categories;
