import React, { useMemo } from "react";
import {
  useTable,
  usePagination,
  useSortBy,
  useFilters,
  useGlobalFilter,
} from "react-table";
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
import { GlobalFilter } from "../../GlobalFilter";

import { Link } from "react-router-dom";
import { element } from "prop-types";
export const PaginationTable = () => {
  const columns = useMemo(() => COLUMNS, []);
  const token = localStorage.getItem("access_token");
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  const [listcalendar, setlistcalendar] = useState([]);
  const [listCalendar, setlistCalendar] = useState([]);
  const [visible, setVisible] = useState(false);
  const [listyear, setlistyear] = useState([]);
  const [listteacher, setlistteacher] = useState([]);
  const [listclass, setlistclass] = useState([]);

  const [calendarEventName, setcalendarEventName] = useState("");
  const [calendarEventType, setcalendarEventType] = useState("Meeting");
  const [classIds, setclassIds] = useState([]);
  const [userIds, setuserIds] = useState([]);
  const [schoolYearId, setschoolYearId] = useState(1);
  const [timeStart, settimeStart] = useState("");
  const [timeFinish, settimeFinish] = useState("");
  const [semesterId, setsemesterId] = useState(1);
  const [date, setdate] = useState("");
  const [roomName, setroomName] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get("calendars");
        //console.log(data);
        setlistcalendar(data.data.items);
        setlistCalendar(
          data.data.items.filter((item) => item.calendarEventType === "Meeting")
        );
        const res = await axios.get("schoolyear");
        //console.log(res);
        setlistyear(res.data.data.items);
      } catch (e) {}
    })();
  }, []);
  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get("classes");
        //console.log(data);
        setlistclass(data.data.items);
        const res = await axios.get("teachers");
        //console.log(res);
        setlistteacher(res.data.data.items);
      } catch (e) {}
    })();
  }, []);
  const set = (type) => {
    setlistCalendar(
      listcalendar.filter((item) => item.calendarEventType === type)
    );
  };

  const data = useMemo(() => listCalendar, [listCalendar]);

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

    setGlobalFilter,
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0 },
    },

    useFilters,
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const { pageIndex, pageSize, globalFilter } = state;

  const save = async (e) => {
    const { data } = await axios.post("calendars", {
      calendarEventName,
      calendarEventType,
      classIds,
      userIds,
      timeStart,
      timeFinish,
      roomName,
      schoolYearId,
      semesterId,
      date,
    });
    console.log(data);
    window.location.reload();
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
            <h2>Th??m l???ch</h2>
          </CModalTitle>
        </CModalHeader>
        <CModalBody>
          <form>
            <table>
              <tr>
                <td>Ti??u ?????</td>
                <td>
                  <input
                    onChange={(e) => setcalendarEventName(e.target.value)}
                    type="text"
                    required
                  />
                </td>
              </tr>
              <tr>
                <td>Lo???i l???ch</td>
                <td>
                  <CFormSelect
                    onChange={(e) => setcalendarEventType(e.target.value)}
                  >
                    <option value="Meeting">L???ch h???p</option>
                    <option value="Examination">L???ch thi</option>
                  </CFormSelect>
                </td>
              </tr>
              {calendarEventType === "Examination" ? (
                <tr>
                  <td>M??n h???c</td>
                  <td>
                    <CFormSelect>
                      <option value="Maths"> To??n</option>
                      <option value="Physic"> V???t l??</option>
                      <option value="Chemistry"> H??a h???c</option>
                      <option value="Biological"> Sinh h???c</option>
                      <option value="Literature"> V??n h???c</option>
                      <option value="History"> L???ch s???</option>
                      <option value="Geographic"> ?????a l??</option>
                      <option value="Civic Education">Gi??o d???c c??ng d??n</option>

                      <option value="Defense Education">
                        Gi??o d???c qu???c ph??ng
                      </option>
                      <option value="Technology"> C??ng ngh???</option>
                      <option value="Physical Education"> Th??? d???c</option>
                      <option value="Informatics"> Tin h???c</option>
                    </CFormSelect>
                  </td>
                </tr>
              ) : (
                ""
              )}
              <tr>
                <td>Th???i gian b???t ?????u</td>
                <td>
                  <input
                    onChange={(e) => settimeStart(e.target.value.toString())}
                    type="time"
                    required
                  />
                </td>
              </tr>
              <tr>
                <td>Th???i gian k???t th??c</td>
                <td>
                  <input
                    onChange={(e) => settimeFinish(e.target.value.toString())}
                    type="time"
                    required
                  />
                </td>
              </tr>
              <tr>
                <td>Ng??y</td>
                <td>
                  <input
                    onChange={(e) => setdate(e.target.value.toString())}
                    type="date"
                    required
                  />
                </td>
              </tr>
              <tr>
                <td>Ph??ng</td>
                <td>
                  <input
                    onChange={(e) => setroomName(e.target.value)}
                    type="text"
                    required
                  />
                </td>
              </tr>
              <tr>
                <td>Th??nh ph???n tham d???</td>
                <td>
                  <table>
                    <thead>
                      <th>
                        <CFormSelect
                          onChange={(e) => {
                            setuserIds(userIds.concat([e.target.value]));
                          }}
                        >
                          <option>Gi??o vi??n</option>
                          {listteacher?.map((item) => (
                            <option
                              key={item.userId}
                              value={item.userId}
                              label={item.displayName}
                            ></option>
                          ))}
                        </CFormSelect>
                      </th>
                      <th></th>
                    </thead>
                    <tbody>
                      {userIds?.map((item) => (
                        <tr key={item}>
                          <td>
                            {
                              listteacher?.find((element) => {
                                return element.userId === Number(item);
                              })?.displayName
                            }
                          </td>
                          <td>
                            <button
                              onClick={(e) =>
                                setuserIds(userIds.filter((it) => it !== item))
                              }
                              className="btn btn-danger"
                            >
                              X??a
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </td>
              </tr>
              <tr>
                <td></td>
                <td>
                  <table>
                    <thead>
                      <th>
                        <CFormSelect
                          onChange={(e) => {
                            setclassIds(classIds.concat([e.target.value]));
                          }}
                        >
                          <option>L???p</option>
                          {listclass?.map((item) => (
                            <option
                              key={item.classId}
                              value={item.classId}
                              label={item.clazz}
                            ></option>
                          ))}
                        </CFormSelect>
                      </th>
                      <th></th>
                    </thead>
                    <tbody>
                      {classIds?.map((item) => (
                        <tr key={item}>
                          <td>
                            {
                              listclass?.find((element) => {
                                return element.classId === Number(item);
                              })?.clazz
                            }
                          </td>
                          <td>
                            <button
                              onClick={(e) =>
                                setclassIds(
                                  classIds.filter((it) => it !== item)
                                )
                              }
                              className="btn btn-danger"
                            >
                              X??a
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </td>
              </tr>
            </table>
            <br />
            <div className="text-end">
              <div
                className="btn btn-primary "
                type="submit"
                onClick={(e) => save()}
              >
                Th??m m???i
              </div>
            </div>
          </form>
        </CModalBody>
      </CModal>

      <div style={{ height: "60%", width: "100%", padding: "5px 2px 2px 2px" }}>
        <div style={{ marginRight: "auto", marginLeft: "auto" }}>
          <table className="table table-dark" style={{ border: "0" }}>
            <tbody>
              <tr>
                <td style={{ textAlign: "center", width: "15%" }}>
                  <CFormSelect
                    onChange={(e) => setschoolYearId(e.target.value)}
                  >
                    {listyear?.map((item) => (
                      <option
                        key={item.schoolYearId}
                        value={item.schoolYearId}
                        label={item.schoolYear}
                      ></option>
                    ))}
                  </CFormSelect>
                </td>
                <td style={{ textAlign: "center", width: "7%" }}>H???c k??:</td>
                <td style={{ textAlign: "center", width: "10%" }}>
                  <CFormSelect onChange={(e) => setsemesterId(e.target.value)}>
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                  </CFormSelect>
                </td>

                <td style={{ textAlign: "center", width: "5%" }}>L???ch:</td>
                <td style={{ textAlign: "center", width: "15%" }}>
                  <CFormSelect onChange={(e) => set(e.target.value)}>
                    <option value="Meeting">L???ch h???p</option>
                    <option value="Examination">L???ch thi</option>
                  </CFormSelect>
                </td>

                <td style={{ textAlign: "end" }}>
                  <CButton
                    onClick={(e) => {
                      setVisible(true);
                      setuserIds([]);
                      setclassIds([]);
                    }}
                    className="btn btn-primary"
                    type="button"
                  >
                    Th??m m???i
                  </CButton>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="d-grid gap-2 d-md-flex justify-content-md-end">
        <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
      </div>

      <table
        className="table table-borderded"
        style={{ border: "1px solid #ddd" }}
        {...getTableProps()}
      >
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render("Header")}

                  <span>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? " ????"
                        : " ????"
                      : ""}
                  </span>
                </th>
              ))}
              <th>H??nh ?????ng</th>
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
                  <Link className="edit" title="S???a" cshools-toggle="tooltip">
                    <i className="material-icons">&#xE254;</i>
                  </Link>
                  <Link className="delete" title="X??a" cshools-toggle="tooltip">
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
          Tr?????c
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
          | T???i trang:{" "}
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
