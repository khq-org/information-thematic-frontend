import React, { useMemo } from "react";
import axios from "axios";
import { useState, useEffect } from "react";

import { COLUMNS } from "./columns";
import "./table.css";

import {
  CModal,
  CButton,
  CModalHeader,
  CModalBody,
  CModalTitle,
  CFormSelect,
  CForm,
  CDropdown,
  CDropdownToggle,
  CDropdownMenu,
  CDropdownItem,
} from "@coreui/react";
import { Link } from "react-router-dom";
export const PaginationTable = () => {
  const columns = useMemo(() => COLUMNS, []);

  const token = localStorage.getItem("access_token");
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;


  const [visible, setVisible] = useState(false);
  const [schoolYearName, setSchoolYearName] = useState("");
  const [listclass, setlistclass] = useState([]);
  const [listyear, setlistyear] = useState([]);
  const [clazz, setclazz] = useState(1);
  const [schoolyear, setschoolyear] = useState(1);
  const [listTeacher, setlistTeacher] = useState([]);
  var newListClass = [];
  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get("schoolyear");
        console.log(data);
        setlistyear(data.data.items);
        const res = await axios.get("classes?schoolYearId=1");
        setlistclass(res.data.data.items);
        const data2 = await axios.get("teachers");
        // console.log({ data2 });
        setlistTeacher(data2.data.data.items);
        // console.log("listTeacher", data2.data.items);
        console.log("newListClass");
        const len = res.data.data.items.length;
        console.log(len);
        newListClass = new Array(len).fill(res.data.data.items[0].classId);
        console.log(newListClass);

      } catch (e) { }
    })();
  }, []);

  const setcl = async (year) => {
    const res = await axios.get(`classes?schoolYearId=${year}`);
    console.log(res);
    setlistclass(res.data.data.items);
  };
  const create = async (e) => {
    e.preventDefault();
    const res = await axios.post("schoolyear", {
      schoolYearName,

    });
    //console.log(res);
    window.location.reload();
    //alert("done.");
  };
  const save = async (e) => {
    e.preventDefault();

    const { data } = await axios.put(`teachers/`, {

    });
    alert("chua xong.");
  };
  return (
    <>
      <CModal
        alignment="center"
        visible={visible}
        onClose={() => setVisible(false)}
      >
        <CModalHeader>
          <CModalTitle>
            <h2>Thêm năm học mới</h2>
          </CModalTitle>
        </CModalHeader>
        <CModalBody>
          <form onSubmit={create}>
            <div className="col">
              <div className="">
                <div className="row mt-3">
                  <div className="col-md-12">
                    Tên năm học
                    <input
                      type="text"
                      className="form-control"
                      // placeholder="tên lớp"
                      onChange={(e) => setSchoolYearName(e.target.value)}
                      required
                    />
                  </div>



                </div>

                <div className="mt-5 text-center">
                  <button className="btn btn-primary " type="submit">
                    Thêm mới
                  </button>
                </div>
              </div>
            </div>
          </form>
        </CModalBody>
      </CModal>
      <div className="d-grid gap-2 d-md-flex justify-content-md-end">
        Năm học:
        <CFormSelect
          disabled
          className="form-control form-control-sm mr-3 w-25"
          onChange={(e) => {
            setschoolyear(e.target.value);
            setcl(e.target.value);
          }}
        >
          {listyear?.map((item) => (
            <option value={item.schoolYearId} label={item.schoolYear}></option>
          ))}
        </CFormSelect>


        <CButton
          className="btn btn-primary"
          type="button"
          onClick={() => setVisible(!visible)}
        >
          Thêm mới năm học
        </CButton>
      </div>
      <form className="row m-5" onSubmit={save}>

        <table>
          <tr>
            <th>STT</th>
            <th>Tên lớp năm cũ</th>
            <th>Tên lớp chuyển đến</th>
            <th>Giáo viên chủ nhiệm</th>
          </tr>
          {listclass?.map((item, index) => (
            <tr>
              <td>{index + 1}</td>
              <td>{item.clazz}</td>
              <td>
                <CFormSelect
                  className="form-control form-control-sm mr-3 w-26"
                >
                  {listclass?.map((items) => (
                    <option value={items.classId} label={items.clazz}></option>
                  ))}
                </CFormSelect>
              </td>
              <td>
                <CFormSelect
                  className="form-control form-control-sm mr-3 w-26"
                >
                  {listTeacher?.map((items) => (
                    <option value={items.userId} label={items.displayName}></option>
                  ))}
                </CFormSelect>
              </td>


            </tr>

          ))}
        </table>
        <div className="mt-5 text-center">
          <button className="btn btn-primary " type="submit">
            Kết chuyển năm học
          </button>
        </div>
      </form>


    </>
  );
};
