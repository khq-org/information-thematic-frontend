import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

import CITY from "../vn/CITY.json";
import DISTRICT from "../vn/DISTRICT.json";

import {
  CModal,
  CButton,
  CModalHeader,
  CModalFooter,
  CModalBody,
  CModalTitle,
  CFormSelect,
} from "@coreui/react";

export const SchoolDetail = () => {
  const token = localStorage.getItem("access_token");
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  const [school, setschool] = useState("");
  const [phone, setphone] = useState("");
  const [street, setstreet] = useState("");
  const [district, setdistrict] = useState("");
  const [city, setcity] = useState("");
  const [website, setwebsite] = useState("");
  const [listaccount, setlistaccount] = useState([]);

  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [email, setemail] = useState("");

  const [listcity, setlistcity] = useState([]);
  const [listdistrict, setlistdistrict] = useState([]);

  const { id } = useParams();
  const [visible, setVisible] = useState(false);

  //console.log({ id });

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(`schools/${id}`);
        //console.log({ data });
        setschool(data.data.school);
        setphone(data.data.phone);
        setstreet(data.data.street);
        setdistrict(data.data.district);
        setcity(data.data.city);
        setwebsite(data.data.website);
      } catch (e) {}
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        setlistcity(CITY);
        setlistdistrict(DISTRICT);
      } catch (e) {}
    })();
  }, []);

  const setadd = async (code) => {
    const c = listcity.find((item) => item.code === code);
    setcity(c.name);
    const d = DISTRICT.filter((item) => item.parent_code === code);
    setlistdistrict(d);
  };
  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(`schooladmins?schoolId=${id}`);
        setlistaccount(data.data.items);

        //console.log({ data });
      } catch (e) {}
    })();
  }, []);

  const create = async (e) => {
    e.preventDefault();
    const res = await axios.post("schooladmins", {
      firstName,
      lastName,
      email,
      schoolId: id,
    });
    setfirstName("");
    setlastName("");
    setemail("");
    //console.log({ res });
    window.location.reload();
  };

  const save = async (e) => {
    e.preventDefault();

    const { data } = await axios.put(`schools/${id}`, {
      school,
      phone,
      street,
      district,
      city,
      website,
    });

    //console.log({ data });

    //console.log({ res });

    alert("done.");

    //navigate(-1);
  };
  const del = async (schoolAdminId) => {
    const res = await axios.delete(`schooladmins/${schoolAdminId}`);
    //console.log(res);
    setlistaccount(
      listaccount.filter((item) => item.schoolAdminId !== schoolAdminId)
    );

    //window.location.reload();
  };
  //console.log(listaccount);

  return (
    <>
      <CModal
        alignment="center"
        visible={visible}
        onClose={() => setVisible(false)}
      >
        <CModalHeader>
          <CModalTitle>
            <h2>Create account schooladmin</h2>
          </CModalTitle>
        </CModalHeader>
        <CModalBody>
          <form onSubmit={create}>
            <div className="col-md-12">
              <b>First Name</b>
              <input
                type="text"
                className="form-control"
                placeholder="first name"
                onChange={(e) => setfirstName(e.target.value)}
                required
              />
            </div>

            <div className="col-md-12">
              <b>Last Name</b>
              <input
                type="text"
                className="form-control"
                placeholder="last name"
                onChange={(e) => setlastName(e.target.value)}
                required
              />
            </div>

            <div className="col-md-12">
              <b>Email</b>
              <input
                type="text"
                className="form-control"
                placeholder="email"
                onChange={(e) => setemail(e.target.value)}
                required
              />
            </div>
            <div className="mt-5 text-center">
              <button className="btn btn-primary " type="submit">
                Create
              </button>
            </div>
          </form>
        </CModalBody>
      </CModal>
      <div style={{ marginLeft: "300px", marginRight: "50px" }}>
        <table>
          <tr>
            <td style={{ width: "50%" }}>
              <div>
                <form onSubmit={save}>
                  <div>
                    <br />
                    <div>
                      <h1 className="text-center">School Details</h1>
                    </div>

                    <table className="table ">
                      <tr>
                        <td>
                          <b>Name School</b>
                        </td>
                        <td>
                          <input
                            type="text"
                            className="form-control"
                            value={school}
                            onChange={(e) => setschool(e.target.value)}
                            required
                          />
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <b>Phone</b>
                        </td>
                        <td>
                          <input
                            type="text"
                            className="form-control"
                            value={phone}
                            onChange={(e) => setphone(e.target.value)}
                            required
                          />
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <b>Street</b>
                        </td>
                        <td>
                          <input
                            type="text"
                            className="form-control"
                            value={street}
                            onChange={(e) => setstreet(e.target.value)}
                            required
                          />
                        </td>
                      </tr>

                      <tr>
                        <td>
                          <b>District</b>
                        </td>
                        <td>
                          <CFormSelect
                            value={district}
                            onChange={(e) => setdistrict(e.target.value)}
                          >
                            {listdistrict.map((item) => (
                              <option
                                value={item.name}
                                label={item.name}
                              ></option>
                            ))}
                          </CFormSelect>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <b>City</b>
                        </td>
                        <td>
                          <CFormSelect
                            value={
                              listcity.find((item) => item.name === city)?.code
                            }
                            onChange={(e) => setadd(e.target.value)}
                          >
                            {listcity.map((item) => (
                              <option
                                value={item.code}
                                label={item.name}
                              ></option>
                            ))}
                          </CFormSelect>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <b>Website</b>
                        </td>
                        <td>
                          <input
                            type="text"
                            className="form-control"
                            value={website}
                            onChange={(e) => setwebsite(e.target.value)}
                            required
                          />
                        </td>
                      </tr>
                    </table>

                    <div className="mt-5 text-center">
                      <button
                        className="btn btn-primary profile-button"
                        type="submit"
                      >
                        Save profile
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </td>
            <td></td>
            <td style={{ width: "40%" }}>
              <div className=" border-left">
                <div className="">
                  <div className="text-center">
                    <h3>Account </h3>
                  </div>

                  <br />
                  <table className="table  ">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>UserName</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {listaccount.map((item) => (
                        <tr key={item.schoolAdminId}>
                          <td>{item.schoolAdminId}</td>
                          <td>{item.username}</td>
                          <td>
                            {item.lastName} {item.firstName}
                          </td>
                          <td>{item.email}</td>

                          <td>
                            <Link
                              to={`adminschooldetail/${item.schoolAdminId}`}
                              className="edit"
                              title="Edit"
                              cshools-toggle="tooltip"
                            >
                              <i className="material-icons">&#xE254;</i>
                            </Link>

                            <Link
                              onClick={() => del(item.schoolAdminId)}
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
                  <div className="text-end">
                    <CButton onClick={() => setVisible(!visible)}>
                      Create
                    </CButton>
                  </div>
                </div>
              </div>
            </td>
          </tr>
        </table>
      </div>
    </>
  );
};
