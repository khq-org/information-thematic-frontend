import "./Admin.css";
import { Routes, Route, Link } from "react-router-dom";
import { Home } from "./Home";
import { InfoAdmin } from "./InfoAdmin";
import { ChangePW } from "./ChangePW";
import { SchoolDetail } from "./SchoolDetail";
import { CreateSchool } from "./CreateSchool";
import { AdminSchoolDetail } from "./AdminSchoolDetail";

function Admin() {
  const logout = () => {
    localStorage.removeItem("access_token");
  };
  return (
    <div>
      <header>
        <link
          href="//maxcdn.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.min.css"
          rel="stylesheet"
        />
        {/* <link
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
        ></link> */}

        <header className="p-2 bg-while text-bg-dark text-center">
          <h5>ADMINISTRATOR</h5>
        </header>
        <div className="nav-side-menu">
          <div className="brand">SCHOOL MANAGEMENT</div>
          <i
            className="fa fa-bars fa-2x toggle-btn"
            data-toggle="collapse"
            data-target="#menu-content"
          ></i>

          <div className="menu-list">
            <ul id="menu-content" className="menu-content collapse out">
              <li>
                <Link to="home">
                  <i className="fa fa-dashboard fa-lg"></i> Dashboard
                </Link>
              </li>

              <li>
                <Link to="info">
                  <i className="fa fa-user fa-lg"></i> Profile
                </Link>
              </li>

              <li>
                <Link to="changepassword">
                  <i className="fa fa-unlock-alt fa-lg"></i> PassWord
                </Link>
              </li>
              <li>
                <Link onClick={logout} to="/">
                  <i className="fa fa-sign-out fa-lg"></i> Logout
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </header>

      <Routes>
        <Route path="home" element={<Home />} />
        <Route path="info" element={<InfoAdmin />} />
        <Route path="changepassword" element={<ChangePW />} />
        <Route path="home/schooldetail/:id" element={<SchoolDetail />} />
        <Route
          path="home/schooldetail/:id/adminschooldetail/:id"
          element={<AdminSchoolDetail />}
        />
        <Route path="home/create" element={<CreateSchool />} />
      </Routes>
    </div>
  );
}

export default Admin;
