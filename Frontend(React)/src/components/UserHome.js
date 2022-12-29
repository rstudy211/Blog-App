import axios from "axios";
import React, { useEffect, useState } from "react";
import DonutChart from "react-donut-chart";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { fetchUserStats } from "../store/auth";
import { useDispatch, useSelector } from "react-redux";

import Blog from "./Blog";
// import Swiper from "swiper";
import SwiperComp from "./SwiperComp";
import UserStats from "./UserStats";

function UserHome() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const userDetails = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);
  const auth = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const userStats = useSelector(state => state.auth.userStats);
  const navigate = useNavigate();

  useEffect( () => {
    setIsLoggedIn(true)
  },[])
  
  useEffect(() => {
    if (auth && auth.token) {
      dispatch(fetchUserStats());
      navigate("/userHome");
    } else {
      navigate("/login");
    }
  }, []);
  return (
    <>
      {userDetails && (
        <div className="text-4xl w-full text-center text-gray-400 font-extrabold  py-2">
          Welcome {userDetails.username}
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className=" text-3xl col-span-1 text-center">
          Your Contribution
        </div>
        <div className="col-span-2">

        <SwiperComp isLoggedIn={isLoggedIn} userStats={userStats}></SwiperComp>
        </div>
      </div>
      
      {/* <UserStats></UserStats> */}
    </>
  );
}

export default UserHome;
