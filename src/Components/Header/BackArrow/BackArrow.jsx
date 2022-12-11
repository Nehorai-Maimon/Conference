import "./BackArrow.css";
const rightArrow = require("../../../Assets/Images/right_arrow.png");

const BackArrow = ({ text, onClick }) => {
  return (
    <header>
      <div className="contain-back-arrow">
        <span className="back-arrow-text">{text}</span>
        <img
          className="backArrow-button"
          src={rightArrow}
          alt="back-arrow"
          onClick={onClick}
        />
      </div>
    </header>
  );
};

export default BackArrow;
