import React from "react";
import "./table.css";
import CITY from "../../vn/CITY.json";
import DISTRICT from "../../vn/DISTRICT.json";
import axios from "axios";
import { useState, useEffect } from "react";
import { CFormSelect } from "@coreui/react";
import { useNavigate } from "react-router-dom";

const CreateStudent = () => {
  const token = localStorage.getItem("access_token");
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [dateOfBirth, setdateOfBirth] = useState("");
  const [gender, setgender] = useState(true);
  const [phone, setphone] = useState("");
  const [email, setemail] = useState("");
  const [street, setstreet] = useState("");
  const [district, setdistrict] = useState("");
  const [city, setcity] = useState("");
  const [placeOfBirth, setplaceOfBirth] = useState("");
  const [workingPosition, setworkingPosition] = useState("");
  const [classId, setclassId] = useState(1);
  const [nationality, setnationality] = useState("");
  const [listcity, setlistcity] = useState([]);
  const [listdistrict, setlistdistrict] = useState([]);
  const [listclass, setlistclass] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        //const res = await axios.get("classes?schoolYearId=1");
        const res = await axios.get("classes");
        setlistclass(res.data.data.items);
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

  let nav = useNavigate();
  const create = async (e) => {
    e.preventDefault();
    const res = await axios.post("students", {
      firstName,
      lastName,
      dateOfBirth,
      placeOfBirth,
      gender,
      phone,
      email,
      street,
      district,
      city,
      nationality,
      workingPosition,
      classId,
    });
    //console.log(res);
    nav(-1);
  };
  return (
    <>
      <div
        id="tabs_LcSV-divT0"
        style={{ width: "100%", padding: "5px 2px 2px 2px" }}
      >
        <div
          classname="GreyBox"
          style={{ marginRight: "auto", marginLeft: "auto" }}
        >
          <div id="Div1" style={{ width: "100%" }}>
            <div classname="GreyBoxCaption" style={{ height: "20px" }}>
              <h4> THÔNG TIN CÁ NHÂN:</h4>
            </div>
            <br />
            <div
              id="LopHPdivCapQLStatus"
              style={{ marginLeft: "10px", float: "left" }}
            />
            <div style={{ clear: "both" }} />
          </div>
          <div>
            <table className="table table-light">
              <tbody>
                <tr>
                  <td style={{ textAlign: "left", width: "180px" }} rowSpan={7}>
                    <img
                      classname="imgCB"
                      src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Microsoft_Account.svg/768px-Microsoft_Account.svg.png"
                      style={{ height: "140px", width: "120px" }}
                    />
                  </td>
                  <td classname="auto-style11">Họ:</td>
                  <td>
                    <input
                      type="text"
                      style={{ width: "180px", fontWeight: "bold" }}
                      onChange={(e) => setlastName(e.target.value)}
                    />
                  </td>

                  <td classname="auto-style11">Tên:</td>
                  <td>
                    <input
                      type="text"
                      style={{ width: "180px" }}
                      onChange={(e) => setfirstName(e.target.value)}
                    />
                  </td>
                  <td style={{ textAlign: "right" }} classname="auto-style14">
                    Nơi sinh:
                  </td>
                  <td>
                    <input
                      type="text"
                      style={{ width: "230px", fontWeight: "bold" }}
                      onChange={(e) => setplaceOfBirth(e.target.value)}
                    />
                  </td>
                </tr>
                <tr>
                  <td classname="auto-style11">Giới tính:</td>
                  <td>
                    <CFormSelect
                      onChange={(e) => setgender(e.target.value)}
                      style={{ width: "180px" }}
                    >
                      <option value={true}>Nam</option>
                      <option value={false}>Nữ</option>
                    </CFormSelect>
                  </td>
                  <td classname="auto-style11">Ngày sinh:</td>
                  <td classname="auto-style1">
                    <input
                      type="date"
                      style={{ width: "180px" }}
                      onChange={(e) =>
                        setdateOfBirth(e.target.value.toString())
                      }
                    />
                  </td>
                  <td style={{ textAlign: "right" }} classname="auto-style14">
                    Quốc tịch:
                  </td>
                  <td>
                    <input
                      type="text"
                      style={{ width: "230px", fontWeight: "bold" }}
                      onChange={(e) => setnationality(e.target.value)}
                    />
                  </td>
                </tr>
                <tr></tr>
                <tr>
                  <td classname="auto-style11">Số CCCD:</td>
                  <td>
                    <input type="text" style={{ width: "180px" }} />
                  </td>
                  <td classname="auto-style17">Ngày cấp:</td>
                  <td classname="auto-style1">
                    <input type="date" style={{ width: "180px" }} />
                  </td>
                  <td classname="auto-style15">&nbsp;</td>
                  <td>&nbsp;</td>
                </tr>
                <tr></tr>
                <tr></tr>

                <tr>
                  <td classname="auto-style4" style={{ textAlign: "right" }}>
                    &nbsp;
                  </td>
                  <td colSpan={2}>&nbsp;</td>
                  <td classname="auto-style1">&nbsp;</td>
                  <td classname="auto-style14" style={{ textAlign: "right" }}>
                    &nbsp;
                  </td>
                  <td>&nbsp;</td>
                </tr>

                <tr>
                  <td colSpan={2} style={{ textAlign: "right" }}>
                    Lớp
                  </td>
                  <td colSpan={2}>
                    <CFormSelect
                      className="form-control form-control-sm mr-3 w-25"
                      onChange={(e) => setclassId(e.target.value)}
                    >
                      {listclass?.map((items) => (
                        <option
                          value={items.classId}
                          label={items.clazz}
                        ></option>
                      ))}
                    </CFormSelect>
                  </td>
                  <td style={{ textAlign: "right" }} classname="auto-style10">
                    Email cá nhân:
                  </td>
                  <td colSpan={2}>
                    <input
                      type="text"
                      style={{ width: "310px" }}
                      onChange={(e) => setemail(e.target.value)}
                    />
                  </td>
                </tr>

                <tr>
                  <td colSpan={2} style={{ textAlign: "right" }}>
                    Điện thoại:
                  </td>
                  <td colSpan={2}>
                    <input
                      type="text"
                      style={{ width: "350px" }}
                      onChange={(e) => setphone(e.target.value)}
                    />
                  </td>
                  <td classname="auto-style10">&nbsp;</td>
                  <td colSpan={2}>&nbsp;</td>
                </tr>

                <tr>
                  <td style={{ textAlign: "right" }} colSpan={2}>
                    <em>
                      <strong>Địa chỉ cư trú hiện nay: </strong>
                    </em>
                  </td>
                  <td colSpan={3}>
                    <input
                      type="text"
                      title="Cần nhập thông tin cụ thể Số nhà, Đường (hoặc Xóm, Thôn) để ghép với Thành phố, Quận, Phường (hoặc Tỉnh, Huyện, Xã) dưới đây"
                      style={{ width: "350px" }}
                      onChange={(e) => setstreet(e.target.value)}
                    />
                  </td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td style={{ textAlign: "right" }} colSpan={2}>
                    Tỉnh/ Thành phố:
                  </td>
                  <td>
                    <div id="CN_divTinhCTru">
                      <CFormSelect
                        style={{ width: "185px" }}
                        onChange={(e) => setadd(e.target.value)}
                      >
                        {listcity.map((item) => (
                          <option value={item.code} label={item.name}></option>
                        ))}
                      </CFormSelect>
                    </div>
                  </td>
                  <td style={{ textAlign: "right" }} classname="auto-style17">
                    Huyện/ Quận:
                  </td>
                  <td classname="auto-style1">
                    <div id="CN_divQuanCTru">
                      <CFormSelect
                        style={{ width: "185px" }}
                        onChange={(e) => setdistrict(e.target.value)}
                      >
                        {listdistrict.map((item) => (
                          <option value={item.name} label={item.name}></option>
                        ))}
                      </CFormSelect>
                    </div>
                  </td>
                  <td></td>
                  <td></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <br />
        <br />
        <div
          classname="GreyBox"
          style={{ marginRight: "auto", marginLeft: "auto" }}
        >
          <div id="Div1" style={{ width: "100%" }}>
            <div classname="GreyBoxCaption" style={{ height: "20px" }}>
              <h4>THÔNG TIN NHÂN THÂN:</h4>
            </div>
            <br />
            <div style={{ marginLeft: "10px", float: "left" }} />
            <div style={{ clear: "both" }} />
          </div>
          <div>
            <h5>Cha</h5>
            <table className="table table-light">
              <tbody>
                <tr>
                  <td style={{ textAlign: "right" }} classname="auto-style24">
                    Họ:
                  </td>
                  <td>
                    <input type="text" style={{ width: "200px" }} />
                  </td>
                  <td>Tên:</td>
                  <td>
                    <input type="text" style={{ width: "200px" }} />
                  </td>

                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td style={{ textAlign: "right" }}>Nghề nghiệp:</td>
                  <td>
                    <input type="text" style={{ width: "200px" }} />
                  </td>
                  <td style={{ textAlign: "right" }}>Số điện thoại:</td>
                  <td>
                    <input type="text" style={{ width: "200px" }} />
                  </td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td>Địa chỉ:</td>
                  <td>
                    <input type="text" style={{ width: "200px" }} />
                  </td>
                  <td style={{ textAlign: "right" }}>Tỉnh/thành phố:</td>
                  <td>
                    <CFormSelect
                      style={{ width: "200px" }}
                      onChange={(e) => setadd(e.target.value)}
                    >
                      {listcity.map((item) => (
                        <option value={item.code} label={item.name}></option>
                      ))}
                    </CFormSelect>
                  </td>
                  <td>Quận/huyện:</td>
                  <td>
                    <CFormSelect
                      style={{ width: "200px" }}
                      onChange={(e) => setdistrict(e.target.value)}
                    >
                      {listdistrict.map((item) => (
                        <option value={item.name} label={item.name}></option>
                      ))}
                    </CFormSelect>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div>
            <h5>Mẹ</h5>
            <table className="table table-light">
              <tbody>
                <tr>
                  <td style={{ textAlign: "right" }} classname="auto-style24">
                    Họ:
                  </td>
                  <td>
                    <input type="text" style={{ width: "200px" }} />
                  </td>
                  <td>Tên:</td>
                  <td>
                    <input type="text" style={{ width: "200px" }} />
                  </td>

                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td style={{ textAlign: "right" }}>Nghề nghiệp:</td>
                  <td>
                    <input type="text" style={{ width: "200px" }} />
                  </td>
                  <td style={{ textAlign: "right" }}>Số điện thoại:</td>
                  <td>
                    <input type="text" style={{ width: "200px" }} />
                  </td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td>Địa chỉ:</td>
                  <td>
                    <input type="text" style={{ width: "200px" }} />
                  </td>
                  <td style={{ textAlign: "right" }}>Tỉnh/thành phố:</td>
                  <td>
                    <CFormSelect
                      style={{ width: "200px" }}
                      onChange={(e) => setadd(e.target.value)}
                    >
                      {listcity.map((item) => (
                        <option value={item.code} label={item.name}></option>
                      ))}
                    </CFormSelect>
                  </td>
                  <td>Quận/huyện:</td>
                  <td>
                    <CFormSelect
                      style={{ width: "200px" }}
                      onChange={(e) => setdistrict(e.target.value)}
                    >
                      {listdistrict.map((item) => (
                        <option value={item.name} label={item.name}></option>
                      ))}
                    </CFormSelect>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-2 text-center">
          <button
            className="btn btn-primary profile-button"
            type="button"
            onClick={create}
          >
            Thêm mới
          </button>
        </div>
      </div>
    </>
  );
};

export default CreateStudent;
