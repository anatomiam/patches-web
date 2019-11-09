import React from "react";
import { SignUpFormWithRouter } from "../../Forms/General/SignUpForm";
import { LoginFormWithRouter } from "../../Forms/General/LoginForm";
import { LogoutButtonWithRouter } from "../../Forms/General/LogoutButton";

const Landing = () => {
  return (
    <>
      <SignUpFormWithRouter />;
      <LoginFormWithRouter />;
      <LogoutButtonWithRouter />;
    </>
  );
};

export default Landing;
