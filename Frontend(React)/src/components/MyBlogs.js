import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Blog from "./Blog";
import yourBlog from "../Images/yourblog2.svg";
import { useNavigate } from "react-router-dom";
import { createTheme, Pagination } from "@mui/material";
import { fetchUserStats } from "../store/auth";


function MyBlogs() {
  const color = "#00b0ff"
  const [userAllBlogs, setUserAllBlogs] = useState("");
  const userId = useSelector((state) => state.auth.user.id);
  const token = useSelector((state) => state.auth.token);
  const search = useSelector((state)=> state.auth.search);
  const userStats = useSelector(state => state.auth.userStats);
  console.log(userStats);
  const auth = useSelector((store) => store.auth);
  const navigate = useNavigate();
  const dispatch= useDispatch();
  const [page,setPage]  = useState(1)
  const pageSize = 6;
  // console.log(userStats.userPublishedBlogs+ userStats.userUnpublishedBlogs)
  const count = Math.ceil((userStats.userPublishedBlogs+ userStats.userUnpublishedBlogs) / pageSize);
// console.log(userStats.userPublishedBlogs)
  const handleChange=(e,p)=>{
    setPage(p);
  }
  const theme = createTheme({
    palette: {
      
      secondary: {
        main: '#00b0ff',
      },
    },
  });
  
  
  const fetchUserBlogs = async () => {
    
    const resp = await axios({
      method: "GET",
      url: `http://localhost:9090/user/blogs/${userId}/`+search+`?pageNumber=${page-1}&pageSize=${pageSize}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    // console.log(resp);
    setUserAllBlogs(resp.data);

    if (!resp.data.length) setPage(1);

  };
  useEffect(() => {
    if (!auth && !auth.token) {
      navigate("/login");
    }
  },);

  useEffect(()=>{
    fetchUserBlogs()
    dispatch(fetchUserStats())
  },[search,page])

  return (
    <>
      <div className="py-4 flex flex-col justify-center items-center px-2">
        <Pagination theme={theme} count={count} page={page} onChange = {handleChange} color="secondary"  />
        <div className="flex sm:justify-center md:justify-center lg:justify-between w-full items-start  ">
          {/* <AddBlog fetchBlogs={fetchBlogs}></AddBlog> */}
          {userAllBlogs.length === 0 && (
            <div className="text-gray-700 text-3xl align-middle bg-slate-300 w-[]">
              {/* You hav't write any blog right now. */}
              You need to post some blogs right now.
            </div>
          )}
          <div className="w-full sm:w-full md:w-full   lg:w-[80%] grid md:grid-cols-2  sm:grid-cols-1 lg:grid-cols-2 gap-x-10 px-8">
            {userAllBlogs.length !== 0 &&
              userAllBlogs.map((blog) => {
                // console.log(i);
                return (
                  <Blog
                    blog={blog}
                    key={blog.id}
                    fetchBlogs={fetchUserBlogs}
                  ></Blog>
                );
              })}
          </div>
          <div className="w-[20%] text-left hidden lg:block sm:hidden md:hidden w-[30%] pt-32 top-0 self-start sticky">
            <h1 className="text-4xl w-full py-10  ">Your Blogs</h1>
            <img src={yourBlog}></img>
          </div>
        </div>
      </div>
    </>
  );
}

export default MyBlogs;
