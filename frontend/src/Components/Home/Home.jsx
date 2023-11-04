import React, { useEffect } from "react";
import User from "../User/User";
import "./Home.css";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers, getFollowingPosts } from "../../Actions/User";
import Loader from "../Loader/Loader";
import { Typography } from "@mui/material";
import { useAlert } from "react-alert";

const Home = () => {
  const dispatch = useDispatch();
  const alert = useAlert();


  const { users, loading: usersLoading } = useSelector(
    (state) => state.allUsers
  );

  useEffect(() => {
    dispatch(getFollowingPosts());
    dispatch(getAllUsers());
  }, [dispatch]);

  // useEffect(() => {

  //   if (message) {
  //     alert.success(message);
  //     dispatch({ type: "clearMessage" });
  //   }
  // }, [alert,  dispatch]);

  return  usersLoading === true ? (
    <Loader />
  ) : (
    <div className="home">
      <div className="homeleft">
        Login Page
      </div>
      <div className="homeright">
        {users && users.length > 0 ? (
          users.map((user) => (
            <User
              key={user._id}
              userId={user._id}
              name={user.name}
              avatar={user.avatar.url}
            />
          ))
        ) : (
          <Typography>No Users Yet</Typography>
        )}
      </div>
    </div>
  );
};

export default Home;
