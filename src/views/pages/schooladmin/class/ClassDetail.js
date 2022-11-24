import React from "react";
import "../ChangePW.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import { CFormSelect } from "@coreui/react";

const ClassDetail = () => {
  const token = localStorage.getItem("access_token");
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  const [className, setclassName] = useState("");
  const [gradeId, setgradeId] = useState(0);
  const [isSpecializedClass, setisSpecializedClass] = useState(false);
  const [subject, setsubject] = useState("");
  const [listteacher, setlistTeacher] = useState([]);

  const { id } = useParams();
  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(`classes/${id}`);
        console.log({ data });
        setclassName(data.data.clazz);
        setgradeId(data.data.grade.gradeId);
        setisSpecializedClass(data.data.specializedClass);
        setsubject(data.data.subject);
        const res = await axios.get("teachers");
        setlistTeacher(res.data.data.items);
      } catch (e) {}
    })();
  }, []);

  const save = async (e) => {
    e.preventDefault();

    const { data } = await axios.put(`classes/${id}`, {
      className,
      gradeId,
      isSpecializedClass,
      subject,
    });
    alert("done.");
  };
  return (
    <>
      <div className="mainDiv">
        <div className="cardStyle">
          <div className="text-center">
            <h4>Thông tin lớp</h4>
          </div>
          <form onSubmit={save}>
            <div className="inputDiv">
              Tên lớp
              <input
                type="text"
                className="form-control"
                value={className}
                onChange={(e) => setclassName(e.target.value)}
              />
            </div>

            <div className="inputDiv">
              Khối
              <CFormSelect
                value={gradeId}
                onChange={(e) => setgradeId(e.target.value)}
              >
                <option value={1} label="10"></option>
                <option value={2} label="11"></option>
                <option value={3} label="12"></option>
              </CFormSelect>
            </div>

            <div className="inputDiv">
              Loại lớp
              <CFormSelect
                value={isSpecializedClass}
                onChange={(e) => setisSpecializedClass(e.target.value)}
              >
                <option value={true} label="Lớp chọn"></option>
                <option value={false} label="Lớp bình thường"></option>
              </CFormSelect>
            </div>
            <div className="inputDiv">
              Môn học
              <input
                type="text"
                className="form-control"
                value={subject}
                onChange={(e) => setsubject(e.target.value)}
              />
            </div>
            <div className="inputDiv">
              Giáo viên chủ nhiệm
              <CFormSelect>
                {listteacher.map((item) => (
                  <option value={item.userId} label={item.displayName}></option>
                ))}
              </CFormSelect>
            </div>

            <div className="buttonWrapper">
              <button
                type="submit"
                id="submitButton"
                className="submitButton pure-button pure-button-primary"
              >
                <span>Lưu thông tin</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ClassDetail;
