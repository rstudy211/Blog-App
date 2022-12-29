import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../store/auth";
import logo from "../Images/Blog App.png";
import { searchFunc } from "../store/auth";
function Navbar() {
  const [loggedin, setLoggedin] = useState(false);
  const [toogle, setToogle] = useState(false);

  const menuc = document.getElementById("menuContent");
  const [searchIn,setSearchIn] = useState("")

  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  const onLogout = () => {
    setLoggedin(false);
    dispatch(logout());
  };
  const menuHandle = (e) => {
    // console.log("open");

    setToogle(!toogle);
  };
  const onSearch=(e)=>{
    
    setSearchIn(e.target.value);
    
    
  }
  const clickSearch = ()=>{
    const searchString = {
      search:searchIn
    }
    dispatch(searchFunc(searchString))
  }
  

  useEffect(() => {
    if (auth && auth.token) {
      setLoggedin(true);
    }
  }, [auth, setLoggedin]);
  // useEffect(() => {
  // setLoggedin(JSON.parse(sessionStorage.getItem("loggedIn")));
  // window.addEventListener("storage", (e) => {
  //   console.log(e);
  //   setLoggedin(JSON.parse(sessionStorage.getItem("loggedIn")));
  //   console.log(loggedin);
  // });
  // console.log("here");
  // }, [loggedin]);
  return (
    <>
      <nav className="z-20 w-full flex bg-[#00B0FF] text-white justify-between md:flex md:justify-between sm:justify-between sm:flex  items-center py-5  lg:flex-row px-6 shadow-md sticky top-0 w-full flex-wrap">
        <Link to="/">
          <button>
            <h1 className="text-4xl font-extrabold"> Blog</h1>
            {/* <img className="h-[50px]" src={logo}></img> */}
          </button>
        </Link>
        {loggedin && (
          <div className="items-center text-gray-700 flex justify-center bg-[#00B0FF] order-1 sm:order-none mt-4 sm:mt-0 w-full sm:w-auto">
            <div className="flex items-center px-4  justify-between rounded-full border-b-4 border-gray-700 bg-white py-2 w-full">
              <input
              onChange={onSearch} value={searchIn}
                className=" px-2 focus:outline-none placeholder:text-gray-700"
                placeholder="Search..."
              />
              <span onClick={clickSearch} className="material-symbols-outlined cursor-pointer " type="submit">
                
                search
              </span>
            </div>
          </div>
        )}
        <span
          onClick={menuHandle}
          id="menu"
          className="material-symbols-outlined lg:hidden cursor-pointer text-white text-4xl "
        >
          {toogle ? "close" : "menu"}
        </span>

        {/* {toogle && (
          <span
            onClick={menuClose}
            id="close"
            className="material-symbols-outlined lg:hidden text-white  cursor-pointer text-4xl fixed top-5 right-10"
          >
            close
          </span>
        )} */}
        {!loggedin && (
          <div className="flex gap-5">
            <Link to="/login">
              <button className="px-6 py-1 transition-colors duration-300 rounded  border-2 border-cyan-100 text-lg hover:text-cyan-500 hover:bg-white hover:shadow-cyan-400">
                Login
              </button>
            </Link>

            <Link to="/register">
              <button className="px-6 py-1 transition-colors duration-300 rounded  border-2 border-cyan-100 text-lg hover:text-cyan-500 hover:bg-white hover:shadow-cyan-400">
                SignUp
              </button>
            </Link>
          </div>
        )}

        {loggedin && (
          <div
            className={`flex w-full sm:items-center sm:w-full sm:py-2 sm:flex-col sm:justify-center md:items-center md:w-full max-w-full md:pt-4 md:flex-col md:justify-center transition-all duration-500 ease-in-out bg-[#00B0FF] lg:w-auto gap-5 lg:pt-0  lg:flex-row ${
              toogle
                ? "flex flex-col justify-center items-center py-3 lg:top-0 lg:relative top-32 opacity-100 md:absolute sm:absolute absolute sm:top-20 md:opacity-100 md:top-20 sm:opacity-100 left-0"
                : "hidden lg:flex"
            } md:opacity-100
            `}
            id="menuContent"
          >
            <Link to="/myBlogs">
              <button className="px-2 mx-8 py-1 duration-300 border-b-2 border-cyan-100 text-lg hover:scale-110 transition-transform">
                My Blogs
              </button>
            </Link>

            <Link to="/addBlog">
              <button className=" px-6 py-1 font-extrabold transition-colors duration-300 rounded bg-white text-[#00b0ff]  border-2 text-lg hover:text-white hover:bg-transparent hover:shadow-cyan-400">
                Create Blog
              </button>
            </Link>

            <Link to="/">
              <button
                onClick={onLogout}
                className="px-6 py-1  transition-colors duration-300 rounded  border-2 border-cyan-100 text-lg hover:text-cyan-500 hover:bg-white hover:shadow-cyan-400"
              >
                Logout
              </button>
            </Link>
          </div>
        )}
      </nav>
    </>
  );
}

export default Navbar;
