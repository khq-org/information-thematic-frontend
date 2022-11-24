import "./ChangePW.css";
import axios from "axios";

import { useState } from "react";
export const ChangePW = () => {
  const token = localStorage.getItem("access_token");
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  const [currentPassword, setcurrentPassword] = useState("");
  const [newPassword, setnewPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put("users/password", {
        currentPassword,
        newPassword,
        confirmPassword,
      });

      console.log({ response });
      setcurrentPassword("");
      setnewPassword("");
      setconfirmPassword("");

      alert("Successed");
    } catch (err) {
      alert("Missing Password");
    }
  };
  return (
    <div className="container rounded bg-gradient ">
      <div className="cardStyle">
        <form onSubmit={submit} method="post" name="signupForm" id="signupForm">
          <h4 className="formTitle">CHANGE TO PASSWORD</h4>
          <div className="inputDiv">
            Your Password
            <input
              type="password"
              id="yourpassword"
              name="yourpassword"
              onChange={(e) => setcurrentPassword(e.target.value)}
              required
            />
          </div>

          <div className="inputDiv">
            New Password
            <input
              type="password"
              id="password"
              name="password"
              onChange={(e) => setnewPassword(e.target.value)}
              required
            />
          </div>

          <div className="inputDiv">
            Confirm Password
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              onChange={(e) => setconfirmPassword(e.target.value)}
              required
            />
          </div>

          <div className="buttonWrapper">
            <button
              type="submit"
              id="submitButton"
              className="submitButton pure-button pure-button-primary"
            >
              <span>Continue</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
