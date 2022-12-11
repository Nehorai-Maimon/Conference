import * as Yup from "yup";

const phoneRegExp = /^\+?(972|0)(-)?0?(([23489]{1}\d{7})|[5]{1}\d{8})$/;
const passwordRegExp = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]/;

const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  password: "",
  confirmPassword: "",
};

const validationSchema = Yup.object({
  firstName: Yup.string()
    .min(2, "שם מלא חייב להכיל לפחות 2 תווים")
    .max(20, "שם מלא חייב להכיל עד 20 תווים")
    .required("שדה זה חובה"),
  lastName: Yup.string()
    .min(2, "שם משפחה חייב להכיל לפחות 3 תווים")
    .max(20, "שם משפחה חייב להכיל עד 20 תווים")
    .required("שדה זה חובה"),
  email: Yup.string().email("אמייל לא תקין").required("שדה זה חובה"),
  phone: Yup.string()
    .matches(phoneRegExp, "מספר טלפון לא תקין"),
  // .required("שדה זה חובה"),
  password: Yup.string()
    .matches(passwordRegExp, "סיסמה לא תקינה")
    .min(4, "הסיסמה חייבת להכיל לפחות 4 תווים")
    .max(8, "הסיסמה יכולה להכיל עד 8 תווים")
    .required("שדה זה חובה"),
  // confirmPassword: Yup.string()
  //   .oneOf([Yup.ref("password"), null], "סיסמאות אינן זהות")
  //   .required("שדה זה חובה"),
});

export { initialValues, validationSchema };
