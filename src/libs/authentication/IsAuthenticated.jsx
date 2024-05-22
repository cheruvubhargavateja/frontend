import React from "react";
import { Navigate } from "react-router-dom";

const isAuthenticated =  (WrappedComponent) => {
  return () => {
    const isAuth = true;

    return isAuth ? (
      <WrappedComponent role={'Admin'}/>
    ) : (
        <Navigate to={'/login'} />
    );
  };
};

export default isAuthenticated;
