import "./HeaderMobile.scss";

// ** Dependencies **
import { Link, useLocation } from "react-router-dom";

// ** Hooks **
import { useState } from "react";

const HeaderMobile = (props) => {
  const { pathname } = useLocation();

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
              <img
                src="https://journalducoin-com.exactdn.com/app/uploads/2021/10/singe-record.png?strip=all&lossy=1&quality=66&resize=631%2C631&ssl=1"
                alt="Profil of user"
              />
            </div>

            <div
              className="MobileHeader__nav__close"
              onClick={() => setOpenHeaderMobile(false)}
            >
              <i className="fas fa-angle-left"></i>
            </div>
          </div>

          <h2>?USER?</h2>

          <nav>
            <Link to={"/"}>
              <div
                className={
                  pathname === "/"
                    ? "Header__NavElement Header__NavElement--isActive"
                    : "Header__NavElement"
                }
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
              >
                <div>
                  <i className="fas fa-tasks"></i>
                </div>
                <p>Tasks</p>
              </div>
            </Link>

            <div
              className={
                pathname === "/statistics"
                  ? "Header__NavElement Header__NavElement--isActive"
                  : "Header__NavElement"
              }
            >
              <div>
                <i className="fas fa-chart-pie"></i>
              </div>
              <p>Statistics</p>
            </div>

            <Link to={"/settings"}>
              <div
                className={
                  pathname === "Settings"
                    ? "Header__NavElement Header__NavElement--isActive"
                    : "Header__NavElement"
                }
              >
                <div>
                  <i className="fas fa-cogs"></i>
                </div>
                <p>Settings</p>
              </div>
            </Link>
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
