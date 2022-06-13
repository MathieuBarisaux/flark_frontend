import "./IconPicker.scss";

// ** Hooks **
import { useState } from "react";

// ** Data **
import iconsList from "../../assets/data/icons.json";

const IconPicker = (props) => {
  const { inputIcon, setInputIcon } = props;

  const [iconSelector, setIconSelector] = useState(false);

  /********************* Functions ***********************/

  // Set icon for category

  const catchSearchIcon = (event) => {
    setIconSelector(false);
    const newValue = event.target.value;
    setInputIcon(newValue);
  };

  // Icon Picker function
  let iconToSelect = [];
  const searchIcon = () => {
    iconToSelect = [];

    if (inputIcon.length >= 2) {
      for (let i = 0; i < iconsList.length; i++) {
        if (
          iconsList[i].l.toLowerCase().indexOf(inputIcon.toLowerCase()) !== -1
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

  /********************* Component ***********************/

  return (
    <div className="IconPicker">
      <div className="IconPicker--input">
        <p>Add an icon :</p>

        <input
          type="text"
          placeholder="Search icon"
          name="CategoryIcon"
          autoComplete="off"
          onChange={catchSearchIcon}
        />

        <div>
          <i className={`fa ${inputIcon}`}></i>
        </div>
      </div>

      <div className="IconPicker--suggestion">
        {searchIcon().map((item, index) => {
          return (
            <div
              key={index}
              onClick={() => {
                setInputIcon(item.c);
                setIconSelector(true);
              }}
            >
              <i className={`fa ${item.c}`}></i>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default IconPicker;
