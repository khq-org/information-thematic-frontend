import React, { useMemo } from "react";
import { useTable, usePagination } from "react-table";
import axios from "axios";
import { useState, useEffect } from "react";

import { COLUMNS } from "./columns";
import { COLUMNSPROFILE } from "./columnsProfile";
import "./table.css";
import BasicTable from "./BasicTable";

import {
  CModal,
  CButton,
  CModalHeader,
  CModalBody,
  CModalTitle,
  CFormSelect,
} from "@coreui/react";
import { Link } from "react-router-dom";
export const PaginationTable = () => {
  const columns = useMemo(() => COLUMNS, []);
  const columnsProfile = useMemo(() => COLUMNSPROFILE, []);

  const token = localStorage.getItem("access_token");
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  const [listStudent, setlistStudent] = useState([]);
  const [profile, setProfile] = useState([]);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get("students");
        console.log({ data });
        setlistStudent(data.data.items);
      } catch (e) {}
    })();
  }, []);
  const getProfile = async (id) => {
    const { data } = await axios.get(`students/${id}/profile`);
    console.log(data.data.learningResults);
    setProfile(
      data.data.learningResults.sort((a, b) => {
        const x = a.schoolYear;
        const y = b.schoolYear;
        if (x < y) {
          return -1;
        }
        if (x > y) {
          return 1;
        }
        return 0;
      })
    );
  };
  const data = useMemo(() => listStudent, [listStudent]);
  const dataProfile = useMemo(() => profile, [profile]);

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
        size="lg"
        alignment="center"
        visible={visible}
        onClose={() => setVisible(false)}
      >
        <CModalHeader>
          <CModalTitle>
            <h2>Xem quá trình học tập</h2>
          </CModalTitle>
        </CModalHeader>
        <CModalBody>
          <BasicTable columns={columnsProfile} data={dataProfile} />
        </CModalBody>
      </CModal>
      <div className="d-grid gap-2 d-md-flex justify-content-md-end">
        <CButton
          className="btn btn-primary"
          type="button"
          // onClick={() => setVisible(!visible)}
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
                    onClick={() => {
                      getProfile(row.original.userId);
                      setVisible(!visible);
                    }}
                    className="view"
                    title="Xem"
                    cshools-toggle="tooltip"
                  >
                    <i className="material-icons">&#xE417;</i>
                  </Link>
                  <Link
                    // to={`${row.original.userId}`}
                    className="edit"
                    title="Sửa"
                    cshools-toggle="tooltip"
                  >
                    <i className="material-icons">&#xE254;</i>
                  </Link>
                  <Link
                    // onClick={() => del(row.original.userId)}
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
