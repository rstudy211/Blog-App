import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Await, Link, useNavigate } from "react-router-dom";

import { login } from "../store/auth";
function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loggedin, setLoggedin] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const usernameOnChange = (event) => {
    setUsername(event.target.value);
  };

  const passwordOnChange = (event) => {
    setPassword(event.target.value);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      const data = {
        username: username,
        password: password,
      };
      

      const response = await axios({
        method: "POST",
        url: "http://localhost:9090/login",
        data: data,
      });

      if (response) {
        toast.success("Loggedin successfully");
      }
      const userResponse = await axios({
        method: "GET",
        url: "http://localhost:9090/user",
        headers: {
          Authorization: `Bearer ${response.data.token}`,
        },
      });
      // console.log(userResponse);
      const dataToSave = {
        token: response.data.token,
        userDetails: userResponse.data,
      };
      // console.log(dataToSave);
      // dataToSave
      dispatch(login(dataToSave));
      navigate("/userhome");
    } catch (error) {
      // console.log(error);
      toast.error("Something went wrong.");
    }
  };
  useEffect(() => {
    // setLoggedin(JSON.parse(sessionStorage.getItem("loggedIn")));
  }, []);

  return (
    <>
      <div className=" bg-white rounded shadow-lg p-8 w-[30%] ">
        <span className="block  text-2xl  font-bold mb-4">Login</span>
        <form onSubmit={onSubmit} className="mb-4">
          <div className="mb-4 ">
            <label htmlFor="username" className="block text-xs mb-1">
              Username or Email
            </label>
            <input
              onChange={usernameOnChange}
              className="w-full border border-blue-300 focus:outline-none focus:ring focus:ring-blue-300 rounded p-2 outline-none focus:shadow-outline"
              type="username"
              name="username"
              id="username"
              value={username}
              placeholder="Username or Email"
            />
          </div>
          <div className="mb-6 md:w-full">
            <label htmlFor="password" className="block text-xs mb-1">
              Password
            </label>
            <input
              onChange={passwordOnChange}
              className="w-full border border-blue-300 focus:outline-none focus:ring focus:ring-blue-300 rounded p-2 outline-none focus:shadow-outline"
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              value={password}
            />
          </div>
          <button
            type="submit"
            className="px-6 py-2 w-full transition-colors duration-300 rounded  text-white bg-[#00B0FF] hover:bg-blue-700"
          >
            SignIn
          </button>
        </form>
        <div className="text-gray-600 mt-6 text-center">
          Don’t have an account?
          <a
            className="no-underline border-b border-blue text-blue-700 ml-2"
            href="../register/"
          >
            SignUp
          </a>
          .
        </div>
      </div>
    </>
  );
}

export default LoginForm;
