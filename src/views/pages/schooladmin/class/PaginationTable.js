import React, { useMemo } from "react";
import { useTable, usePagination } from "react-table";
import { Link, useNavigate } from "react-router-dom";

import { COLUMNS } from "./columns";
import "./table.css";
import axios from "axios";
import { useState, useEffect } from "react";
import {
  CModal,
  CButton,
  CModalHeader,
  CModalBody,
  CModalTitle,
  CFormSelect,
  CForm,
} from "@coreui/react";

export const PaginationTable = () => {
  const columns = useMemo(() => COLUMNS, []);

  const token = localStorage.getItem("access_token");
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  const [className, setclassName] = useState("");
  const [gradeId, setgradeId] = useState(0);
  const [isSpecializedClass, setisSpecializedClass] = useState(false);
  const [subject, setsubject] = useState("");

  const [listclass, setlistclass] = useState([]);
  const [listyear, setlistyear] = useState([]);
  const [liststudent, setliststudent] = useState([]);
  const [schoolyear, setschoolyear] = useState("");
  const [visible, setVisible] = useState(false);
  const [visible2, setVisible2] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get("classes");
        setlistclass(data.data.items);
        const res = await axios.get("students");
        setliststudent(res.data.data.items);
        console.log({ res });
      } catch (e) {}
    })();
  }, []);
  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get("schoolyear");
        //console.log({ data });
        setlistyear(data.data.items);
      } catch (e) {}
    })();
  }, []);
  const create = async (e) => {
    e.preventDefault();
    const res = await axios.post("classes", {
      className,
      gradeId,
      isSpecializedClass,
      subject,
    });
    console.log(res);
    window.location.reload();
    //alert("done.");
  };
  const del = async (id) => {
    const res = await axios.delete(`classes/${id}`);
    console.log(res);
    setlistclass(listclass.filter((item) => item.classId !== id));
  };

  const data = useMemo(() => listclass, [listclass]);
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    nextPage,
    previousPage,
    canPreviousPage,
    canNextPage,
    pageOptions,
    state,
    gotoPage,
    pageCount,
    setPageSize,
    prepareRow,
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0 },
    },
    usePagination
  );

  const { pageIndex, pageSize } = state;

  return (
    <>
      <CModal
        alignment="center"
        visible={visible}
        onClose={() => setVisible(false)}
      >
        <CModalHeader>
          <CModalTitle>
            <h2>Thêm mới lớp</h2>
          </CModalTitle>
        </CModalHeader>
        <CModalBody>
          <form onSubmit={create}>
            <div className="col">
              <div className="">
                <div className="row mt-3">
                  <div className="col-md-12">
                    Tên lớp
                    <input
                      type="text"
                      className="form-control"
                      placeholder="tên lớp"
                      onChange={(e) => setclassName(e.target.value)}
                      required
                    />
                  </div>

                  <div className="col-md-12">
                    Khối
                    <CFormSelect onChange={(e) => setgradeId(e.target.value)}>
                      <option value={1} label="10"></option>
                      <option value={2} label="11"></option>
                      <option value={3} label="12"></option>
                    </CFormSelect>
                  </div>
                  <div className="col-md-12">
                    Loại lớp
                    <CFormSelect
                      onChange={(e) => setisSpecializedClass(e.target.value)}
                    >
                      <option value={true} label="Lớp chọn"></option>
                      <option value={false} label="Lớp bình thường"></option>
                    </CFormSelect>
                  </div>
                  <div className="col-md-12">
                    Môn học lớp chọn
                    <input
                      type="text"
                      className="form-control"
                      placeholder=""
                      onChange={(e) => setsubject(e.target.value)}
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

      <CModal
        size="xl"
        alignment="center"
        visible={visible2}
        onClose={() => setVisible2(false)}
      >
        <CModalHeader>
          <CModalTitle>
            <h2>Danh sách học sinh</h2>
          </CModalTitle>
        </CModalHeader>
        <CModalBody>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Họ tên</th>
                <th>Ngày sinh </th>
                <th>Giới tính</th>
                <th>Số nhà</th>
                <th>Quận/Huyện</th>
                <th>Tỉnh/Thành phố</th>
                <th>Liên lạc</th>
              </tr>
            </thead>
            <tbody>
              {liststudent.map((item) => (
                <tr key={item.userId}>
                  <td>{item.userId}</td>
                  <td>{item.displayName}</td>
                  <td>{item.dateOfBirth}</td>
                  <td>{item.gender}</td>
                  <td>{item.street}</td>
                  <td>{item.district}</td>
                  <td>{item.city}</td>
                  <td> {item.phone}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CModalBody>
      </CModal>
      <div className="d-grid gap-2 d-md-flex justify-content-md-end">
        <CFormSelect
          className="form-control form-control-sm mr-3 w-25"
          onChange={(e) => setschoolyear(e.target.value)}
        >
          {listyear.map((item) => (
            <option value={item.schoolYear} label={item.schoolYear}></option>
          ))}
        </CFormSelect>
        <CForm className="form-inline ">
          <input
            className="form-control form-control-sm mr-3 w-75"
            type="text"
            placeholder="Tìm kiếm..."
            aria-label="Search"
          />
          <button className="material-icons">search</button>
        </CForm>
        <CButton
          className="btn btn-primary"
          type="button"
          onClick={() => setVisible(!visible)}
        >
          Thêm mới
        </CButton>
      </div>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render("Header")}</th>
              ))}
              <th>Hành động</th>
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
                <td>
                  <Link
                    onClick={() => setVisible2(true)}
                    className="Xem"
                    title="Xem"
                    cshools-toggle="tooltip"
                  >
                    <i className="material-icons">&#xE417;</i>
                  </Link>
                  <Link
                    to={`${row.original.classId}`}
                    className="edit"
                    title="Sửa"
                    cshools-toggle="tooltip"
                  >
                    <i className="material-icons">&#xE254;</i>
                  </Link>
                  <Link
                    onClick={() => del(row.original.classId)}
                    className="delete"
                    title="Xóa"
                    cshools-toggle="tooltip"
                  >
                    <i className="material-icons">&#xE872;</i>
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div>
        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {"<<"}
        </button>{" "}
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          Trước
        </button>{" "}
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          Sau
        </button>{" "}
        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          {">>"}
        </button>{" "}
        <span>
          Trang{" "}
          <strong>
            {pageIndex + 1} / {pageOptions.length}
          </strong>{" "}
        </span>
        <span>
          | Tới trang:{" "}
          <input
            type="number"
            defaultValue={pageIndex + 1}
            onChange={(e) => {
              const pageNumber = e.target.value
                ? Number(e.target.value) - 1
                : 0;
              gotoPage(pageNumber);
            }}
            style={{ width: "50px" }}
          />
        </span>{" "}
        <select
          value={pageSize}
          onChange={(e) => setPageSize(Number(e.target.value))}
        >
          {[10, 25, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Xem {pageSize}
            </option>
          ))}
        </select>
      </div>
    </>
  );
};
