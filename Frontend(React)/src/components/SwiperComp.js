import React, { useState, useEffect } from "react";

import Blog from "./Blog";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import AddBlog from "./AddBlog";
import { toast } from "react-hot-toast";
import { fetchUserStats, logout } from "../store/auth";
import { useNavigate } from "react-router-dom";
import { Pagination } from "@mui/material";


function SwiperComp({isLoggedIn, userStats}) {
  const dispatch = useDispatch();
  const auth = useSelector((store) => store.auth);
  const navigate = useNavigate();
  const [publishedBlogs, setPublishedBlogs] = useState([]);
  const token = useSelector((state) => state.auth.token);
  const search = useSelector((state)=>state.auth.search);
  const [page,setPage]  = useState(1)
  
  const pageSize = 6;
  console.log(userStats.totalBlogs)
  const count = Math.ceil(userStats.totalBlogs / pageSize);
 

  
  const handleChange = (e, p) => {
    console.log(p)
    setPage(p);
    console.log(page)
    // jump(p);
  };
  const fetchBlogs = async () => {
    try{
    

  // console.log((!search ? `http://localhost:9090/publishedBlogs/` : `http://localhost:9090/publishedBlogs/${search}`)+`?pageNumber=${page-1}&pageSize=${pageSize}`)

        const response = await axios({
      method: "GET",
      url: (!search ? `http://localhost:9090/publishedBlogs/` : `http://localhost:9090/publishedBlogs/${search}`)+`?pageNumber=${page-1}&pageSize=${pageSize}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    // console.log("djkfjkj")
    // console.log(response.data)
    if (!response.data.length) console.log("no blogs found");

    setPublishedBlogs(response.data);

  }
  catch(e){
      if(e.response.status===401){
        toast.error("Session is Expired")
        dispatch(logout())
      }

  }};

  useEffect(() => {
    if (auth && auth.token) {
      navigate("/userHome");
      fetchBlogs();
    } else {
      navigate("/login");
    }
    
    fetchBlogs()   
    dispatch(fetchUserStats())
   
  }, [search, page]);
  useEffect(()=>{
    setPage(1)
  },[search])
  
  return (
    <>
      <div className="">
        {/* <AddBlog fetchBlogs={fetchBlogs}></AddBlog> */}
        <Pagination count={count} page={page} onChange = {handleChange} color="secondary" />
        <div className="grid  grid-row md:grid-row  sm:grid-row lg:grid-cols-2 gap-x-10 px-10">
        {publishedBlogs.length === 0 && (
            <div className="text-gray-700 text-3xl align-middle bg-slate-300 w-[]">
              {/* You hav't write any blog right now. */}
              No blog exists with this search.
            </div>
          )}
          {publishedBlogs &&
            publishedBlogs.map((blog) => {
              // console.log(i);
              return (
                <Blog blog={blog} key={blog.id} fetchBlogs={fetchBlogs}></Blog>
              );
            })}
        </div>
      </div>
    </>
  );
}

export default SwiperComp;
