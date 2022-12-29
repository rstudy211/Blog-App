import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import parse from "html-react-parser";
function Blog({ blog, fetchBlogs }) {
  const [edit, setEdit] = useState(false);
  const location = useLocation();
  const auth = useSelector((store) => store.auth);
  const navigate = useNavigate();
  const blogId = blog.id;
  const token = useSelector((state) => state.auth.token);
  //   console.log(blogId);
  const onPublish = async () => {
    // event.preventDefault();
    // console.log("hello");
    await axios({
      method: "POST",
      url: `http://localhost:9090/publish/blog/${blogId}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    // onSubmit();
    fetchBlogs();
  };

  // fetchBlogs();
  // console.log(resp);

  const deletefunc = async () => {
    const resp = await axios({
      method: "DELETE",
      url: `http://localhost:9090/deleteBlog/${blogId}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    fetchBlogs();
    // console.log(resp);
  };
  useEffect(() => {
    if (auth && auth.token) {
      // navigate("/userHome");
    
    if (location.pathname == "/myBlogs") {
      // console.log("Edit Enable");
      setEdit(true);
    }
  } else {
    navigate("/login");
  }

  }, []);

  return (
    <>
      {/* <legend>
        {blog.username} */}

      <div className=" my-3 hover:scale-[110%] transform transition ease-in-out delay-150 py-2 px-6 border-l-8 border-[#00B0FF]  break-words bg-white rounded-md text-gray-700 shadow-md flex flex-col justify-center items-center ">
        <div className="w-full flex gap-2 justify-between items-center border-spacing-3 text-left border-b-2 py-3 border-[indigo-500]">
          <h2 className="text-2xl w-[60%] font-sans font-semibold text-gray-700">
            {blog.title.charAt(0).toUpperCase() + blog.title.slice(1)}
          </h2>

          {edit && (
            <>
              <Link to={`/editBlog/${blogId}`}>
                <button className="material-symbols-outlined  border hover:shadow-[#34d399] hover:border-none text-[#34d399] text-md rounded-full hover:shadow-md p-1 hover:border-2 border-[#dcfce7]">
                  edit
                </button>
              </Link>
              <button
                onClick={deletefunc}
                className="material-symbols-outlined  hover:border-2 border-0 text-red-400 text-md rounded-full hover:shadow-sm p-1  "
              >
                delete
              </button>
            </>
          )}
          <h1 className="text-3xl font-bold ">:</h1>
        </div>

        <p
          className="py-5 text-lg  w-full font-sans flex justify-start item-left"
          // value={parse(blog.body)}
        >
          <span>{parse(blog.body.substr(0, 30) + "...")}</span>
          {/* Photo booth fam kinfolk cold-pressed sriracha leggings jianbing
          microdosing tousled waistcoat. */}
        </p>
        <div className="flex justify-between w-full">
          <span className="inline-block py-1 px-2 rounded bg-blue-50 text-blue-500 text-xs font-medium tracking-widest">
            {"by " +
              blog.username.charAt(0).toUpperCase() +
              blog.username.slice(1)}
          </span>
          {edit && (
            <>
              {!blog.published && (
                <button
                  onClick={onPublish}
                  className="inline-block py-1 px-2 rounded bg-[#dcfce7] text-[#42ad86f4] text-xs font-medium hover:bg-[#34d399] hover:text-white tracking-widest"
                >
                  Publish
                </button>
              )}
              {blog.published && (
                <span className="inline-block py-1 px-2 rounded bg-gray-200 text-gray-500 text-xs font-medium   tracking-widest">
                  Published
                </span>
              )}
            </>
          )}
          <Link to={`/readBlog/${blogId}`}>
            <button className="text-[#00B0FF] ">Read More</button>
          </Link>
        </div>
      </div>

      {/* </legend> */}
    </>
  );
}

export default Blog;
