import { object, string, ref } from "yup";

export const signupSchema = object().shape({
  email: string().required("Re requiere E-mail").email("Email no valido"),
  password: string()
    .required("Se requiere Password")
    .min(6, "El Password debe contener al menos 6 caracteres"),
  confirmPassword: string()
    .oneOf([ref("password"), null], "Passwords  no coinciden")
    .required(),
});
