import { Metadata } from "next";
import RegisterForm from "./registerForm";

export const metadata: Metadata = {
  title: "Register",
  description: "Register to access the platform",
};

const RegisterPage = () => {
  return <RegisterForm />;
};

export default RegisterPage;
