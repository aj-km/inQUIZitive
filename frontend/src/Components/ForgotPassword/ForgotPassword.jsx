import { Button, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { forgotPassword } from "../../Actions/User";
import "./ForgotPassword.css";
const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const dispatch = useDispatch();
  const alert = useAlert();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(forgotPassword(email));
  };

  return (
    <div className="forgotPassword">
      <form className="forgotPasswordForm" onSubmit={submitHandler}>
        <Typography variant="h3" style={{ padding: "2vmax" }}>
          inQUIZitive
        </Typography>

        <input
          type="email"
          placeholder="Email"
          required
          className="forgotPasswordInputs"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Button type="submit">
          Send Token
        </Button>
      </form>
    </div>
  );
};

export default ForgotPassword;
