import "./HelpCenter.scss";

// ** Data **
import helpContent from "../../assets/data/helpContent";

// ** Hooks **
import { useState } from "react";

// ** Components **
import ContactUs from "../ContactUs/ContactUs";
import CloseModale from "../CloseModale/CloseModale";

const HelpCenter = ({ setHelpCenterOpen }) => {
  const [navHelp, setNavHelp] = useState(-1);

  return (
    <div className="HelpCenter">
      <div className="HelpCenter__container">
        <CloseModale setValue={setHelpCenterOpen} />

        <h2>{navHelp === -2 ? "Contact-us" : "Help Center"}</h2>

        {navHelp === -1 ? (
          <div className="HelpCenter__select">
            <h4>
              You need our help ? Select what do you need and we will help you
              😉
            </h4>

            <p onClick={() => setNavHelp(0)}>
              Tutorials <i className="fas fa-angle-right"></i>
            </p>
            <p onClick={() => setNavHelp(-2)}>
              Contact-us <i className="fas fa-angle-right"></i>
            </p>
          </div>
        ) : navHelp === -2 ? (
          <ContactUs />
        ) : (
          <>
            {helpContent.map((item, index) => {
              if (index === navHelp) {
                return (
                  <div className="HelpCenter__tips" key={index}>
                    <div className="HelpCenter__tips__content">
                      <i
                        className="fas fa-angle-left"
                        onClick={() => setNavHelp(navHelp - 1)}
                      ></i>

                      <video loop={true} autoPlay={true}>
                        <source src={item.video} />
                      </video>

                      {navHelp < helpContent.length - 1 ? (
                        <i
                          className="fas fa-angle-right"
                          onClick={() => setNavHelp(navHelp + 1)}
                        ></i>
                      ) : (
                        <div className="HelpCenter__empty"></div>
                      )}
                    </div>

                    <h3>{item.title}</h3>

                    <div className="HelpCenter__rounds">
                      {helpContent.map((item, index) => {
                        if (index === navHelp) {
                          return (
                            <div
                              key={index}
                              className="HelpCenter__round HelpCenter__round--bold"
                            ></div>
                          );
                        } else {
                          return (
                            <div
                              key={index}
                              className="HelpCenter__round"
                            ></div>
                          );
                        }
                      })}
                    </div>
                  </div>
                );
              } else {
                return null;
              }
            })}
          </>
        )}
      </div>
    </div>
  );
};

export default HelpCenter;
