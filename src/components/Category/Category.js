import "./Category.scss";

const Category = (props) => {
  const {
    category,
    setOpenCategoryFormUpdate,
    setUpdateName,
    setUpdateColor,
    setUpdateId,
    setUpdateIcon,
    setAlertDeleteCategorie,
  } = props;

  return (
    <div
      className="Category"
      style={{ backgroundColor: category.category_color }}
    >
      <div className="Category__tools">
        <i className="fas fa-ellipsis-v"></i>
        <ul>
          <li
            onClick={() => {
              setOpenCategoryFormUpdate(true);
              setUpdateName(category.category_name);
              setUpdateId(category._id);
              setUpdateIcon(category.category_icon);
              setUpdateColor(category.category_color);
            }}
          >
            <i className="fas fa-eraser"></i>
            Modify
          </li>
          <li
            onClick={() => {
              setAlertDeleteCategorie(true);
              setUpdateId(category._id);
              setUpdateName(category.category_name);
            }}
          >
            <i className="fas fa-trash-alt"></i>
            Delete
          </li>
        </ul>
      </div>
      <p>{category.number_of_todo}</p>
      <p>{category.category_name}</p>
      <i className={`fa ${category.category_icon}`}></i>
    </div>
  );
};

export default Category;
