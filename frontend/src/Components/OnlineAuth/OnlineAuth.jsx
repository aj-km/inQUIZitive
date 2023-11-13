import React from 'react';
import { GoogleLogin } from 'react-google-login';
import { Navigate } from 'react-router-dom';
import './OnlineAuth.css';

const OnlineAuth = ({ onSuccess, onFailure }) => {
  const clientId = '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';

  const responseGoogle = (response) => {
    if (response.profileObj) {
      onSuccess(response.profileObj);
      // Redirect to the home page upon successful sign-in
      return <Navigate to="/home" />;
    } else {
      onFailure();
      // Redirect to the login page on failure
      return <Navigate to="/login" />;
    }
  };

  return (
    <div className="google-sign-in-container">
      <GoogleLogin
        clientId={clientId}
        buttonText="Sign in with Google"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={'single_host_origin'}
        className="google-sign-in-button"
      />
    </div>
  );
};

export default OnlineAuth;

