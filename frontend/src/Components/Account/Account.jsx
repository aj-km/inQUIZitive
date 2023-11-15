import { Avatar, Button, Dialog, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deleteMyProfile, logoutUser } from "../../Actions/User";
import Loader from "../Loader/Loader";
import User from "../User/User";
import "./Account.css";

const Account = () => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { user, loading: userLoading } = useSelector((state) => state.user);
  const logoutHandler = () => {
    dispatch(logoutUser());
    alert.success("Logged out successfully");
  };

  const deleteProfileHandler = async () => {
    await dispatch(deleteMyProfile());
    dispatch(logoutUser());
  };

  return userLoading === true ? (
    <Loader />
  ) : (
    <div className="account">
    <div className="accountleft">
      <Typography variant="h6">Welcome {user.name}</Typography>
      <Typography variant="h4" style={{ marginBottom: "20px" }}>
        Welcome to Your Quiz Dashboard!
      </Typography>
      <Typography variant="body1">
        Start creating engaging quizzes, track your participants' progress, and
        explore insightful analytics. Your journey to interactive learning
        begins here.
      </Typography>

      {/* Display additional user information */}
      <Typography variant="body1">Email: {user.email}</Typography>
      <Typography variant="body1">Admin: {user.isAdmin ? 'Yes' : 'No'}</Typography>
    </div>
      <div className="accountright">
        <Avatar
          src={user.avatar.url}
          sx={{ height: "8vmax", width: "8vmax" }}
        />

        <Typography variant="h5">{user.name}</Typography>

        <Button variant="contained" onClick={logoutHandler}>
          Logout
        </Button>

        <Link to="/update/profile">Edit Profile</Link>
        <Link to="/update/password">Change Password</Link>

        <Button
          variant="text"
          style={{ color: "red", margin: "2vmax" }}
          onClick={deleteProfileHandler}
        >
          Delete My Profile
        </Button>

      </div>
    </div>
  );
};

export default Account;
