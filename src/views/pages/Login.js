import "./Login.css";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { useState } from "react";

export const Login = () => {
  const [username, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [navigate, setNavigate] = useState(2);

  const submit = async (e) => {
    e.preventDefault();

    const { data } = await axios.post(
      "login",
      {
        username,
        password,
      },
      { withCredentials: true }
    );

    localStorage.setItem("access_token", data.access_token);
    //const a = localStorage.getItem("access_token");
    // axios.defaults.headers.common["Authorization"] = `Bearer ${a}`;

    //console.log({ a });
    // const a = JSON.parse(data.access_token);
    // console.log(a);
    const lg = username.localeCompare("admin");
    setNavigate(lg);
  };

  if (navigate === 0) {
    return <Navigate to="/admin/home" />;
  }
  if (navigate === 1) {
    return <Navigate to="/dashboard" />;
  }
  return (
    <div className="box-form">
      <link
        href="//maxcdn.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.min.css"
        rel="stylesheet"
      />
      <link
        rel="stylesheet"
        href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css"
      ></link>

      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/icon?family=Material+Icons"
      ></link>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css?family=Roboto"
      ></link>
      <div className="left">
        <div className="overlay">
          <h1>School Management</h1>
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <p>PBL6_04</p>
        </div>
      </div>

      <div className="right">
        <br />

        <h5>Đăng nhập</h5>
        <br />
        <form onSubmit={submit}>
          <div className="inputs">
            <input
              type="text"
              placeholder="Tài khoản"
              onChange={(e) => setUser(e.target.value)}
              required
            />
            <br />
            <input
              type="password"
              placeholder="Mật khẩu"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <br />
          <br />
          <button type="submit">Đăng nhập</button>
        </form>
      </div>
    </div>
  );
};
