import "./CreateSchool.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "@coreui/coreui/dist/css/coreui.min.css";
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

export const CreateSchool = () => {
  const token = localStorage.getItem("access_token");
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  const [visible, setVisible] = useState(false);
  const [school, setschool] = useState("");
  const [phone, setphone] = useState("");
  const [street, setstreet] = useState("");
  const [district, setdistrict] = useState("");
  const [city, setcity] = useState("");
  const [website, setwebsite] = useState("");

  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [email, setemail] = useState("");
  const [listcity, setlistcity] = useState([]);
  const [listdistrict, setlistdistrict] = useState([]);

  const [user, setUser] = useState("test");
  let navigate = useNavigate();

  // useEffect(() => {
  //   (async () => {
  //     try {
  //       const { data } = await axios.get(
  //         "https://vn-public-apis.fpo.vn/provinces/getAll?limit=-1"
  //       );
  //       setlistcity(data.data.data);
  //     } catch (e) {}
  //   })();
  // }, []);

  // useEffect(() => {
  //   (async () => {
  //     try {
  //       const { data } = await axios.get(
  //         "https://vn-public-apis.fpo.vn/districts/getAll?limit=-1"
  //       );
  //       setlistdistrict(data.data.data);
  //     } catch (e) {}
  //   })();
  // }, []);
  // const setadd = async (code) => {
  //   const c = listcity.find((item) => item.code === code);
  //   setcity(c.name);
  //   const { data } = await axios.get(
  //     `https://vn-public-apis.fpo.vn/districts/getByProvince?provinceCode=${code}&limit=-1`
  //   );
  //   setlistdistrict(data.data.data);
  // };
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
  const save = async (e) => {
    e.preventDefault();

    const { data } = await axios.post("schools", {
      school,
      phone,
      street,
      district,
      city,
      website,
    });
    //console.log({ data });
    const schoolId = data.data.id;
    const res = await axios.post("schooladmins", {
      firstName,
      lastName,
      email,
      schoolId,
    });
    //console.log({ res });

    const id = await axios.get(`schooladmins/${res.data.data.id}`);
    setUser(id.data.data.username);
    //console.log({ id });

    setVisible(true);
  };

  return (
    <>
      <div className="container rounded bg-gradient mt-0 mb-0 m-lg-auto">
        <form className="row" onSubmit={save}>
          <div className="col-md-7 border-right">
            <div className="p-5 py-3">
              <div className="">
                <h2 className="text-center">Create Customer</h2>
              </div>
              <br />

              <div className="row mt-3">
                <div className="col-md-12">
                  <b>Name School</b>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="name school"
                    onChange={(e) => setschool(e.target.value)}
                    required
                  />
                </div>
                <div className="col-md-12">
                  <b>Phone</b>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="phone"
                    onChange={(e) => setphone(e.target.value)}
                    required
                  />
                </div>
                <div className="col-md-12">
                  <b>Street</b>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="street"
                    onChange={(e) => setstreet(e.target.value)}
                    required
                  />
                </div>
                {/* <div className="col-md-12">
                  <b>District</b>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="district"
                    onChange={(e) => setdistrict(e.target.value)}
                    required
                  />
                </div>

                <div className="col-md-12">
                  <b>City</b>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="city"
                    onChange={(e) => setcity(e.target.value)}
                    required
                  />
                </div> */}
                <div className="col-md-12">
                  <b>District</b>
                  <CFormSelect onChange={(e) => setdistrict(e.target.value)}>
                    {listdistrict.map((item) => (
                      <option value={item.name} label={item.name}></option>
                    ))}
                  </CFormSelect>
                </div>
                <div className="col-md-12">
                  <b>City</b>
                  <CFormSelect onChange={(e) => setadd(e.target.value)}>
                    {listcity.map((item) => (
                      <option value={item.code} label={item.name}></option>
                    ))}
                  </CFormSelect>
                </div>
                <div className="col-md-12">
                  <b>Website</b>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="website"
                    onChange={(e) => setwebsite(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="mt-5 text-center">
                <button
                  className="btn btn-primary profile-button"
                  type="submit"
                >
                  Create
                </button>

                <CModal
                  visible={visible}
                  onClose={() => {
                    navigate(-1);
                  }}
                >
                  <CModalHeader>
                    <CModalTitle>Account</CModalTitle>
                  </CModalHeader>
                  <CModalBody>
                    <table className="table table-bordered ">
                      <tr>
                        <th>School</th>
                        <th>{school}</th>
                      </tr>
                      <tr>
                        <th>UserAdmin</th>
                        <th>{user}</th>
                      </tr>
                      <tr>
                        <th>PassWord</th>
                        <th>{user}</th>
                      </tr>
                    </table>
                  </CModalBody>
                  <CModalFooter>
                    <CButton
                      color="secondary"
                      onClick={() => {
                        navigate(-1);
                      }}
                    >
                      OK
                    </CButton>
                  </CModalFooter>
                </CModal>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="p-3 py-5">
              <br />
              <br />
              <div className="d-flex justify-content-between align-items-center experience">
                <h3>Account(School Admin)</h3>
              </div>
              <br />
              <br />

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
              <br />
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
              <br />
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
            </div>
          </div>
        </form>
      </div>
    </>
  );
};
