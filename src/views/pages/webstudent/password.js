import axios from "axios";

import { useState } from "react";
const ChangePW = () => {
  const token = localStorage.getItem("access_token");
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  const [currentPassword, setcurrentPassword] = useState("");
  const [newPassword, setnewPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        "users/password",
        {
          currentPassword,
          newPassword,
          confirmPassword,
        },
        { withCredentials: true }
      );

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
    <div className="">
      <div className="container bg-white ">
        <form onSubmit={submit} method="post" name="signupForm" id="signupForm">
          <h4 className="formTitle">ĐỔI MẬT KHẨU</h4>
          <table className="table  table-bordered ">
            <tr>
              <td> Mật khẩu hiện tại</td>
              <td>
                <input
                  type="password"
                  id="yourpassword"
                  name="yourpassword"
                  onChange={(e) => setcurrentPassword(e.target.value)}
                  required
                />
              </td>
            </tr>
            <tr>
              <td>Mật khẩu mới</td>
              <td>
                <input
                  type="password"
                  id="password"
                  name="password"
                  onChange={(e) => setnewPassword(e.target.value)}
                  required
                />
              </td>
            </tr>
            <tr>
              <td>Nhập lại mật khẩu</td>
              <td>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  onChange={(e) => setconfirmPassword(e.target.value)}
                  required
                />
              </td>
            </tr>
          </table>

          <div className="buttonWrapper">
            <button
              type="submit"
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
export default ChangePW;
