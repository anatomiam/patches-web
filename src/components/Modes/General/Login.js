import React from "react";
import { SignUpFormWithRouter } from "../../Forms/General/SignUpForm";
import { LoginFormWithRouter } from "../../Forms/General/LoginForm";

const Landing = () => {
  return (
    <>
      <SignUpFormWithRouter />;
      <LoginFormWithRouter />;
    </>
  );
};

export default Landing;
