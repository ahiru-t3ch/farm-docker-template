import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "./AuthContext";
import Logout from "./Logout";


export default function  ConnectNavHandler(){
  const { isConnected } = useContext(AuthContext);

  if (isConnected) {
    return (<li><Logout /></li>);
  } else {
    return (
      <>
        <li><Link to="/login" className="hover:text-blue-500">Login</Link></li>
        {/*<li><Link to="/register" className="hover:text-blue-500">Register</Link></li>*/}
      </>
    );
  }
};