import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import parse from "html-react-parser";

function ReadBlog() {
  const { blogId } = useParams();
  const auth = useSelector((store) => store.auth);
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);
  const [blogDetails, setBlogDetails] = useState("");
  const fetchBlogDetails = async () => {
    const resp = await axios({
      method: "GET",
      url: `http://localhost:9090/blogs/${blogId}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    // console.log(resp);
    setBlogDetails(resp.data);
  };
  useEffect(() => {
    
      fetchBlogDetails();
    
  }, []);
  useEffect(() => {
    if (!auth && !auth.token) {
      navigate("/login");
    }
  },);

  return (
    <>
      <div className="px-24 py-5">
        <div className="shadow-xl w-full border-4 px-2  rounded">
          <div className="w-full bg-cyan-900 px-10 text-white flex justify-between items-end border-spacing-3 text-left border-b-4 py-3 border-cyan-500 ">
            <div className=" pt-6 text-5xl">
              {blogDetails.title &&
                blogDetails.title.charAt(0).toUpperCase() +
                  blogDetails.title.slice(1)}
            </div>
            <h1 className="text-xl tracking-wider">
              by{" "}
              {blogDetails.username &&
                blogDetails.username.charAt(0).toUpperCase() +
                  blogDetails.username.slice(1)}
            </h1>
          </div>
          <div id="tinymce" className="mce-content-body " data-id="tiny-react_263300431671783621110" aria-label="Rich Text Area. Press ALT-0 for help." contenteditable="true" spellcheck="false">
            {blogDetails.body && parse(blogDetails.body)}
            {/* //className="lg:text-xl text-justify leading-loose bg-white px-10 py-4"> */}
          </div>
        </div>
      </div>
    </>
  );
}

export default ReadBlog;
