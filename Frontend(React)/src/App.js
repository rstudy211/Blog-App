import logo from "./logo.svg";
import "./App.css";
import { Route, Routes, useNavigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import UserHome from "./components/UserHome";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { isLoggedIn } from "./store/auth";
import Form from "./components/Form";
import AddBlog from "./components/AddBlog";
import MyBlogs from "./components/MyBlogs";
import ReadBlog from "./components/ReadBlog";
import EditBlog from "./components/EditBlog";
function App() {
  const dispatch = useDispatch();
  const auth = useSelector((store) => store.auth);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(isLoggedIn());
  }, []);
 
  return (
    <div className=" min-w-screen">
      <Toaster />
      <Navbar />
      <Routes>
        <Route path="/"  element={<Home />} />
        <Route element={<Form />} path="/login" />
        <Route element={<Form />} path="/register" />
        <Route element={<UserHome />} path="/userhome" />

        <Route element={<AddBlog />} path="/addBlog" />
        <Route element={<MyBlogs />} path="/myBlogs" />
        <Route element={<ReadBlog />} path="/readBlog/:blogId" />
        <Route element={<EditBlog />} path="/editBlog/:blogId" />
      </Routes>
      {/* <div className="fixed w-screen bottom-0 -z-10">
        <div><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path
            fill="#0099ff"
            fillOpacity="1"
            d="M0,256L48,261.3C96,267,192,277,288,277.3C384,277,480,267,576,245.3C672,224,768,192,864,165.3C960,139,1056,117,1152,112C1248,107,1344,117,1392,122.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg></div>
      </div> */}
    </div>
  );
}

export default App;
