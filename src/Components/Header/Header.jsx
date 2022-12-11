import "./Header.css";
const logoBackground = require("../../Assets/Images/background-image-new.png");

const Header = (props) => {
  return (
    <>
      <div className="container-header-details">
        <img
          src={logoBackground}
          alt="logo-back"
          className="logo-background-header"
        />
        <div className="container-header-details-2">{props.children}</div>
      </div>
    </>
  );
};

export default Header;
