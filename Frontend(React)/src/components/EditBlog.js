import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import parse from "html-react-parser";
import { Editor } from "@tinymce/tinymce-react";
function EditBlog() {
  const navigate = useNavigate();
  const auth = useSelector((store) => store.auth);
  
  const { blogId } = useParams();
  const userId = useSelector((state) => state.auth.user.id);
  const token = useSelector((state) => state.auth.token);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [published, setPublished] = useState(false);

  const blogDetails = async () => {
    const response = await axios({
      method: "GET",
      url: `http://localhost:9090/blogs/${blogId}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    // console.log(response.data);
    setTitle(response.data.title);
    setBody(response.data.body);
    // setPublished(response.data.published);
  };

  //   console.log(userId && userId);
  const titleOnChange = (event) => {
    setTitle(event.target.value);
  };

  const onBodyChange = (event) => {
    setBody(event.target.value);
  };
  const handleChange = (content, editor) => {
    setBody(content);
  };
  const onPublish = (event) => {
    // event.preventDefault();
    setPublished(true);
    // onSubmit();
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      const data = {
        id: blogId,
        title: title,
        body: body,
        user: {
          id: userId,
        },
        published: published,
      };
      // console.log(data);

      const resp = await axios({
        method: "PUT",
        url: "http://localhost:9090/updateBlog",
        data: data,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // fetchBlogs();

      // console.log(resp);
      if (resp) {
        toast.success("Blog Updated Successfully");
      }
      navigate("/myBlogs");
    } catch {
      toast.error("Something went wrong.");
    }
  };
  useEffect(() => {
    
      blogDetails();
    
    
  }, []);
  useEffect(() => {
    if (!auth && !auth.token) {
      navigate("/login");
    }
  },);
  return (
    <>
      <form className="p-10 flex" onSubmit={onSubmit}>
        {/* <div className="text-8xl bg-gradient-to-r from-cyan-500 to-blue-500  w-[30%] flex justify-center rounded items-center text-center p-5 text-white">
          <span>Create Your Blog Here...</span>
        </div> */}
        <div className="py-2 w-full border-l-8 border-blue-600 bg-white rounded-md text-gray-700 shadow-xl flex flex-col justify-between items-center px-4 ">
          <div className=" w-full flex justify-between items-center border-spacing-3 text-left border-b-2 py-3 border-cyan-500">
            {/* <h2 className="text-4xl text-black">Nature</h2>  */}
            <input
              required
              onChange={titleOnChange}
              className="focus:outline-none text-6xl pl-5 text-cyan-900"
              type="text"
              name="title"
              value={title}
              placeholder="Title Goes Here..."
            />
            <div className="pr-5">
              <button
                onClick={onPublish}
                type="submit"
                className="inline-block py-1 px-2 rounded bg-[#dcfce7] hover:text-white hover:bg-[#34d399] text-[#34d399] text-3xl font-medium tracking-widest"
              >
                Publish
              </button>
              {/* <button
            onClick={onPublish}
            type="submit"
            className="inline-block py-1 px-2 rounded bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-3xl hover:shadow-md hover:border-2 font-medium tracking-widest"
          >
            Publish
          </button> */}
            </div>
          </div>
          {/* <textarea
            required
            onChange={onBodyChange}
            name="body"
            value={body}
            rows={body ? 13 : 0}
            className="py-5 pl-5 text-2xl w-full focus:outline-none"
            placeholder="Write your thoughts here..."
          ></textarea> */}
          <div className="w-full">
            <Editor
              apiKey="0eraa1vair026m12xkor69e5yp43p0z6t83t28nq9faprzdv"
              init={{
                height: 400,
                menubar: false,
                plugins: [
                  "advlist autolink lists link image",
                  "charmap print preview anchor help",
                  "searchreplace visualblocks code",
                  "insertdatetime media table paste wordcount",
                ],
                toolbar:
                  // prettier-ignore
                  "undo redo | formatselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | help",
              }}
              value={body}
              textareaName="content"
              onEditorChange={(content, editor) => {
                handleChange(content, editor);
              }}
            ></Editor>
          </div>
          {body && (
            // <Link to="/myBlogs">
            <button
              type="submit"
              className="px-6 py-2 text-2xl transition-colors duration-300 rounded  text-white bg-[#00B0FF] hover:bg-blue-700"
            >
              Update
            </button>
          )}
        </div>
      </form>
    </>
  );
}

export default EditBlog;
