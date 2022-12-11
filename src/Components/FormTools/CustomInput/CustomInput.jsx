import { useField } from "formik";
import { observer } from "mobx-react";
import { useState } from "react";
import "./CustomInput.css";

function CustomInput({ ...props }) {
  const [field, meta] = useField(props);
  const [isActive, setIsActive] = useState(false);

  const handelClick = (event) => {
    setIsActive((current) => !current);
  };
// console.log("meta", meta);
  return (
    <>
      <input
        className={
          !isActive ? "bt-register-input-css" : "bt-register-input-css active"
        }
        {...field}
        {...props}
        onClick={handelClick}
      />
      {meta.touched && meta.error ? (
        <div className="error-dev-formik">{meta.error}</div>
      ) : null}
    </>
  );
}

export default observer(CustomInput);
