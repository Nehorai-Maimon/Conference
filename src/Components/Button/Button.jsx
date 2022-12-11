import "./Button.css";

export default function Button({
  text1,
  text2,
  happend1,
  happend2,
  styleButton,
  styleButtons,
  submit = true,
  disable = false,
}) {
  // console.log(styleButton);

  return (
    <>
      <div className={"contains-buttons"}>
        <div className={styleButtons}>
          <button
            type={submit ? "submit" : "button"}
            disabled={disable}
            className={`button ${styleButton}`}
            onClick={happend1}
          >
            {text1}
          </button>
          <button className={`button2 ${styleButton}-2`} onClick={happend2}>
            {text2}
          </button>
        </div>
      </div>
    </>
  );
}
