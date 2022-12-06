import React from "react";
import { CFormSelect } from "@coreui/react";
import axios from "axios";
import { useState, useEffect } from "react";

const Calendar = () => {
  const token = localStorage.getItem("access_token");
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  const [listclass, setlistclass] = useState([]);
  const [listyear, setlistyear] = useState([]);
  const [listteacher, setlistTeacher] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get("schoolyear");
        //console.log(data);
        setlistyear(data.data.items);
        const res = await axios.get("classes");
        setlistclass(res.data.data.items);
      } catch (e) {}
    })();
  }, []);
  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get("teachers");
        //console.log({ data });
        setlistTeacher(data.data.items);
      } catch (e) {}
    })();
  }, []);
  return (
    <>
      <div style={{ width: "100%", padding: "5px 2px 2px 2px" }}>
        <div
          classname="GreyBox"
          style={{ marginRight: "auto", marginLeft: "auto" }}
        >
          <table className="table table-primary">
            <tbody>
              <tr>
                <td style={{ textAlign: "center", width: "7%" }}>Năm học:</td>
                <td>
                  <CFormSelect>
                    {listyear?.map((item) => (
                      <option
                        value={item.schoolYearId}
                        label={item.schoolYear}
                      ></option>
                    ))}
                  </CFormSelect>
                </td>
                <td style={{ textAlign: "center", width: "5%" }}>Lớp:</td>
                <td>
                  <CFormSelect>
                    {listclass?.map((items) => (
                      <option
                        value={items.classId}
                        label={items.clazz}
                      ></option>
                    ))}
                  </CFormSelect>
                </td>
                <td style={{ textAlign: "center", width: "30%" }}>
                  Thời gian bắt đầu: <input type="date" />
                </td>
                <td style={{ textAlign: "center", width: "30%" }}>
                  Thời gian kết thúc: <input type="date" />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div style={{ width: "80%", padding: "5px 2px 2px 2px" }}>
        <div
          classname="GreyBox"
          style={{ marginRight: "auto", marginLeft: "auto" }}
        >
          <div class="table-wrapper-scroll-y my-custom-scrollbar">
            <table className="table table-bordered table-active">
              <tbody>
                <tr>
                  <td
                    style={{ textAlign: "center", width: "20%" }}
                    rowSpan={10}
                  >
                    Thứ 2
                  </td>
                  <td style={{ textAlign: "center", width: "10%" }}>Tiết 1</td>
                  <td style={{ textAlign: "center", width: "35%" }}>
                    <CFormSelect>
                      <option selected="selected">Môn học</option>
                      <option value={1} label="Toán"></option>
                      <option value={2} label="Vật lí"></option>
                      <option value={3} label="Hóa học"></option>
                      <option value={4} label="Văn học"></option>
                      <option value={5} label="Lịch sử"></option>
                      <option value={6} label="Địa lí"></option>
                      <option value={7} label="Sinh học"></option>
                      <option value={8} label="Tiếng anh"></option>
                      <option value={9} label="GDCD"></option>
                      <option value={10} label="Công nghệ"></option>
                      <option value={11} label="GDQPAN"></option>
                      <option value={12} label="Thể dục"></option>
                      <option value={13} label="Tin học"></option>
                    </CFormSelect>
                  </td>

                  <td style={{ textAlign: "center", width: "35%" }}>
                    <CFormSelect>
                      <option selected="selected">Giáo viên</option>
                      {listteacher.map((item) => (
                        <option
                          key={item.userId}
                          value={item.userId}
                          label={item.displayName}
                        ></option>
                      ))}
                    </CFormSelect>
                  </td>
                </tr>
                <tr>
                  <td style={{ textAlign: "center", width: "180px" }}>
                    Tiết 2
                  </td>
                  <td>
                    <CFormSelect>
                      <option selected="selected">Môn học</option>
                      <option value={1} label="Toán"></option>
                      <option value={2} label="Vật lí"></option>
                      <option value={3} label="Hóa học"></option>
                      <option value={4} label="Văn học"></option>
                      <option value={5} label="Lịch sử"></option>
                      <option value={6} label="Địa lí"></option>
                      <option value={7} label="Sinh học"></option>
                      <option value={8} label="Tiếng anh"></option>
                      <option value={9} label="GDCD"></option>
                      <option value={10} label="Công nghệ"></option>
                      <option value={11} label="GDQPAN"></option>
                      <option value={12} label="Thể dục"></option>
                      <option value={13} label="Tin học"></option>
                    </CFormSelect>
                  </td>

                  <td>
                    <CFormSelect>
                      <option selected="selected">Giáo viên</option>
                      {listteacher.map((item) => (
                        <option
                          key={item.userId}
                          value={item.userId}
                          label={item.displayName}
                        ></option>
                      ))}
                    </CFormSelect>
                  </td>
                </tr>
                <tr>
                  <td style={{ textAlign: "center", width: "180px" }}>
                    Tiết 3
                  </td>
                  <td>
                    <CFormSelect>
                      <option selected="selected">Môn học</option>
                      <option value={1} label="Toán"></option>
                      <option value={2} label="Vật lí"></option>
                      <option value={3} label="Hóa học"></option>
                      <option value={4} label="Văn học"></option>
                      <option value={5} label="Lịch sử"></option>
                      <option value={6} label="Địa lí"></option>
                      <option value={7} label="Sinh học"></option>
                      <option value={8} label="Tiếng anh"></option>
                      <option value={9} label="GDCD"></option>
                      <option value={10} label="Công nghệ"></option>
                      <option value={11} label="GDQPAN"></option>
                      <option value={12} label="Thể dục"></option>
                      <option value={13} label="Tin học"></option>
                    </CFormSelect>
                  </td>

                  <td>
                    <CFormSelect>
                      <option selected="selected">Giáo viên</option>
                      {listteacher.map((item) => (
                        <option
                          key={item.userId}
                          value={item.userId}
                          label={item.displayName}
                        ></option>
                      ))}
                    </CFormSelect>
                  </td>
                </tr>
                <tr>
                  <td style={{ textAlign: "center", width: "180px" }}>
                    Tiết 4
                  </td>
                  <td>
                    <CFormSelect>
                      <option selected="selected">Môn học</option>
                      <option value={1} label="Toán"></option>
                      <option value={2} label="Vật lí"></option>
                      <option value={3} label="Hóa học"></option>
                      <option value={4} label="Văn học"></option>
                      <option value={5} label="Lịch sử"></option>
                      <option value={6} label="Địa lí"></option>
                      <option value={7} label="Sinh học"></option>
                      <option value={8} label="Tiếng anh"></option>
                      <option value={9} label="GDCD"></option>
                      <option value={10} label="Công nghệ"></option>
                      <option value={11} label="GDQPAN"></option>
                      <option value={12} label="Thể dục"></option>
                      <option value={13} label="Tin học"></option>
                    </CFormSelect>
                  </td>

                  <td>
                    <CFormSelect>
                      <option selected="selected">Giáo viên</option>
                      {listteacher.map((item) => (
                        <option
                          key={item.userId}
                          value={item.userId}
                          label={item.displayName}
                        ></option>
                      ))}
                    </CFormSelect>
                  </td>
                </tr>
                <tr>
                  <td style={{ textAlign: "center", width: "180px" }}>
                    Tiết 5
                  </td>
                  <td>
                    <CFormSelect>
                      <option selected="selected">Môn học</option>
                      <option value={1} label="Toán"></option>
                      <option value={2} label="Vật lí"></option>
                      <option value={3} label="Hóa học"></option>
                      <option value={4} label="Văn học"></option>
                      <option value={5} label="Lịch sử"></option>
                      <option value={6} label="Địa lí"></option>
                      <option value={7} label="Sinh học"></option>
                      <option value={8} label="Tiếng anh"></option>
                      <option value={9} label="GDCD"></option>
                      <option value={10} label="Công nghệ"></option>
                      <option value={11} label="GDQPAN"></option>
                      <option value={12} label="Thể dục"></option>
                      <option value={13} label="Tin học"></option>
                    </CFormSelect>
                  </td>

                  <td>
                    <CFormSelect>
                      <option selected="selected">Giáo viên</option>
                      {listteacher.map((item) => (
                        <option
                          key={item.userId}
                          value={item.userId}
                          label={item.displayName}
                        ></option>
                      ))}
                    </CFormSelect>
                  </td>
                </tr>
                <tr>
                  <td style={{ textAlign: "center", width: "180px" }}>
                    Tiết 6
                  </td>
                  <td>
                    <CFormSelect>
                      <option selected="selected">Môn học</option>
                      <option value={1} label="Toán"></option>
                      <option value={2} label="Vật lí"></option>
                      <option value={3} label="Hóa học"></option>
                      <option value={4} label="Văn học"></option>
                      <option value={5} label="Lịch sử"></option>
                      <option value={6} label="Địa lí"></option>
                      <option value={7} label="Sinh học"></option>
                      <option value={8} label="Tiếng anh"></option>
                      <option value={9} label="GDCD"></option>
                      <option value={10} label="Công nghệ"></option>
                      <option value={11} label="GDQPAN"></option>
                      <option value={12} label="Thể dục"></option>
                      <option value={13} label="Tin học"></option>
                    </CFormSelect>
                  </td>

                  <td>
                    <CFormSelect>
                      <option selected="selected">Giáo viên</option>
                      {listteacher.map((item) => (
                        <option
                          key={item.userId}
                          value={item.userId}
                          label={item.displayName}
                        ></option>
                      ))}
                    </CFormSelect>
                  </td>
                </tr>
                <tr>
                  <td style={{ textAlign: "center", width: "180px" }}>
                    Tiết 7
                  </td>
                  <td>
                    <CFormSelect>
                      <option selected="selected">Môn học</option>
                      <option value={1} label="Toán"></option>
                      <option value={2} label="Vật lí"></option>
                      <option value={3} label="Hóa học"></option>
                      <option value={4} label="Văn học"></option>
                      <option value={5} label="Lịch sử"></option>
                      <option value={6} label="Địa lí"></option>
                      <option value={7} label="Sinh học"></option>
                      <option value={8} label="Tiếng anh"></option>
                      <option value={9} label="GDCD"></option>
                      <option value={10} label="Công nghệ"></option>
                      <option value={11} label="GDQPAN"></option>
                      <option value={12} label="Thể dục"></option>
                      <option value={13} label="Tin học"></option>
                    </CFormSelect>
                  </td>

                  <td>
                    <CFormSelect>
                      <option selected="selected">Giáo viên</option>
                      {listteacher.map((item) => (
                        <option
                          key={item.userId}
                          value={item.userId}
                          label={item.displayName}
                        ></option>
                      ))}
                    </CFormSelect>
                  </td>
                </tr>
                <tr>
                  <td style={{ textAlign: "center", width: "180px" }}>
                    Tiết 8
                  </td>
                  <td>
                    <CFormSelect>
                      <option selected="selected">Môn học</option>
                      <option value={1} label="Toán"></option>
                      <option value={2} label="Vật lí"></option>
                      <option value={3} label="Hóa học"></option>
                      <option value={4} label="Văn học"></option>
                      <option value={5} label="Lịch sử"></option>
                      <option value={6} label="Địa lí"></option>
                      <option value={7} label="Sinh học"></option>
                      <option value={8} label="Tiếng anh"></option>
                      <option value={9} label="GDCD"></option>
                      <option value={10} label="Công nghệ"></option>
                      <option value={11} label="GDQPAN"></option>
                      <option value={12} label="Thể dục"></option>
                      <option value={13} label="Tin học"></option>
                    </CFormSelect>
                  </td>

                  <td>
                    <CFormSelect>
                      <option selected="selected">Giáo viên</option>
                      {listteacher.map((item) => (
                        <option
                          key={item.userId}
                          value={item.userId}
                          label={item.displayName}
                        ></option>
                      ))}
                    </CFormSelect>
                  </td>
                </tr>
                <tr>
                  <td style={{ textAlign: "center", width: "180px" }}>
                    Tiết 9
                  </td>
                  <td>
                    <CFormSelect>
                      <option selected="selected">Môn học</option>
                      <option value={1} label="Toán"></option>
                      <option value={2} label="Vật lí"></option>
                      <option value={3} label="Hóa học"></option>
                      <option value={4} label="Văn học"></option>
                      <option value={5} label="Lịch sử"></option>
                      <option value={6} label="Địa lí"></option>
                      <option value={7} label="Sinh học"></option>
                      <option value={8} label="Tiếng anh"></option>
                      <option value={9} label="GDCD"></option>
                      <option value={10} label="Công nghệ"></option>
                      <option value={11} label="GDQPAN"></option>
                      <option value={12} label="Thể dục"></option>
                      <option value={13} label="Tin học"></option>
                    </CFormSelect>
                  </td>

                  <td>
                    <CFormSelect>
                      <option selected="selected">Giáo viên</option>
                      {listteacher.map((item) => (
                        <option
                          key={item.userId}
                          value={item.userId}
                          label={item.displayName}
                        ></option>
                      ))}
                    </CFormSelect>
                  </td>
                </tr>
                <tr>
                  <td style={{ textAlign: "center", width: "180px" }}>
                    Tiết 10
                  </td>
                  <td>
                    <CFormSelect>
                      <option selected="selected">Môn học</option>
                      <option value={1} label="Toán"></option>
                      <option value={2} label="Vật lí"></option>
                      <option value={3} label="Hóa học"></option>
                      <option value={4} label="Văn học"></option>
                      <option value={5} label="Lịch sử"></option>
                      <option value={6} label="Địa lí"></option>
                      <option value={7} label="Sinh học"></option>
                      <option value={8} label="Tiếng anh"></option>
                      <option value={9} label="GDCD"></option>
                      <option value={10} label="Công nghệ"></option>
                      <option value={11} label="GDQPAN"></option>
                      <option value={12} label="Thể dục"></option>
                      <option value={13} label="Tin học"></option>
                    </CFormSelect>
                  </td>

                  <td>
                    <CFormSelect>
                      <option selected="selected">Giáo viên</option>
                      {listteacher.map((item) => (
                        <option
                          key={item.userId}
                          value={item.userId}
                          label={item.displayName}
                        ></option>
                      ))}
                    </CFormSelect>
                  </td>
                </tr>
                <tr>
                  <td
                    style={{ textAlign: "center", width: "20%" }}
                    rowSpan={10}
                  >
                    Thứ 3
                  </td>
                  <td style={{ textAlign: "center", width: "10%" }}>Tiết 1</td>
                  <td style={{ textAlign: "center", width: "35%" }}>
                    <CFormSelect>
                      <option selected="selected">Môn học</option>
                      <option value={1} label="Toán"></option>
                      <option value={2} label="Vật lí"></option>
                      <option value={3} label="Hóa học"></option>
                      <option value={4} label="Văn học"></option>
                      <option value={5} label="Lịch sử"></option>
                      <option value={6} label="Địa lí"></option>
                      <option value={7} label="Sinh học"></option>
                      <option value={8} label="Tiếng anh"></option>
                      <option value={9} label="GDCD"></option>
                      <option value={10} label="Công nghệ"></option>
                      <option value={11} label="GDQPAN"></option>
                      <option value={12} label="Thể dục"></option>
                      <option value={13} label="Tin học"></option>
                    </CFormSelect>
                  </td>

                  <td style={{ textAlign: "center", width: "35%" }}>
                    <CFormSelect>
                      <option selected="selected">Giáo viên</option>
                      {listteacher.map((item) => (
                        <option
                          key={item.userId}
                          value={item.userId}
                          label={item.displayName}
                        ></option>
                      ))}
                    </CFormSelect>
                  </td>
                </tr>
                <tr>
                  <td style={{ textAlign: "center", width: "180px" }}>
                    Tiết 2
                  </td>
                  <td>
                    <CFormSelect>
                      <option selected="selected">Môn học</option>
                      <option value={1} label="Toán"></option>
                      <option value={2} label="Vật lí"></option>
                      <option value={3} label="Hóa học"></option>
                      <option value={4} label="Văn học"></option>
                      <option value={5} label="Lịch sử"></option>
                      <option value={6} label="Địa lí"></option>
                      <option value={7} label="Sinh học"></option>
                      <option value={8} label="Tiếng anh"></option>
                      <option value={9} label="GDCD"></option>
                      <option value={10} label="Công nghệ"></option>
                      <option value={11} label="GDQPAN"></option>
                      <option value={12} label="Thể dục"></option>
                      <option value={13} label="Tin học"></option>
                    </CFormSelect>
                  </td>

                  <td>
                    <CFormSelect>
                      <option selected="selected">Giáo viên</option>
                      {listteacher.map((item) => (
                        <option
                          key={item.userId}
                          value={item.userId}
                          label={item.displayName}
                        ></option>
                      ))}
                    </CFormSelect>
                  </td>
                </tr>
                <tr>
                  <td style={{ textAlign: "center", width: "180px" }}>
                    Tiết 3
                  </td>
                  <td>
                    <CFormSelect>
                      <option selected="selected">Môn học</option>
                      <option value={1} label="Toán"></option>
                      <option value={2} label="Vật lí"></option>
                      <option value={3} label="Hóa học"></option>
                      <option value={4} label="Văn học"></option>
                      <option value={5} label="Lịch sử"></option>
                      <option value={6} label="Địa lí"></option>
                      <option value={7} label="Sinh học"></option>
                      <option value={8} label="Tiếng anh"></option>
                      <option value={9} label="GDCD"></option>
                      <option value={10} label="Công nghệ"></option>
                      <option value={11} label="GDQPAN"></option>
                      <option value={12} label="Thể dục"></option>
                      <option value={13} label="Tin học"></option>
                    </CFormSelect>
                  </td>

                  <td>
                    <CFormSelect>
                      <option selected="selected">Giáo viên</option>
                      {listteacher.map((item) => (
                        <option
                          key={item.userId}
                          value={item.userId}
                          label={item.displayName}
                        ></option>
                      ))}
                    </CFormSelect>
                  </td>
                </tr>
                <tr>
                  <td style={{ textAlign: "center", width: "180px" }}>
                    Tiết 4
                  </td>
                  <td>
                    <CFormSelect>
                      <option selected="selected">Môn học</option>
                      <option value={1} label="Toán"></option>
                      <option value={2} label="Vật lí"></option>
                      <option value={3} label="Hóa học"></option>
                      <option value={4} label="Văn học"></option>
                      <option value={5} label="Lịch sử"></option>
                      <option value={6} label="Địa lí"></option>
                      <option value={7} label="Sinh học"></option>
                      <option value={8} label="Tiếng anh"></option>
                      <option value={9} label="GDCD"></option>
                      <option value={10} label="Công nghệ"></option>
                      <option value={11} label="GDQPAN"></option>
                      <option value={12} label="Thể dục"></option>
                      <option value={13} label="Tin học"></option>
                    </CFormSelect>
                  </td>

                  <td>
                    <CFormSelect>
                      <option selected="selected">Giáo viên</option>
                      {listteacher.map((item) => (
                        <option
                          key={item.userId}
                          value={item.userId}
                          label={item.displayName}
                        ></option>
                      ))}
                    </CFormSelect>
                  </td>
                </tr>
                <tr>
                  <td style={{ textAlign: "center", width: "180px" }}>
                    Tiết 5
                  </td>
                  <td>
                    <CFormSelect>
                      <option selected="selected">Môn học</option>
                      <option value={1} label="Toán"></option>
                      <option value={2} label="Vật lí"></option>
                      <option value={3} label="Hóa học"></option>
                      <option value={4} label="Văn học"></option>
                      <option value={5} label="Lịch sử"></option>
                      <option value={6} label="Địa lí"></option>
                      <option value={7} label="Sinh học"></option>
                      <option value={8} label="Tiếng anh"></option>
                      <option value={9} label="GDCD"></option>
                      <option value={10} label="Công nghệ"></option>
                      <option value={11} label="GDQPAN"></option>
                      <option value={12} label="Thể dục"></option>
                      <option value={13} label="Tin học"></option>
                    </CFormSelect>
                  </td>

                  <td>
                    <CFormSelect>
                      <option selected="selected">Giáo viên</option>
                      {listteacher.map((item) => (
                        <option
                          key={item.userId}
                          value={item.userId}
                          label={item.displayName}
                        ></option>
                      ))}
                    </CFormSelect>
                  </td>
                </tr>
                <tr>
                  <td style={{ textAlign: "center", width: "180px" }}>
                    Tiết 6
                  </td>
                  <td>
                    <CFormSelect>
                      <option selected="selected">Môn học</option>
                      <option value={1} label="Toán"></option>
                      <option value={2} label="Vật lí"></option>
                      <option value={3} label="Hóa học"></option>
                      <option value={4} label="Văn học"></option>
                      <option value={5} label="Lịch sử"></option>
                      <option value={6} label="Địa lí"></option>
                      <option value={7} label="Sinh học"></option>
                      <option value={8} label="Tiếng anh"></option>
                      <option value={9} label="GDCD"></option>
                      <option value={10} label="Công nghệ"></option>
                      <option value={11} label="GDQPAN"></option>
                      <option value={12} label="Thể dục"></option>
                      <option value={13} label="Tin học"></option>
                    </CFormSelect>
                  </td>

                  <td>
                    <CFormSelect>
                      <option selected="selected">Giáo viên</option>
                      {listteacher.map((item) => (
                        <option
                          key={item.userId}
                          value={item.userId}
                          label={item.displayName}
                        ></option>
                      ))}
                    </CFormSelect>
                  </td>
                </tr>
                <tr>
                  <td style={{ textAlign: "center", width: "180px" }}>
                    Tiết 7
                  </td>
                  <td>
                    <CFormSelect>
                      <option selected="selected">Môn học</option>
                      <option value={1} label="Toán"></option>
                      <option value={2} label="Vật lí"></option>
                      <option value={3} label="Hóa học"></option>
                      <option value={4} label="Văn học"></option>
                      <option value={5} label="Lịch sử"></option>
                      <option value={6} label="Địa lí"></option>
                      <option value={7} label="Sinh học"></option>
                      <option value={8} label="Tiếng anh"></option>
                      <option value={9} label="GDCD"></option>
                      <option value={10} label="Công nghệ"></option>
                      <option value={11} label="GDQPAN"></option>
                      <option value={12} label="Thể dục"></option>
                      <option value={13} label="Tin học"></option>
                    </CFormSelect>
                  </td>

                  <td>
                    <CFormSelect>
                      <option selected="selected">Giáo viên</option>
                      {listteacher.map((item) => (
                        <option
                          key={item.userId}
                          value={item.userId}
                          label={item.displayName}
                        ></option>
                      ))}
                    </CFormSelect>
                  </td>
                </tr>
                <tr>
                  <td style={{ textAlign: "center", width: "180px" }}>
                    Tiết 8
                  </td>
                  <td>
                    <CFormSelect>
                      <option selected="selected">Môn học</option>
                      <option value={1} label="Toán"></option>
                      <option value={2} label="Vật lí"></option>
                      <option value={3} label="Hóa học"></option>
                      <option value={4} label="Văn học"></option>
                      <option value={5} label="Lịch sử"></option>
                      <option value={6} label="Địa lí"></option>
                      <option value={7} label="Sinh học"></option>
                      <option value={8} label="Tiếng anh"></option>
                      <option value={9} label="GDCD"></option>
                      <option value={10} label="Công nghệ"></option>
                      <option value={11} label="GDQPAN"></option>
                      <option value={12} label="Thể dục"></option>
                      <option value={13} label="Tin học"></option>
                    </CFormSelect>
                  </td>

                  <td>
                    <CFormSelect>
                      <option selected="selected">Giáo viên</option>
                      {listteacher.map((item) => (
                        <option
                          key={item.userId}
                          value={item.userId}
                          label={item.displayName}
                        ></option>
                      ))}
                    </CFormSelect>
                  </td>
                </tr>
                <tr>
                  <td style={{ textAlign: "center", width: "180px" }}>
                    Tiết 9
                  </td>
                  <td>
                    <CFormSelect>
                      <option selected="selected">Môn học</option>
                      <option value={1} label="Toán"></option>
                      <option value={2} label="Vật lí"></option>
                      <option value={3} label="Hóa học"></option>
                      <option value={4} label="Văn học"></option>
                      <option value={5} label="Lịch sử"></option>
                      <option value={6} label="Địa lí"></option>
                      <option value={7} label="Sinh học"></option>
                      <option value={8} label="Tiếng anh"></option>
                      <option value={9} label="GDCD"></option>
                      <option value={10} label="Công nghệ"></option>
                      <option value={11} label="GDQPAN"></option>
                      <option value={12} label="Thể dục"></option>
                      <option value={13} label="Tin học"></option>
                    </CFormSelect>
                  </td>

                  <td>
                    <CFormSelect>
                      <option selected="selected">Giáo viên</option>
                      {listteacher.map((item) => (
                        <option
                          key={item.userId}
                          value={item.userId}
                          label={item.displayName}
                        ></option>
                      ))}
                    </CFormSelect>
                  </td>
                </tr>
                <tr>
                  <td style={{ textAlign: "center", width: "180px" }}>
                    Tiết 10
                  </td>
                  <td>
                    <CFormSelect>
                      <option selected="selected">Môn học</option>
                      <option value={1} label="Toán"></option>
                      <option value={2} label="Vật lí"></option>
                      <option value={3} label="Hóa học"></option>
                      <option value={4} label="Văn học"></option>
                      <option value={5} label="Lịch sử"></option>
                      <option value={6} label="Địa lí"></option>
                      <option value={7} label="Sinh học"></option>
                      <option value={8} label="Tiếng anh"></option>
                      <option value={9} label="GDCD"></option>
                      <option value={10} label="Công nghệ"></option>
                      <option value={11} label="GDQPAN"></option>
                      <option value={12} label="Thể dục"></option>
                      <option value={13} label="Tin học"></option>
                    </CFormSelect>
                  </td>

                  <td>
                    <CFormSelect>
                      <option selected="selected">Giáo viên</option>
                      {listteacher.map((item) => (
                        <option
                          key={item.userId}
                          value={item.userId}
                          label={item.displayName}
                        ></option>
                      ))}
                    </CFormSelect>
                  </td>
                </tr>
                <tr>
                  <td
                    style={{ textAlign: "center", width: "20%" }}
                    rowSpan={10}
                  >
                    Thứ 4
                  </td>
                  <td style={{ textAlign: "center", width: "10%" }}>Tiết 1</td>
                  <td style={{ textAlign: "center", width: "35%" }}>
                    <CFormSelect>
                      <option selected="selected">Môn học</option>
                      <option value={1} label="Toán"></option>
                      <option value={2} label="Vật lí"></option>
                      <option value={3} label="Hóa học"></option>
                      <option value={4} label="Văn học"></option>
                      <option value={5} label="Lịch sử"></option>
                      <option value={6} label="Địa lí"></option>
                      <option value={7} label="Sinh học"></option>
                      <option value={8} label="Tiếng anh"></option>
                      <option value={9} label="GDCD"></option>
                      <option value={10} label="Công nghệ"></option>
                      <option value={11} label="GDQPAN"></option>
                      <option value={12} label="Thể dục"></option>
                      <option value={13} label="Tin học"></option>
                    </CFormSelect>
                  </td>

                  <td style={{ textAlign: "center", width: "35%" }}>
                    <CFormSelect>
                      <option selected="selected">Giáo viên</option>
                      {listteacher.map((item) => (
                        <option
                          key={item.userId}
                          value={item.userId}
                          label={item.displayName}
                        ></option>
                      ))}
                    </CFormSelect>
                  </td>
                </tr>
                <tr>
                  <td style={{ textAlign: "center", width: "180px" }}>
                    Tiết 2
                  </td>
                  <td>
                    <CFormSelect>
                      <option selected="selected">Môn học</option>
                      <option value={1} label="Toán"></option>
                      <option value={2} label="Vật lí"></option>
                      <option value={3} label="Hóa học"></option>
                      <option value={4} label="Văn học"></option>
                      <option value={5} label="Lịch sử"></option>
                      <option value={6} label="Địa lí"></option>
                      <option value={7} label="Sinh học"></option>
                      <option value={8} label="Tiếng anh"></option>
                      <option value={9} label="GDCD"></option>
                      <option value={10} label="Công nghệ"></option>
                      <option value={11} label="GDQPAN"></option>
                      <option value={12} label="Thể dục"></option>
                      <option value={13} label="Tin học"></option>
                    </CFormSelect>
                  </td>

                  <td>
                    <CFormSelect>
                      <option selected="selected">Giáo viên</option>
                      {listteacher.map((item) => (
                        <option
                          key={item.userId}
                          value={item.userId}
                          label={item.displayName}
                        ></option>
                      ))}
                    </CFormSelect>
                  </td>
                </tr>
                <tr>
                  <td style={{ textAlign: "center", width: "180px" }}>
                    Tiết 3
                  </td>
                  <td>
                    <CFormSelect>
                      <option selected="selected">Môn học</option>
                      <option value={1} label="Toán"></option>
                      <option value={2} label="Vật lí"></option>
                      <option value={3} label="Hóa học"></option>
                      <option value={4} label="Văn học"></option>
                      <option value={5} label="Lịch sử"></option>
                      <option value={6} label="Địa lí"></option>
                      <option value={7} label="Sinh học"></option>
                      <option value={8} label="Tiếng anh"></option>
                      <option value={9} label="GDCD"></option>
                      <option value={10} label="Công nghệ"></option>
                      <option value={11} label="GDQPAN"></option>
                      <option value={12} label="Thể dục"></option>
                      <option value={13} label="Tin học"></option>
                    </CFormSelect>
                  </td>

                  <td>
                    <CFormSelect>
                      <option selected="selected">Giáo viên</option>
                      {listteacher.map((item) => (
                        <option
                          key={item.userId}
                          value={item.userId}
                          label={item.displayName}
                        ></option>
                      ))}
                    </CFormSelect>
                  </td>
                </tr>
                <tr>
                  <td style={{ textAlign: "center", width: "180px" }}>
                    Tiết 4
                  </td>
                  <td>
                    <CFormSelect>
                      <option selected="selected">Môn học</option>
                      <option value={1} label="Toán"></option>
                      <option value={2} label="Vật lí"></option>
                      <option value={3} label="Hóa học"></option>
                      <option value={4} label="Văn học"></option>
                      <option value={5} label="Lịch sử"></option>
                      <option value={6} label="Địa lí"></option>
                      <option value={7} label="Sinh học"></option>
                      <option value={8} label="Tiếng anh"></option>
                      <option value={9} label="GDCD"></option>
                      <option value={10} label="Công nghệ"></option>
                      <option value={11} label="GDQPAN"></option>
                      <option value={12} label="Thể dục"></option>
                      <option value={13} label="Tin học"></option>
                    </CFormSelect>
                  </td>

                  <td>
                    <CFormSelect>
                      <option selected="selected">Giáo viên</option>
                      {listteacher.map((item) => (
                        <option
                          key={item.userId}
                          value={item.userId}
                          label={item.displayName}
                        ></option>
                      ))}
                    </CFormSelect>
                  </td>
                </tr>
                <tr>
                  <td style={{ textAlign: "center", width: "180px" }}>
                    Tiết 5
                  </td>
                  <td>
                    <CFormSelect>
                      <option selected="selected">Môn học</option>
                      <option value={1} label="Toán"></option>
                      <option value={2} label="Vật lí"></option>
                      <option value={3} label="Hóa học"></option>
                      <option value={4} label="Văn học"></option>
                      <option value={5} label="Lịch sử"></option>
                      <option value={6} label="Địa lí"></option>
                      <option value={7} label="Sinh học"></option>
                      <option value={8} label="Tiếng anh"></option>
                      <option value={9} label="GDCD"></option>
                      <option value={10} label="Công nghệ"></option>
                      <option value={11} label="GDQPAN"></option>
                      <option value={12} label="Thể dục"></option>
                      <option value={13} label="Tin học"></option>
                    </CFormSelect>
                  </td>

                  <td>
                    <CFormSelect>
                      <option selected="selected">Giáo viên</option>
                      {listteacher.map((item) => (
                        <option
                          key={item.userId}
                          value={item.userId}
                          label={item.displayName}
                        ></option>
                      ))}
                    </CFormSelect>
                  </td>
                </tr>
                <tr>
                  <td style={{ textAlign: "center", width: "180px" }}>
                    Tiết 6
                  </td>
                  <td>
                    <CFormSelect>
                      <option selected="selected">Môn học</option>
                      <option value={1} label="Toán"></option>
                      <option value={2} label="Vật lí"></option>
                      <option value={3} label="Hóa học"></option>
                      <option value={4} label="Văn học"></option>
                      <option value={5} label="Lịch sử"></option>
                      <option value={6} label="Địa lí"></option>
                      <option value={7} label="Sinh học"></option>
                      <option value={8} label="Tiếng anh"></option>
                      <option value={9} label="GDCD"></option>
                      <option value={10} label="Công nghệ"></option>
                      <option value={11} label="GDQPAN"></option>
                      <option value={12} label="Thể dục"></option>
                      <option value={13} label="Tin học"></option>
                    </CFormSelect>
                  </td>

                  <td>
                    <CFormSelect>
                      <option selected="selected">Giáo viên</option>
                      {listteacher.map((item) => (
                        <option
                          key={item.userId}
                          value={item.userId}
                          label={item.displayName}
                        ></option>
                      ))}
                    </CFormSelect>
                  </td>
                </tr>
                <tr>
                  <td style={{ textAlign: "center", width: "180px" }}>
                    Tiết 7
                  </td>
                  <td>
                    <CFormSelect>
                      <option selected="selected">Môn học</option>
                      <option value={1} label="Toán"></option>
                      <option value={2} label="Vật lí"></option>
                      <option value={3} label="Hóa học"></option>
                      <option value={4} label="Văn học"></option>
                      <option value={5} label="Lịch sử"></option>
                      <option value={6} label="Địa lí"></option>
                      <option value={7} label="Sinh học"></option>
                      <option value={8} label="Tiếng anh"></option>
                      <option value={9} label="GDCD"></option>
                      <option value={10} label="Công nghệ"></option>
                      <option value={11} label="GDQPAN"></option>
                      <option value={12} label="Thể dục"></option>
                      <option value={13} label="Tin học"></option>
                    </CFormSelect>
                  </td>

                  <td>
                    <CFormSelect>
                      <option selected="selected">Giáo viên</option>
                      {listteacher.map((item) => (
                        <option
                          key={item.userId}
                          value={item.userId}
                          label={item.displayName}
                        ></option>
                      ))}
                    </CFormSelect>
                  </td>
                </tr>
                <tr>
                  <td style={{ textAlign: "center", width: "180px" }}>
                    Tiết 8
                  </td>
                  <td>
                    <CFormSelect>
                      <option selected="selected">Môn học</option>
                      <option value={1} label="Toán"></option>
                      <option value={2} label="Vật lí"></option>
                      <option value={3} label="Hóa học"></option>
                      <option value={4} label="Văn học"></option>
                      <option value={5} label="Lịch sử"></option>
                      <option value={6} label="Địa lí"></option>
                      <option value={7} label="Sinh học"></option>
                      <option value={8} label="Tiếng anh"></option>
                      <option value={9} label="GDCD"></option>
                      <option value={10} label="Công nghệ"></option>
                      <option value={11} label="GDQPAN"></option>
                      <option value={12} label="Thể dục"></option>
                      <option value={13} label="Tin học"></option>
                    </CFormSelect>
                  </td>

                  <td>
                    <CFormSelect>
                      <option selected="selected">Giáo viên</option>
                      {listteacher.map((item) => (
                        <option
                          key={item.userId}
                          value={item.userId}
                          label={item.displayName}
                        ></option>
                      ))}
                    </CFormSelect>
                  </td>
                </tr>
                <tr>
                  <td style={{ textAlign: "center", width: "180px" }}>
                    Tiết 9
                  </td>
                  <td>
                    <CFormSelect>
                      <option selected="selected">Môn học</option>
                      <option value={1} label="Toán"></option>
                      <option value={2} label="Vật lí"></option>
                      <option value={3} label="Hóa học"></option>
                      <option value={4} label="Văn học"></option>
                      <option value={5} label="Lịch sử"></option>
                      <option value={6} label="Địa lí"></option>
                      <option value={7} label="Sinh học"></option>
                      <option value={8} label="Tiếng anh"></option>
                      <option value={9} label="GDCD"></option>
                      <option value={10} label="Công nghệ"></option>
                      <option value={11} label="GDQPAN"></option>
                      <option value={12} label="Thể dục"></option>
                      <option value={13} label="Tin học"></option>
                    </CFormSelect>
                  </td>

                  <td>
                    <CFormSelect>
                      <option selected="selected">Giáo viên</option>
                      {listteacher.map((item) => (
                        <option
                          key={item.userId}
                          value={item.userId}
                          label={item.displayName}
                        ></option>
                      ))}
                    </CFormSelect>
                  </td>
                </tr>
                <tr>
                  <td style={{ textAlign: "center", width: "180px" }}>
                    Tiết 10
                  </td>
                  <td>
                    <CFormSelect>
                      <option selected="selected">Môn học</option>
                      <option value={1} label="Toán"></option>
                      <option value={2} label="Vật lí"></option>
                      <option value={3} label="Hóa học"></option>
                      <option value={4} label="Văn học"></option>
                      <option value={5} label="Lịch sử"></option>
                      <option value={6} label="Địa lí"></option>
                      <option value={7} label="Sinh học"></option>
                      <option value={8} label="Tiếng anh"></option>
                      <option value={9} label="GDCD"></option>
                      <option value={10} label="Công nghệ"></option>
                      <option value={11} label="GDQPAN"></option>
                      <option value={12} label="Thể dục"></option>
                      <option value={13} label="Tin học"></option>
                    </CFormSelect>
                  </td>

                  <td>
                    <CFormSelect>
                      <option selected="selected">Giáo viên</option>
                      {listteacher.map((item) => (
                        <option
                          key={item.userId}
                          value={item.userId}
                          label={item.displayName}
                        ></option>
                      ))}
                    </CFormSelect>
                  </td>
                </tr>
                <tr>
                  <td
                    style={{ textAlign: "center", width: "20%" }}
                    rowSpan={10}
                  >
                    Thứ 5
                  </td>
                  <td style={{ textAlign: "center", width: "10%" }}>Tiết 1</td>
                  <td style={{ textAlign: "center", width: "35%" }}>
                    <CFormSelect>
                      <option selected="selected">Môn học</option>
                      <option value={1} label="Toán"></option>
                      <option value={2} label="Vật lí"></option>
                      <option value={3} label="Hóa học"></option>
                      <option value={4} label="Văn học"></option>
                      <option value={5} label="Lịch sử"></option>
                      <option value={6} label="Địa lí"></option>
                      <option value={7} label="Sinh học"></option>
                      <option value={8} label="Tiếng anh"></option>
                      <option value={9} label="GDCD"></option>
                      <option value={10} label="Công nghệ"></option>
                      <option value={11} label="GDQPAN"></option>
                      <option value={12} label="Thể dục"></option>
                      <option value={13} label="Tin học"></option>
                    </CFormSelect>
                  </td>

                  <td style={{ textAlign: "center", width: "35%" }}>
                    <CFormSelect>
                      <option selected="selected">Giáo viên</option>
                      {listteacher.map((item) => (
                        <option
                          key={item.userId}
                          value={item.userId}
                          label={item.displayName}
                        ></option>
                      ))}
                    </CFormSelect>
                  </td>
                </tr>
                <tr>
                  <td style={{ textAlign: "center", width: "180px" }}>
                    Tiết 2
                  </td>
                  <td>
                    <CFormSelect>
                      <option selected="selected">Môn học</option>
                      <option value={1} label="Toán"></option>
                      <option value={2} label="Vật lí"></option>
                      <option value={3} label="Hóa học"></option>
                      <option value={4} label="Văn học"></option>
                      <option value={5} label="Lịch sử"></option>
                      <option value={6} label="Địa lí"></option>
                      <option value={7} label="Sinh học"></option>
                      <option value={8} label="Tiếng anh"></option>
                      <option value={9} label="GDCD"></option>
                      <option value={10} label="Công nghệ"></option>
                      <option value={11} label="GDQPAN"></option>
                      <option value={12} label="Thể dục"></option>
                      <option value={13} label="Tin học"></option>
                    </CFormSelect>
                  </td>

                  <td>
                    <CFormSelect>
                      <option selected="selected">Giáo viên</option>
                      {listteacher.map((item) => (
                        <option
                          key={item.userId}
                          value={item.userId}
                          label={item.displayName}
                        ></option>
                      ))}
                    </CFormSelect>
                  </td>
                </tr>
                <tr>
                  <td style={{ textAlign: "center", width: "180px" }}>
                    Tiết 3
                  </td>
                  <td>
                    <CFormSelect>
                      <option selected="selected">Môn học</option>
                      <option value={1} label="Toán"></option>
                      <option value={2} label="Vật lí"></option>
                      <option value={3} label="Hóa học"></option>
                      <option value={4} label="Văn học"></option>
                      <option value={5} label="Lịch sử"></option>
                      <option value={6} label="Địa lí"></option>
                      <option value={7} label="Sinh học"></option>
                      <option value={8} label="Tiếng anh"></option>
                      <option value={9} label="GDCD"></option>
                      <option value={10} label="Công nghệ"></option>
                      <option value={11} label="GDQPAN"></option>
                      <option value={12} label="Thể dục"></option>
                      <option value={13} label="Tin học"></option>
                    </CFormSelect>
                  </td>

                  <td>
                    <CFormSelect>
                      <option selected="selected">Giáo viên</option>
                      {listteacher.map((item) => (
                        <option
                          key={item.userId}
                          value={item.userId}
                          label={item.displayName}
                        ></option>
                      ))}
                    </CFormSelect>
                  </td>
                </tr>
                <tr>
                  <td style={{ textAlign: "center", width: "180px" }}>
                    Tiết 4
                  </td>
                  <td>
                    <CFormSelect>
                      <option selected="selected">Môn học</option>
                      <option value={1} label="Toán"></option>
                      <option value={2} label="Vật lí"></option>
                      <option value={3} label="Hóa học"></option>
                      <option value={4} label="Văn học"></option>
                      <option value={5} label="Lịch sử"></option>
                      <option value={6} label="Địa lí"></option>
                      <option value={7} label="Sinh học"></option>
                      <option value={8} label="Tiếng anh"></option>
                      <option value={9} label="GDCD"></option>
                      <option value={10} label="Công nghệ"></option>
                      <option value={11} label="GDQPAN"></option>
                      <option value={12} label="Thể dục"></option>
                      <option value={13} label="Tin học"></option>
                    </CFormSelect>
                  </td>

                  <td>
                    <CFormSelect>
                      <option selected="selected">Giáo viên</option>
                      {listteacher.map((item) => (
                        <option
                          key={item.userId}
                          value={item.userId}
                          label={item.displayName}
                        ></option>
                      ))}
                    </CFormSelect>
                  </td>
                </tr>
                <tr>
                  <td style={{ textAlign: "center", width: "180px" }}>
                    Tiết 5
                  </td>
                  <td>
                    <CFormSelect>
                      <option selected="selected">Môn học</option>
                      <option value={1} label="Toán"></option>
                      <option value={2} label="Vật lí"></option>
                      <option value={3} label="Hóa học"></option>
                      <option value={4} label="Văn học"></option>
                      <option value={5} label="Lịch sử"></option>
                      <option value={6} label="Địa lí"></option>
                      <option value={7} label="Sinh học"></option>
                      <option value={8} label="Tiếng anh"></option>
                      <option value={9} label="GDCD"></option>
                      <option value={10} label="Công nghệ"></option>
                      <option value={11} label="GDQPAN"></option>
                      <option value={12} label="Thể dục"></option>
                      <option value={13} label="Tin học"></option>
                    </CFormSelect>
                  </td>

                  <td>
                    <CFormSelect>
                      <option selected="selected">Giáo viên</option>
                      {listteacher.map((item) => (
                        <option
                          key={item.userId}
                          value={item.userId}
                          label={item.displayName}
                        ></option>
                      ))}
                    </CFormSelect>
                  </td>
                </tr>
                <tr>
                  <td style={{ textAlign: "center", width: "180px" }}>
                    Tiết 6
                  </td>
                  <td>
                    <CFormSelect>
                      <option selected="selected">Môn học</option>
                      <option value={1} label="Toán"></option>
                      <option value={2} label="Vật lí"></option>
                      <option value={3} label="Hóa học"></option>
                      <option value={4} label="Văn học"></option>
                      <option value={5} label="Lịch sử"></option>
                      <option value={6} label="Địa lí"></option>
                      <option value={7} label="Sinh học"></option>
                      <option value={8} label="Tiếng anh"></option>
                      <option value={9} label="GDCD"></option>
                      <option value={10} label="Công nghệ"></option>
                      <option value={11} label="GDQPAN"></option>
                      <option value={12} label="Thể dục"></option>
                      <option value={13} label="Tin học"></option>
                    </CFormSelect>
                  </td>

                  <td>
                    <CFormSelect>
                      <option selected="selected">Giáo viên</option>
                      {listteacher.map((item) => (
                        <option
                          key={item.userId}
                          value={item.userId}
                          label={item.displayName}
                        ></option>
                      ))}
                    </CFormSelect>
                  </td>
                </tr>
                <tr>
                  <td style={{ textAlign: "center", width: "180px" }}>
                    Tiết 7
                  </td>
                  <td>
                    <CFormSelect>
                      <option selected="selected">Môn học</option>
                      <option value={1} label="Toán"></option>
                      <option value={2} label="Vật lí"></option>
                      <option value={3} label="Hóa học"></option>
                      <option value={4} label="Văn học"></option>
                      <option value={5} label="Lịch sử"></option>
                      <option value={6} label="Địa lí"></option>
                      <option value={7} label="Sinh học"></option>
                      <option value={8} label="Tiếng anh"></option>
                      <option value={9} label="GDCD"></option>
                      <option value={10} label="Công nghệ"></option>
                      <option value={11} label="GDQPAN"></option>
                      <option value={12} label="Thể dục"></option>
                      <option value={13} label="Tin học"></option>
                    </CFormSelect>
                  </td>

                  <td>
                    <CFormSelect>
                      <option selected="selected">Giáo viên</option>
                      {listteacher.map((item) => (
                        <option
                          key={item.userId}
                          value={item.userId}
                          label={item.displayName}
                        ></option>
                      ))}
                    </CFormSelect>
                  </td>
                </tr>
                <tr>
                  <td style={{ textAlign: "center", width: "180px" }}>
                    Tiết 8
                  </td>
                  <td>
                    <CFormSelect>
                      <option selected="selected">Môn học</option>
                      <option value={1} label="Toán"></option>
                      <option value={2} label="Vật lí"></option>
                      <option value={3} label="Hóa học"></option>
                      <option value={4} label="Văn học"></option>
                      <option value={5} label="Lịch sử"></option>
                      <option value={6} label="Địa lí"></option>
                      <option value={7} label="Sinh học"></option>
                      <option value={8} label="Tiếng anh"></option>
                      <option value={9} label="GDCD"></option>
                      <option value={10} label="Công nghệ"></option>
                      <option value={11} label="GDQPAN"></option>
                      <option value={12} label="Thể dục"></option>
                      <option value={13} label="Tin học"></option>
                    </CFormSelect>
                  </td>

                  <td>
                    <CFormSelect>
                      <option selected="selected">Giáo viên</option>
                      {listteacher.map((item) => (
                        <option
                          key={item.userId}
                          value={item.userId}
                          label={item.displayName}
                        ></option>
                      ))}
                    </CFormSelect>
                  </td>
                </tr>
                <tr>
                  <td style={{ textAlign: "center", width: "180px" }}>
                    Tiết 9
                  </td>
                  <td>
                    <CFormSelect>
                      <option selected="selected">Môn học</option>
                      <option value={1} label="Toán"></option>
                      <option value={2} label="Vật lí"></option>
                      <option value={3} label="Hóa học"></option>
                      <option value={4} label="Văn học"></option>
                      <option value={5} label="Lịch sử"></option>
                      <option value={6} label="Địa lí"></option>
                      <option value={7} label="Sinh học"></option>
                      <option value={8} label="Tiếng anh"></option>
                      <option value={9} label="GDCD"></option>
                      <option value={10} label="Công nghệ"></option>
                      <option value={11} label="GDQPAN"></option>
                      <option value={12} label="Thể dục"></option>
                      <option value={13} label="Tin học"></option>
                    </CFormSelect>
                  </td>

                  <td>
                    <CFormSelect>
                      <option selected="selected">Giáo viên</option>
                      {listteacher.map((item) => (
                        <option
                          key={item.userId}
                          value={item.userId}
                          label={item.displayName}
                        ></option>
                      ))}
                    </CFormSelect>
                  </td>
                </tr>
                <tr>
                  <td style={{ textAlign: "center", width: "180px" }}>
                    Tiết 10
                  </td>
                  <td>
                    <CFormSelect>
                      <option selected="selected">Môn học</option>
                      <option value={1} label="Toán"></option>
                      <option value={2} label="Vật lí"></option>
                      <option value={3} label="Hóa học"></option>
                      <option value={4} label="Văn học"></option>
                      <option value={5} label="Lịch sử"></option>
                      <option value={6} label="Địa lí"></option>
                      <option value={7} label="Sinh học"></option>
                      <option value={8} label="Tiếng anh"></option>
                      <option value={9} label="GDCD"></option>
                      <option value={10} label="Công nghệ"></option>
                      <option value={11} label="GDQPAN"></option>
                      <option value={12} label="Thể dục"></option>
                      <option value={13} label="Tin học"></option>
                    </CFormSelect>
                  </td>

                  <td>
                    <CFormSelect>
                      <option selected="selected">Giáo viên</option>
                      {listteacher.map((item) => (
                        <option
                          key={item.userId}
                          value={item.userId}
                          label={item.displayName}
                        ></option>
                      ))}
                    </CFormSelect>
                  </td>
                </tr>
                <tr>
                  <td
                    style={{ textAlign: "center", width: "20%" }}
                    rowSpan={10}
                  >
                    Thứ 6
                  </td>
                  <td style={{ textAlign: "center", width: "10%" }}>Tiết 1</td>
                  <td style={{ textAlign: "center", width: "35%" }}>
                    <CFormSelect>
                      <option selected="selected">Môn học</option>
                      <option value={1} label="Toán"></option>
                      <option value={2} label="Vật lí"></option>
                      <option value={3} label="Hóa học"></option>
                      <option value={4} label="Văn học"></option>
                      <option value={5} label="Lịch sử"></option>
                      <option value={6} label="Địa lí"></option>
                      <option value={7} label="Sinh học"></option>
                      <option value={8} label="Tiếng anh"></option>
                      <option value={9} label="GDCD"></option>
                      <option value={10} label="Công nghệ"></option>
                      <option value={11} label="GDQPAN"></option>
                      <option value={12} label="Thể dục"></option>
                      <option value={13} label="Tin học"></option>
                    </CFormSelect>
                  </td>

                  <td style={{ textAlign: "center", width: "35%" }}>
                    <CFormSelect>
                      <option selected="selected">Giáo viên</option>
                      {listteacher.map((item) => (
                        <option
                          key={item.userId}
                          value={item.userId}
                          label={item.displayName}
                        ></option>
                      ))}
                    </CFormSelect>
                  </td>
                </tr>
                <tr>
                  <td style={{ textAlign: "center", width: "180px" }}>
                    Tiết 2
                  </td>
                  <td>
                    <CFormSelect>
                      <option selected="selected">Môn học</option>
                      <option value={1} label="Toán"></option>
                      <option value={2} label="Vật lí"></option>
                      <option value={3} label="Hóa học"></option>
                      <option value={4} label="Văn học"></option>
                      <option value={5} label="Lịch sử"></option>
                      <option value={6} label="Địa lí"></option>
                      <option value={7} label="Sinh học"></option>
                      <option value={8} label="Tiếng anh"></option>
                      <option value={9} label="GDCD"></option>
                      <option value={10} label="Công nghệ"></option>
                      <option value={11} label="GDQPAN"></option>
                      <option value={12} label="Thể dục"></option>
                      <option value={13} label="Tin học"></option>
                    </CFormSelect>
                  </td>

                  <td>
                    <CFormSelect>
                      <option selected="selected">Giáo viên</option>
                      {listteacher.map((item) => (
                        <option
                          key={item.userId}
                          value={item.userId}
                          label={item.displayName}
                        ></option>
                      ))}
                    </CFormSelect>
                  </td>
                </tr>
                <tr>
                  <td style={{ textAlign: "center", width: "180px" }}>
                    Tiết 3
                  </td>
                  <td>
                    <CFormSelect>
                      <option selected="selected">Môn học</option>
                      <option value={1} label="Toán"></option>
                      <option value={2} label="Vật lí"></option>
                      <option value={3} label="Hóa học"></option>
                      <option value={4} label="Văn học"></option>
                      <option value={5} label="Lịch sử"></option>
                      <option value={6} label="Địa lí"></option>
                      <option value={7} label="Sinh học"></option>
                      <option value={8} label="Tiếng anh"></option>
                      <option value={9} label="GDCD"></option>
                      <option value={10} label="Công nghệ"></option>
                      <option value={11} label="GDQPAN"></option>
                      <option value={12} label="Thể dục"></option>
                      <option value={13} label="Tin học"></option>
                    </CFormSelect>
                  </td>

                  <td>
                    <CFormSelect>
                      <option selected="selected">Giáo viên</option>
                      {listteacher.map((item) => (
                        <option
                          key={item.userId}
                          value={item.userId}
                          label={item.displayName}
                        ></option>
                      ))}
                    </CFormSelect>
                  </td>
                </tr>
                <tr>
                  <td style={{ textAlign: "center", width: "180px" }}>
                    Tiết 4
                  </td>
                  <td>
                    <CFormSelect>
                      <option selected="selected">Môn học</option>
                      <option value={1} label="Toán"></option>
                      <option value={2} label="Vật lí"></option>
                      <option value={3} label="Hóa học"></option>
                      <option value={4} label="Văn học"></option>
                      <option value={5} label="Lịch sử"></option>
                      <option value={6} label="Địa lí"></option>
                      <option value={7} label="Sinh học"></option>
                      <option value={8} label="Tiếng anh"></option>
                      <option value={9} label="GDCD"></option>
                      <option value={10} label="Công nghệ"></option>
                      <option value={11} label="GDQPAN"></option>
                      <option value={12} label="Thể dục"></option>
                      <option value={13} label="Tin học"></option>
                    </CFormSelect>
                  </td>

                  <td>
                    <CFormSelect>
                      <option selected="selected">Giáo viên</option>
                      {listteacher.map((item) => (
                        <option
                          key={item.userId}
                          value={item.userId}
                          label={item.displayName}
                        ></option>
                      ))}
                    </CFormSelect>
                  </td>
                </tr>
                <tr>
                  <td style={{ textAlign: "center", width: "180px" }}>
                    Tiết 5
                  </td>
                  <td>
                    <CFormSelect>
                      <option selected="selected">Môn học</option>
                      <option value={1} label="Toán"></option>
                      <option value={2} label="Vật lí"></option>
                      <option value={3} label="Hóa học"></option>
                      <option value={4} label="Văn học"></option>
                      <option value={5} label="Lịch sử"></option>
                      <option value={6} label="Địa lí"></option>
                      <option value={7} label="Sinh học"></option>
                      <option value={8} label="Tiếng anh"></option>
                      <option value={9} label="GDCD"></option>
                      <option value={10} label="Công nghệ"></option>
                      <option value={11} label="GDQPAN"></option>
                      <option value={12} label="Thể dục"></option>
                      <option value={13} label="Tin học"></option>
                    </CFormSelect>
                  </td>

                  <td>
                    <CFormSelect>
                      <option selected="selected">Giáo viên</option>
                      {listteacher.map((item) => (
                        <option
                          key={item.userId}
                          value={item.userId}
                          label={item.displayName}
                        ></option>
                      ))}
                    </CFormSelect>
                  </td>
                </tr>
                <tr>
                  <td style={{ textAlign: "center", width: "180px" }}>
                    Tiết 6
                  </td>
                  <td>
                    <CFormSelect>
                      <option selected="selected">Môn học</option>
                      <option value={1} label="Toán"></option>
                      <option value={2} label="Vật lí"></option>
                      <option value={3} label="Hóa học"></option>
                      <option value={4} label="Văn học"></option>
                      <option value={5} label="Lịch sử"></option>
                      <option value={6} label="Địa lí"></option>
                      <option value={7} label="Sinh học"></option>
                      <option value={8} label="Tiếng anh"></option>
                      <option value={9} label="GDCD"></option>
                      <option value={10} label="Công nghệ"></option>
                      <option value={11} label="GDQPAN"></option>
                      <option value={12} label="Thể dục"></option>
                      <option value={13} label="Tin học"></option>
                    </CFormSelect>
                  </td>

                  <td>
                    <CFormSelect>
                      <option selected="selected">Giáo viên</option>
                      {listteacher.map((item) => (
                        <option
                          key={item.userId}
                          value={item.userId}
                          label={item.displayName}
                        ></option>
                      ))}
                    </CFormSelect>
                  </td>
                </tr>
                <tr>
                  <td style={{ textAlign: "center", width: "180px" }}>
                    Tiết 7
                  </td>
                  <td>
                    <CFormSelect>
                      <option selected="selected">Môn học</option>
                      <option value={1} label="Toán"></option>
                      <option value={2} label="Vật lí"></option>
                      <option value={3} label="Hóa học"></option>
                      <option value={4} label="Văn học"></option>
                      <option value={5} label="Lịch sử"></option>
                      <option value={6} label="Địa lí"></option>
                      <option value={7} label="Sinh học"></option>
                      <option value={8} label="Tiếng anh"></option>
                      <option value={9} label="GDCD"></option>
                      <option value={10} label="Công nghệ"></option>
                      <option value={11} label="GDQPAN"></option>
                      <option value={12} label="Thể dục"></option>
                      <option value={13} label="Tin học"></option>
                    </CFormSelect>
                  </td>

                  <td>
                    <CFormSelect>
                      <option selected="selected">Giáo viên</option>
                      {listteacher.map((item) => (
                        <option
                          key={item.userId}
                          value={item.userId}
                          label={item.displayName}
                        ></option>
                      ))}
                    </CFormSelect>
                  </td>
                </tr>
                <tr>
                  <td style={{ textAlign: "center", width: "180px" }}>
                    Tiết 8
                  </td>
                  <td>
                    <CFormSelect>
                      <option selected="selected">Môn học</option>
                      <option value={1} label="Toán"></option>
                      <option value={2} label="Vật lí"></option>
                      <option value={3} label="Hóa học"></option>
                      <option value={4} label="Văn học"></option>
                      <option value={5} label="Lịch sử"></option>
                      <option value={6} label="Địa lí"></option>
                      <option value={7} label="Sinh học"></option>
                      <option value={8} label="Tiếng anh"></option>
                      <option value={9} label="GDCD"></option>
                      <option value={10} label="Công nghệ"></option>
                      <option value={11} label="GDQPAN"></option>
                      <option value={12} label="Thể dục"></option>
                      <option value={13} label="Tin học"></option>
                    </CFormSelect>
                  </td>

                  <td>
                    <CFormSelect>
                      <option selected="selected">Giáo viên</option>
                      {listteacher.map((item) => (
                        <option
                          key={item.userId}
                          value={item.userId}
                          label={item.displayName}
                        ></option>
                      ))}
                    </CFormSelect>
                  </td>
                </tr>
                <tr>
                  <td style={{ textAlign: "center", width: "180px" }}>
                    Tiết 9
                  </td>
                  <td>
                    <CFormSelect>
                      <option selected="selected">Môn học</option>
                      <option value={1} label="Toán"></option>
                      <option value={2} label="Vật lí"></option>
                      <option value={3} label="Hóa học"></option>
                      <option value={4} label="Văn học"></option>
                      <option value={5} label="Lịch sử"></option>
                      <option value={6} label="Địa lí"></option>
                      <option value={7} label="Sinh học"></option>
                      <option value={8} label="Tiếng anh"></option>
                      <option value={9} label="GDCD"></option>
                      <option value={10} label="Công nghệ"></option>
                      <option value={11} label="GDQPAN"></option>
                      <option value={12} label="Thể dục"></option>
                      <option value={13} label="Tin học"></option>
                    </CFormSelect>
                  </td>

                  <td>
                    <CFormSelect>
                      <option selected="selected">Giáo viên</option>
                      {listteacher.map((item) => (
                        <option
                          key={item.userId}
                          value={item.userId}
                          label={item.displayName}
                        ></option>
                      ))}
                    </CFormSelect>
                  </td>
                </tr>
                <tr>
                  <td style={{ textAlign: "center", width: "180px" }}>
                    Tiết 10
                  </td>
                  <td>
                    <CFormSelect>
                      <option selected="selected">Môn học</option>
                      <option value={1} label="Toán"></option>
                      <option value={2} label="Vật lí"></option>
                      <option value={3} label="Hóa học"></option>
                      <option value={4} label="Văn học"></option>
                      <option value={5} label="Lịch sử"></option>
                      <option value={6} label="Địa lí"></option>
                      <option value={7} label="Sinh học"></option>
                      <option value={8} label="Tiếng anh"></option>
                      <option value={9} label="GDCD"></option>
                      <option value={10} label="Công nghệ"></option>
                      <option value={11} label="GDQPAN"></option>
                      <option value={12} label="Thể dục"></option>
                      <option value={13} label="Tin học"></option>
                    </CFormSelect>
                  </td>

                  <td>
                    <CFormSelect>
                      <option selected="selected">Giáo viên</option>
                      {listteacher.map((item) => (
                        <option
                          key={item.userId}
                          value={item.userId}
                          label={item.displayName}
                        ></option>
                      ))}
                    </CFormSelect>
                  </td>
                </tr>
                <tr>
                  <td
                    style={{ textAlign: "center", width: "20%" }}
                    rowSpan={10}
                  >
                    Thứ 7
                  </td>
                  <td style={{ textAlign: "center", width: "10%" }}>Tiết 1</td>
                  <td style={{ textAlign: "center", width: "35%" }}>
                    <CFormSelect>
                      <option selected="selected">Môn học</option>
                      <option value={1} label="Toán"></option>
                      <option value={2} label="Vật lí"></option>
                      <option value={3} label="Hóa học"></option>
                      <option value={4} label="Văn học"></option>
                      <option value={5} label="Lịch sử"></option>
                      <option value={6} label="Địa lí"></option>
                      <option value={7} label="Sinh học"></option>
                      <option value={8} label="Tiếng anh"></option>
                      <option value={9} label="GDCD"></option>
                      <option value={10} label="Công nghệ"></option>
                      <option value={11} label="GDQPAN"></option>
                      <option value={12} label="Thể dục"></option>
                      <option value={13} label="Tin học"></option>
                    </CFormSelect>
                  </td>

                  <td style={{ textAlign: "center", width: "35%" }}>
                    <CFormSelect>
                      <option selected="selected">Giáo viên</option>
                      {listteacher.map((item) => (
                        <option
                          key={item.userId}
                          value={item.userId}
                          label={item.displayName}
                        ></option>
                      ))}
                    </CFormSelect>
                  </td>
                </tr>
                <tr>
                  <td style={{ textAlign: "center", width: "180px" }}>
                    Tiết 2
                  </td>
                  <td>
                    <CFormSelect>
                      <option selected="selected">Môn học</option>
                      <option value={1} label="Toán"></option>
                      <option value={2} label="Vật lí"></option>
                      <option value={3} label="Hóa học"></option>
                      <option value={4} label="Văn học"></option>
                      <option value={5} label="Lịch sử"></option>
                      <option value={6} label="Địa lí"></option>
                      <option value={7} label="Sinh học"></option>
                      <option value={8} label="Tiếng anh"></option>
                      <option value={9} label="GDCD"></option>
                      <option value={10} label="Công nghệ"></option>
                      <option value={11} label="GDQPAN"></option>
                      <option value={12} label="Thể dục"></option>
                      <option value={13} label="Tin học"></option>
                    </CFormSelect>
                  </td>

                  <td>
                    <CFormSelect>
                      <option selected="selected">Giáo viên</option>
                      {listteacher.map((item) => (
                        <option
                          key={item.userId}
                          value={item.userId}
                          label={item.displayName}
                        ></option>
                      ))}
                    </CFormSelect>
                  </td>
                </tr>
                <tr>
                  <td style={{ textAlign: "center", width: "180px" }}>
                    Tiết 3
                  </td>
                  <td>
                    <CFormSelect>
                      <option selected="selected">Môn học</option>
                      <option value={1} label="Toán"></option>
                      <option value={2} label="Vật lí"></option>
                      <option value={3} label="Hóa học"></option>
                      <option value={4} label="Văn học"></option>
                      <option value={5} label="Lịch sử"></option>
                      <option value={6} label="Địa lí"></option>
                      <option value={7} label="Sinh học"></option>
                      <option value={8} label="Tiếng anh"></option>
                      <option value={9} label="GDCD"></option>
                      <option value={10} label="Công nghệ"></option>
                      <option value={11} label="GDQPAN"></option>
                      <option value={12} label="Thể dục"></option>
                      <option value={13} label="Tin học"></option>
                    </CFormSelect>
                  </td>

                  <td>
                    <CFormSelect>
                      <option selected="selected">Giáo viên</option>
                      {listteacher.map((item) => (
                        <option
                          key={item.userId}
                          value={item.userId}
                          label={item.displayName}
                        ></option>
                      ))}
                    </CFormSelect>
                  </td>
                </tr>
                <tr>
                  <td style={{ textAlign: "center", width: "180px" }}>
                    Tiết 4
                  </td>
                  <td>
                    <CFormSelect>
                      <option selected="selected">Môn học</option>
                      <option value={1} label="Toán"></option>
                      <option value={2} label="Vật lí"></option>
                      <option value={3} label="Hóa học"></option>
                      <option value={4} label="Văn học"></option>
                      <option value={5} label="Lịch sử"></option>
                      <option value={6} label="Địa lí"></option>
                      <option value={7} label="Sinh học"></option>
                      <option value={8} label="Tiếng anh"></option>
                      <option value={9} label="GDCD"></option>
                      <option value={10} label="Công nghệ"></option>
                      <option value={11} label="GDQPAN"></option>
                      <option value={12} label="Thể dục"></option>
                      <option value={13} label="Tin học"></option>
                    </CFormSelect>
                  </td>

                  <td>
                    <CFormSelect>
                      <option selected="selected">Giáo viên</option>
                      {listteacher.map((item) => (
                        <option
                          key={item.userId}
                          value={item.userId}
                          label={item.displayName}
                        ></option>
                      ))}
                    </CFormSelect>
                  </td>
                </tr>
                <tr>
                  <td style={{ textAlign: "center", width: "180px" }}>
                    Tiết 5
                  </td>
                  <td>
                    <CFormSelect>
                      <option selected="selected">Môn học</option>
                      <option value={1} label="Toán"></option>
                      <option value={2} label="Vật lí"></option>
                      <option value={3} label="Hóa học"></option>
                      <option value={4} label="Văn học"></option>
                      <option value={5} label="Lịch sử"></option>
                      <option value={6} label="Địa lí"></option>
                      <option value={7} label="Sinh học"></option>
                      <option value={8} label="Tiếng anh"></option>
                      <option value={9} label="GDCD"></option>
                      <option value={10} label="Công nghệ"></option>
                      <option value={11} label="GDQPAN"></option>
                      <option value={12} label="Thể dục"></option>
                      <option value={13} label="Tin học"></option>
                    </CFormSelect>
                  </td>

                  <td>
                    <CFormSelect>
                      <option selected="selected">Giáo viên</option>
                      {listteacher.map((item) => (
                        <option
                          key={item.userId}
                          value={item.userId}
                          label={item.displayName}
                        ></option>
                      ))}
                    </CFormSelect>
                  </td>
                </tr>
                <tr>
                  <td style={{ textAlign: "center", width: "180px" }}>
                    Tiết 6
                  </td>
                  <td>
                    <CFormSelect>
                      <option selected="selected">Môn học</option>
                      <option value={1} label="Toán"></option>
                      <option value={2} label="Vật lí"></option>
                      <option value={3} label="Hóa học"></option>
                      <option value={4} label="Văn học"></option>
                      <option value={5} label="Lịch sử"></option>
                      <option value={6} label="Địa lí"></option>
                      <option value={7} label="Sinh học"></option>
                      <option value={8} label="Tiếng anh"></option>
                      <option value={9} label="GDCD"></option>
                      <option value={10} label="Công nghệ"></option>
                      <option value={11} label="GDQPAN"></option>
                      <option value={12} label="Thể dục"></option>
                      <option value={13} label="Tin học"></option>
                    </CFormSelect>
                  </td>

                  <td>
                    <CFormSelect>
                      <option selected="selected">Giáo viên</option>
                      {listteacher.map((item) => (
                        <option
                          key={item.userId}
                          value={item.userId}
                          label={item.displayName}
                        ></option>
                      ))}
                    </CFormSelect>
                  </td>
                </tr>
                <tr>
                  <td style={{ textAlign: "center", width: "180px" }}>
                    Tiết 7
                  </td>
                  <td>
                    <CFormSelect>
                      <option selected="selected">Môn học</option>
                      <option value={1} label="Toán"></option>
                      <option value={2} label="Vật lí"></option>
                      <option value={3} label="Hóa học"></option>
                      <option value={4} label="Văn học"></option>
                      <option value={5} label="Lịch sử"></option>
                      <option value={6} label="Địa lí"></option>
                      <option value={7} label="Sinh học"></option>
                      <option value={8} label="Tiếng anh"></option>
                      <option value={9} label="GDCD"></option>
                      <option value={10} label="Công nghệ"></option>
                      <option value={11} label="GDQPAN"></option>
                      <option value={12} label="Thể dục"></option>
                      <option value={13} label="Tin học"></option>
                    </CFormSelect>
                  </td>

                  <td>
                    <CFormSelect>
                      <option selected="selected">Giáo viên</option>
                      {listteacher.map((item) => (
                        <option
                          key={item.userId}
                          value={item.userId}
                          label={item.displayName}
                        ></option>
                      ))}
                    </CFormSelect>
                  </td>
                </tr>
                <tr>
                  <td style={{ textAlign: "center", width: "180px" }}>
                    Tiết 8
                  </td>
                  <td>
                    <CFormSelect>
                      <option selected="selected">Môn học</option>
                      <option value={1} label="Toán"></option>
                      <option value={2} label="Vật lí"></option>
                      <option value={3} label="Hóa học"></option>
                      <option value={4} label="Văn học"></option>
                      <option value={5} label="Lịch sử"></option>
                      <option value={6} label="Địa lí"></option>
                      <option value={7} label="Sinh học"></option>
                      <option value={8} label="Tiếng anh"></option>
                      <option value={9} label="GDCD"></option>
                      <option value={10} label="Công nghệ"></option>
                      <option value={11} label="GDQPAN"></option>
                      <option value={12} label="Thể dục"></option>
                      <option value={13} label="Tin học"></option>
                    </CFormSelect>
                  </td>

                  <td>
                    <CFormSelect>
                      <option selected="selected">Giáo viên</option>
                      {listteacher.map((item) => (
                        <option
                          key={item.userId}
                          value={item.userId}
                          label={item.displayName}
                        ></option>
                      ))}
                    </CFormSelect>
                  </td>
                </tr>
                <tr>
                  <td style={{ textAlign: "center", width: "180px" }}>
                    Tiết 9
                  </td>
                  <td>
                    <CFormSelect>
                      <option selected="selected">Môn học</option>
                      <option value={1} label="Toán"></option>
                      <option value={2} label="Vật lí"></option>
                      <option value={3} label="Hóa học"></option>
                      <option value={4} label="Văn học"></option>
                      <option value={5} label="Lịch sử"></option>
                      <option value={6} label="Địa lí"></option>
                      <option value={7} label="Sinh học"></option>
                      <option value={8} label="Tiếng anh"></option>
                      <option value={9} label="GDCD"></option>
                      <option value={10} label="Công nghệ"></option>
                      <option value={11} label="GDQPAN"></option>
                      <option value={12} label="Thể dục"></option>
                      <option value={13} label="Tin học"></option>
                    </CFormSelect>
                  </td>

                  <td>
                    <CFormSelect>
                      <option selected="selected">Giáo viên</option>
                      {listteacher.map((item) => (
                        <option
                          key={item.userId}
                          value={item.userId}
                          label={item.displayName}
                        ></option>
                      ))}
                    </CFormSelect>
                  </td>
                </tr>
                <tr>
                  <td style={{ textAlign: "center", width: "180px" }}>
                    Tiết 10
                  </td>
                  <td>
                    <CFormSelect>
                      <option selected="selected">Môn học</option>
                      <option value={1} label="Toán"></option>
                      <option value={2} label="Vật lí"></option>
                      <option value={3} label="Hóa học"></option>
                      <option value={4} label="Văn học"></option>
                      <option value={5} label="Lịch sử"></option>
                      <option value={6} label="Địa lí"></option>
                      <option value={7} label="Sinh học"></option>
                      <option value={8} label="Tiếng anh"></option>
                      <option value={9} label="GDCD"></option>
                      <option value={10} label="Công nghệ"></option>
                      <option value={11} label="GDQPAN"></option>
                      <option value={12} label="Thể dục"></option>
                      <option value={13} label="Tin học"></option>
                    </CFormSelect>
                  </td>

                  <td>
                    <CFormSelect>
                      <option selected="selected">Giáo viên</option>
                      {listteacher.map((item) => (
                        <option
                          key={item.userId}
                          value={item.userId}
                          label={item.displayName}
                        ></option>
                      ))}
                    </CFormSelect>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="mt-5 text-center">
            <button className="btn btn-primary profile-button" type="button">
              Cập nhật
            </button>
          </div>
        </div>
        <br />
        <br />
      </div>
    </>
  );
};

export default Calendar;
