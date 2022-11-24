import "./InfoAdmin.css";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

import { useState, useEffect } from "react";

export const AdminSchoolDetail = () => {
  const token = localStorage.getItem("access_token");
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [schoolId, setschoolId] = useState(0);
  const [email, setemail] = useState("");
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");

  const { id } = useParams();
  let nav = useNavigate();
  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(`schooladmins/${id}`);
        console.log({ data });
        setfirstName(data.data.firstName);
        setlastName(data.data.lastName);
        setusername(data.data.username);
        setemail(data.data.email);
        setpassword(data.data.password);
        setschoolId(data.data.schoolId);
      } catch (e) {}
    })();
  }, []);

  const save = async (e) => {
    e.preventDefault();

    const res = await axios.put(`schooladmins/${id}`, {
      firstName,
      lastName,
      email,
      password,
      schoolId,
    });
    nav(-1);
  };

  return (
    <div className="container rounded bg-gradient ">
      <div className="cardStyle">
        <form onSubmit={save} method="post" name="signupForm" id="signupForm">
          <h4 className="formTitle">Account</h4>
          <div className="inputDiv">
            FirstName
            <input
              type="text"
              value={firstName}
              onChange={(e) => setfirstName(e.target.value)}
            />
          </div>

          <div className="inputDiv">
            LastName
            <input
              type="text"
              value={lastName}
              onChange={(e) => setlastName(e.target.value)}
            />
          </div>

          <div className="inputDiv">
            Email
            <input
              type="text"
              value={email}
              onChange={(e) => setemail(e.target.value)}
            />
          </div>
          <div className="inputDiv">
            UserName
            <input type="text" value={username} readOnly />
          </div>
          <div className="inputDiv">
            Password
            <input type="text" onChange={(e) => setpassword(e.target.value)} />
          </div>

          <div className="text-center mt-3">
            <button type="submit" id="submitButton" className="btn btn-primary">
              <span>Save</span>
            </button>
            <button className="btn btn-secondary" onClick={() => nav(-1)}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
