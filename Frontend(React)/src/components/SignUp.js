import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../store/auth";
function SignUp() {
  const [userRegistration, setUserRegistration] = useState({
    username: "",
    password: "",
    email: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUserRegistration({ ...userRegistration, [name]: value });
  };
  const onSubmit = async (event) => {
    console.log("You are in submit");
    event.preventDefault();
    try {
      const data = userRegistration;
      console.log(data);
      const response = await axios({
        method: "POST",
        url: "http://localhost:9090/register",
        data: data,
      });
      console.log(response);
      if (response) {
        toast.success("Register successfully");
      }
      const userResponse = await axios({
        method: "GET",
        url: "http://localhost:9090/user",
        headers: {
          Authorization: `Bearer ${response.data.token}`,
        },
      });
      console.log(userResponse);
      const dataToSave = {
        token: response.data.token,
        userDetails: userResponse.data,
      };
      console.log(dataToSave);
      // dataToSave
      dispatch(login(dataToSave));

      // alert(response.data.message);
      navigate("/userhome");
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };
  return (
    <>
      <div className="bg-grey-lighter flex flex-col w-[30%] ">
        <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
          <form onSubmit={onSubmit} className="w-full">
            <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
              <h1 className="mb-8 text-3xl text-center">Sign up</h1>
              <input
                value={userRegistration.name}
                onChange={handleInput}
                type="text"
                className="block border border-grey-light w-full p-3 rounded mb-4"
                name="username"
                placeholder="Full Name"
              />

              <input
                value={userRegistration.email}
                onChange={handleInput}
                type="text"
                className="block border border-grey-light w-full p-3 rounded mb-4"
                name="email"
                placeholder="Email"
              />

              <input
                value={userRegistration.password}
                onChange={handleInput}
                type="password"
                className="block border border-grey-light w-full p-3 rounded mb-4"
                name="password"
                placeholder="Password"
              />
              <input
                value={userRegistration.password}
                onChange={handleInput}
                type="password"
                className="block border border-grey-light w-full p-3 rounded mb-4"
                name="confirm_password"
                placeholder="Confirm Password"
              />

              <button
                type="submit"
                className="w-full text-center py-3 rounded bg-[#00B0FF] text-white hover:bg-blue-700 focus:outline-none my-1"
              >
                Create Account
              </button>
              <div className="text-gray-600 mt-6 text-center">
                Already have an account?
                <a
                  className="no-underline border-b border-blue text-blue-700 ml-2"
                  href="../login/"
                >
                  Log in
                </a>
                .
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default SignUp;
