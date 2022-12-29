import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import LoginForm from "./LoginForm";
import SignUp from "./SignUp";
import loginImg from "../Images/undraw_access_account_re_8spm.svg";
function Form() {
  const location = useLocation();

  return (
    <>
      <div className="flex justify-around mt-10 px-20  ">
        <div className=" ">
          <img className="h-[500px] " src={loginImg} />
        </div>

        {location.pathname === "/login" && <LoginForm />}
        {location.pathname === "/register" && <SignUp />}
      </div>
    </>
  );
}

export default Form;
