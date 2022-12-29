import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, Navigate, useNavigate } from "react-router-dom";
import homepageimg from "../Images/undraw_blog_post_re_fy5x.svg";
function Home() {
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);
  useEffect(() => {
    if (token) {
      navigate("/userHome");
    }
  }, []);

  return (
    <>
      <div className="">
        <div className="antialiased  text-gray-900  font-sans flex justify-center pt-28 ">
          <div className=" w-[40%]  border-blue-400 border-b-4">
            <img src={homepageimg} className="h-96 ml-10 " alt="Phone image" />
          </div>
          <div className="w-[50%] ml-20 flex flex-col justify-between">
            <p className="text-7xl">
              Publish your passions, your way
              <br></br>
              <span className="py-3 text-5xl text-gray-600">
                Create a unique and beautiful blog easily.
              </span>
            </p>
            <div className="flex gap-5 ">
              <Link to="/login">
                <button className="px-6 font-semibold py-3 transition-colors duration-300 rounded   text-[#00B0FF] border-2 border-[#00B0FF] text-xl hover:text-white hover:bg-[#00B0FF] hover:shadow-[#00B0FF]">
                  Login
                </button>
              </Link>
              <Link to="/register">
                <button className="px-6 font-semibold py-3 transition-colors duration-300 rounded   text-[#00B0FF] border-2 border-[#00B0FF] text-xl hover:text-white hover:bg-[#00B0FF] hover:shadow-[#00B0FF]">
                  SignUp
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
