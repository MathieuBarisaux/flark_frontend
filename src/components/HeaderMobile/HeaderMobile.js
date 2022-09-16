import "./HeaderMobile.scss";

// ** Dependencies **
import { Link, useLocation } from "react-router-dom";

// ** Hooks **
import { useState } from "react";

// ** Redux **
import { useSelector } from "react-redux";

const HeaderMobile = ({ setHelpCenterOpen }) => {
  const { pathname } = useLocation();

  const { userInformations } = useSelector((state) => ({
    ...state.userInformationsReducer,
  }));

  const [openHeaderMobile, setOpenHeaderMobile] = useState(false);

  return (
    <div className="MobileHeader">
      <div className="MobileHeader__icons">
        <i
          className="fas fa-bars"
          onClick={() => setOpenHeaderMobile(true)}
        ></i>
      </div>

      {openHeaderMobile && (
        <div className="MobileHeader__nav">
          <div className="MobileHeader__nav__top">
            <div className="MobileHeader__nav__picture">
              {userInformations && userInformations.avatar ? (
                <img src={userInformations.avatar} alt="User avatar" />
              ) : (
                <img
                  src={
                    "https://res.cloudinary.com/vintedcopy/image/upload/v1655988565/Flark/blank-profile-picture-973460_640_taatmn.png"
                  }
                  alt="User avatar"
                />
              )}
            </div>

            <div
              className="MobileHeader__nav__close"
              onClick={() => setOpenHeaderMobile(false)}
            >
              <i className="fas fa-angle-left"></i>
            </div>
          </div>

          <nav>
            <Link to={"/"}>
              <div
                className={
                  pathname === "/"
                    ? "Header__NavElement Header__NavElement--isActive"
                    : "Header__NavElement"
                }
                onClick={() => setOpenHeaderMobile(false)}
              >
                <div>
                  <i className="fas fa-home"></i>
                </div>
                <p>Dashboard</p>
              </div>
            </Link>

            <Link to={"/allTasks"}>
              <div
                className={
                  pathname === "/allTasks"
                    ? "Header__NavElement Header__NavElement--isActive"
                    : "Header__NavElement"
                }
                onClick={() => setOpenHeaderMobile(false)}
              >
                <div>
                  <i className="fas fa-tasks"></i>
                </div>
                <p>Tasks</p>
              </div>
            </Link>

            <Link to="/statistics">
              <div
                className={
                  pathname === "/statistics"
                    ? "Header__NavElement Header__NavElement--isActive"
                    : "Header__NavElement"
                }
                onClick={() => setOpenHeaderMobile(false)}
              >
                <div>
                  <i className="fas fa-chart-pie"></i>
                </div>
                <p>Statistics</p>
              </div>
            </Link>

            <Link to={"/settings"}>
              <div
                className={
                  pathname === "/settings"
                    ? "Header__NavElement Header__NavElement--isActive"
                    : "Header__NavElement"
                }
                onClick={() => setOpenHeaderMobile(false)}
              >
                <div>
                  <i className="fas fa-cogs"></i>
                </div>
                <p>Settings</p>
              </div>
            </Link>

            <div
              className="Header__NavElement Header__NavElement--help"
              onClick={() => {
                setOpenHeaderMobile(false);
                setHelpCenterOpen(true);
              }}
            >
              <div>
                <i className="far fa-question-circle"></i>
              </div>
              <p>Help center</p>
            </div>
          </nav>

          <div className="Header__logo">
            <i className="fas fa-pen-nib"></i>
            <p>Flark</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default HeaderMobile;
