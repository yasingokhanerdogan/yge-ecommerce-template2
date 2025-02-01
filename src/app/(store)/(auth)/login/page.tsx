import { Metadata } from "next";
import LogInForm from "./loginForm";

export const metadata: Metadata = {
  title: "Log In",
  description: "Log in to your account",
};

const LogInPage = () => {
  return <LogInForm />;
};

export default LogInPage;
