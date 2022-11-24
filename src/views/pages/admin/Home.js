import "./Home.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { CAlert } from "@coreui/react";
import "@coreui/coreui/dist/css/coreui.min.css";

export const Home = () => {
  const [listschool, setListschool] = useState([]);
  const token = localStorage.getItem("access_token");
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  const [visible, setVisible] = useState(false);
  const [textsearch, settextsearch] = useState("");

  const del = async (id) => {
    const res = await axios.delete(`schools/${id}`);
    //console.log(res);
    setListschool(listschool.filter((item) => item.schoolId !== id));
    //window.location.reload();
    setVisible(true);
  };

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get("schools");
        //console.log({ data });
        setListschool(data.data.items);
      } catch (e) {}
    })();
  }, []);
  const search = () => {
    alert(textsearch);
  };

  return (
    <>
      <CAlert
        className="alert"
        color="primary"
        dismissible
        visible={visible}
        onClose={() => setVisible(false)}
      >
        Deleted!
      </CAlert>
      <div className="main">
        <link
          rel="stylesheet"
          href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css"
        ></link>
        <link
          rel="stylesheet"
          href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
        ></link>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
        ></link>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto"
        ></link>
        <div className="container-xl">
          <div className="table-responsive">
            <div className="table-wrapper">
              <div className="table-title">
                <div className="row">
                  <div className="col-sm-8">
                    <h1>
                      <b>Schools</b>
                    </h1>
                  </div>
                  <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                    <form className="form-inline ">
                      <input
                        className="form-control form-control-sm mr-3 w-75"
                        type="text"
                        placeholder="Search&hellip;"
                        aria-label="Search"
                        onChange={(e) => settextsearch(e.target.value)}
                      />
                      <Link className="material-icons" onClick={() => search()}>
                        search
                      </Link>
                    </form>

                    <Link to="create">
                      <button className="btn btn-primary" type="button">
                        Create
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
              <table className="table table-striped table-hover table-bordered">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>
                      Name <i className="fa fa-sort"></i>
                    </th>
                    <th>Phone</th>
                    <th>Street</th>
                    <th>District</th>
                    <th>City</th>
                    <th>Website</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {listschool.map((item) => (
                    <tr key={item.schoolId}>
                      <td>{item.schoolId}</td>
                      <td>{item.school}</td>
                      <td>{item.phone}</td>
                      <td>{item.street}</td>
                      <td>{item.district}</td>
                      <td>{item.city}</td>
                      <td> {item.website}</td>
                      <td>
                        <Link
                          to=""
                          className="view"
                          title="View"
                          cshools-toggle="tooltip"
                        >
                          <i className="material-icons">&#xE417;</i>
                        </Link>

                        <Link
                          to={`schooldetail/${item.schoolId}`}
                          className="edit"
                          title="Edit"
                          cshools-toggle="tooltip"
                        >
                          <i className="material-icons">&#xE254;</i>
                        </Link>
                        <Link
                          onClick={() => del(item.schoolId)}
                          //href=" "
                          className="delete"
                          title="Delete"
                          cshools-toggle="tooltip"
                        >
                          <i className="material-icons">&#xE872;</i>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
