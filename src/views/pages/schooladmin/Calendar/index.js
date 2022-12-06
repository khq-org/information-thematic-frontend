import React from "react";

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
import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Calendar = () => {
  const token = localStorage.getItem("access_token");
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  const [listclass, setlistclass] = useState([]);
  const [listyear, setlistyear] = useState([]);
  const [listteacher, setlistTeacher] = useState([]);
  const [listCalendar, setlistCalendar] = useState([]);
  const [clazz, setclazz] = useState(1);
  const [visible, setVisible] = useState(false);
  const [listsubject, setlistsubject] = useState([]);
  const [title, settitle] = useState(true);
  const day = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const tiet = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  var mapSubjects = {
    Biological: "Sinh học",
    Chemistry: "Hóa học",
    Civic_Education: "Giáo dục công dân",
    Defense_Education: "Giáo dục quốc phòng",
    English: "Tiếng Anh",
    Geographic: "Địa lý",
    History: "Lịch Sử",
    Informatics: "Tin học",
    Literature: "Ngữ văn",
    Maths: "Toán học",
    Physic: "Vật lý",
    Physical_Education: "Thể dục",
    Technology: "Tin học",
  };

  const [calendarEventName, setcalendarEventName] = useState("");
  const [calendarEventType, setcalendarEventType] = useState("Study");
  const [classIds, setclassIds] = useState([1]);
  const [userIds, setuserIds] = useState([1]);
  const [schoolYearId, setschoolYearId] = useState(1);
  const [lessonStart, setlessonStart] = useState(0);
  const [lessonFinish, setlessonFinish] = useState(0);
  const [subjectId, setsubjectId] = useState(0);
  const [dayOfWeek, setdayOfWeek] = useState("");
  const [listteacher2, setlistTeacher2] = useState([]);
  const [id, setid] = useState(0);

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
        const { data } = await axios.get(
          "calendars?classId=1&calendarType=Study"
        );
        //console.log(data);
        setlistCalendar(data.data.items);
        const res = await axios.get("subjects");
        //console.log(res);
        setlistsubject(res.data.data.items);
      } catch (e) {}
    })();
  }, []);
  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get("teachers");
        //console.log({ data });
        setlistTeacher(data.data.items);
        setlistTeacher2(data.data.items);
      } catch (e) {}
    })();
  }, []);
  const setc = async (id) => {
    const { data } = await axios.get(
      `calendars?classId=${id}&calendarType=Study`
    );
    //console.log(data);
    setlistCalendar(data.data.items);
  };
  const findcalendar = (tiet, day) => {
    return listCalendar?.find((element) => {
      return element.dayOfWeek === day && element.lessonStart === tiet;
    });
  };
  const settc = (id) => {
    //console.log(listsubject);
    //console.log(id);
    //console.log(listsubject[id - 1]?.subject);
    //const d = listteacher.filter((item) => item.workingPosition === listsubject[id + 1]?.subject);
    setcalendarEventName(listsubject[id - 1]?.subject);
    setlistTeacher2(
      listteacher.filter(
        (item) => item.workingPosition === listsubject[id - 1]?.subject
      )
    );
  };
  const save = async (e) => {
    try {
      if (title) {
        const response = await axios.post("calendars", {
          calendarEventName,
          calendarEventType,
          classIds,
          userIds,
          schoolYearId,
          lessonStart,
          lessonFinish,
          dayOfWeek,
          subjectId,
          semesterId: 1,
        });
      } else {
        const response = await axios.put(`calendars/${id}`, {
          calendarEventName,
          calendarEventType,
          classIds,
          userIds,
          schoolYearId,
          lessonStart,
          lessonFinish,
          dayOfWeek,
          subjectId,
          semesterId: 1,
        });
        console.log(response);
      }

      setVisible(false);
      setc(clazz);
    } catch (err) {
      if (err.response?.status) {
        window.alert("Trùng lịch.");
      }
    }
  };
  const sua = async (id) => {
    setid(id);
    const { data } = await axios.get(`calendars/${id}`);
    console.log(data);
    setcalendarEventName(data.data.calendarEvent?.calendarEvent);

    setsubjectId(
      listsubject.find((item) => {
        return item.subject === data.data.calendarEvent?.subjectName;
      })?.subjectId
    );
    setuserIds([data.data.users[0]?.userId]);
    setlessonStart(data.data.calendarEvent?.lessonStart);
    setlessonFinish(data.data.calendarEvent?.lessonFinish);
    setdayOfWeek(data.data.calendarEvent?.dayOfWeek);
    setVisible(true);
    settitle(false);
  };
  const del = async (id) => {
    if (window.confirm("Bạn có chắc muốn xóa lịch này?")) {
      setVisible(false);
      setlistCalendar(
        listCalendar.filter((item) => item.calendarEventId !== id)
      );
      const { data } = await axios.delete(`calendars/${id}`);
      //console.log(data);
    }
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
            {title ? <div>Thêm mới</div> : <div>Sửa</div>}
          </CModalTitle>
        </CModalHeader>
        <CModalBody>
          <table className="table">
            <tr>
              <td style={{ width: "30%" }}>Lớp</td>
              <td>
                <CFormSelect
                  defaultValue={clazz}
                  onChange={(e) => {
                    setclassIds([e.target.value]);
                  }}
                >
                  {listclass?.map((items) => (
                    <option value={items.classId} label={items.clazz}></option>
                  ))}
                </CFormSelect>
              </td>
            </tr>
            <tr>
              <td>Môn học</td>
              <td>
                <CFormSelect
                  defaultValue={subjectId}
                  onChange={(e) => {
                    setsubjectId(Number(e.target.value));
                    settc(e.target.value);
                  }}
                >
                  <option>Môn học</option>
                  {listsubject?.map((item) => (
                    <option value={item.subjectId}>
                      {mapSubjects[item.subject.replace(" ", "_")]}
                    </option>
                  ))}
                </CFormSelect>
              </td>
            </tr>
            <tr>
              <td>Giáo viên</td>
              <td>
                <CFormSelect
                  defaultValue={userIds[0]}
                  onChange={(e) => setuserIds([Number(e.target.value)])}
                >
                  <option>Giáo viên</option>
                  {listteacher2?.map((item) => (
                    <option value={item.userId}>{item.displayName}</option>
                  ))}
                </CFormSelect>
              </td>
            </tr>
            <tr>
              <td>Tiết</td>
              <td>
                <CFormSelect
                  defaultValue={lessonStart}
                  onChange={(e) => {
                    setlessonStart(Number(e.target.value));
                    setlessonFinish(Number(e.target.value));
                  }}
                >
                  <option>Tiết học</option>
                  {tiet.map((item) => (
                    <option value={item}>{item}</option>
                  ))}
                </CFormSelect>
              </td>
            </tr>
            <tr>
              <td>Thứ</td>
              <td>
                <CFormSelect
                  defaultValue={dayOfWeek}
                  onChange={(e) => setdayOfWeek(e.target.value)}
                >
                  <option>Ngày trong tuần</option>
                  <option value="Monday">Thứ 2</option>
                  <option value="Tuesday">Thứ 3</option>
                  <option value="Wednesday">Thứ 4</option>
                  <option value="Thursday">Thứ 5</option>
                  <option value="Friday">Thứ 6</option>
                  <option value="Saturday">Thứ 7</option>
                </CFormSelect>
              </td>
            </tr>
          </table>
          <div className="mt-5 text-center">
            <button className="btn btn-primary " onClick={(e) => save()}>
              {title ? "Thêm mới" : "Lưu thông tin"}
            </button>
            &ensp;
            {title ? (
              ""
            ) : (
              <button className="btn btn-danger " onClick={(e) => del(id)}>
                Xóa
              </button>
            )}
          </div>
        </CModalBody>
      </CModal>
      <div style={{ height: "60%", width: "100%", padding: "5px 2px 2px 2px" }}>
        <div
          classname="GreyBox"
          style={{ marginRight: "auto", marginLeft: "auto" }}
        >
          <table className="table table-dark">
            <tbody>
              <tr>
                <td style={{ textAlign: "center", width: "7%" }}>Năm học:</td>
                <td>
                  <CFormSelect
                    onChange={(e) => setschoolYearId(e.target.value)}
                  >
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
                  <CFormSelect
                    onChange={(e) => {
                      setc(e.target.value);
                      setclazz(e.target.value);
                    }}
                  >
                    {listclass?.map((items) => (
                      <option
                        value={items.classId}
                        label={items.clazz}
                      ></option>
                    ))}
                  </CFormSelect>
                </td>
                <td style={{ textAlign: "center", width: "50%" }}></td>
                <td>
                  <CButton
                    onClick={(e) => {
                      setlessonStart(0);
                      setdayOfWeek("");
                      setuserIds([]);
                      setsubjectId(0);
                      setVisible(true);
                      settitle(true);
                    }}
                    className="btn btn-primary"
                    type="button"
                  >
                    Thêm mới
                  </CButton>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div style={{ width: "100%", padding: "5px 2px 2px 2px" }}>
        <div
          classname="GreyBox"
          style={{ marginRight: "auto", marginLeft: "auto" }}
        >
          <div class="table-wrer-scroll-y my-custom-scrollbar">
            <table className="table table-bordered table-active">
              <thead>
                <tr>
                  <th></th>
                  <th>Thứ 2</th>
                  <th>Thứ 3</th>
                  <th>Thứ 4</th>
                  <th>Thứ 5</th>
                  <th>Thứ 6</th>
                  <th>Thứ 7</th>
                </tr>
              </thead>
              <tbody>
                {tiet.map((item) => (
                  <tr>
                    <td>Tiết {item}</td>
                    {day.map((items) => (
                      <td
                        onClick={(e) => {
                          if (findcalendar(item, items)) {
                            sua(findcalendar(item, items)?.calendarEventId);
                          } else {
                            setlessonStart(item);
                            setdayOfWeek(items);
                            setuserIds([]);
                            setsubjectId(0);
                            setVisible(true);
                            settitle(true);
                          }
                        }}
                        style={{ width: "14%" }}
                      >
                        {findcalendar(item, items) ? (
                          <div>
                            {
                              mapSubjects[
                                findcalendar(
                                  item,
                                  items
                                )?.calendarEvent.replace(" ", "_")
                              ]
                            }
                            -{findcalendar(item, items)?.teacher.lastName}
                            &nbsp;
                            {findcalendar(item, items)?.teacher.firstName}
                            {/* <CDropdown>
                              <CDropdownToggle color="white"></CDropdownToggle>
                              <CDropdownMenu>
                                <CDropdownItem>
                                  <Link
                                    onClick={(e) => {
                                      setVisible(true);
                                      settitle("Sửa");
                                    }}
                                    title="Sửa"
                                    cshools-toggle="tooltip"
                                  >
                                    <i className="material-icons">&#xE254;</i>
                                  </Link>
                                </CDropdownItem>
                                <CDropdownItem>
                                  <Link title="Xóa" cshools-toggle="tooltip">
                                    <i className="material-icons">&#xE872;</i>
                                  </Link>
                                </CDropdownItem>
                              </CDropdownMenu>
                            </CDropdown> */}
                          </div>
                        ) : (
                          ""
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* <div className="mt-5 text-center">
            <button className="btn btn-primary profile-button" type="button">
              Cập nhật
            </button>
          </div> */}
        </div>
        <br />
        <br />
      </div>
    </>
  );
};

export default Calendar;

// import React from "react";
// import FullCalendar, { formatDate } from "@fullcalendar/react";
// import dayGridPlugin from "@fullcalendar/daygrid";
// import timeGridPlugin from "@fullcalendar/timegrid";
// import interactionPlugin from "@fullcalendar/interaction";
// import { INITIAL_EVENTS, createEventId } from "./event-utils";

// export default class Calendar extends React.Component {
//   state = {
//     weekendsVisible: true,
//     currentEvents: [],
//   };

//   render() {
//     return (
//       <div className="demo-Calendar">
//         {this.renderSidebar()}
//         <div className="demo-Calendar-main">
//           <FullCalendar
//             plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
//             headerToolbar={{
//               left: "prev,next today",
//               center: "title",
//               right: "dayGridMonth,timeGridWeek,timeGridDay",
//             }}
//             initialView="timeGridWeek"
//             editable={true}
//             selectable={true}
//             selectMirror={true}
//             dayMaxEvents={true}
//             initialEvents={INITIAL_EVENTS} // alternatively, use the `events` setting to fetch from a feed
//             select={this.handleDateSelect}
//             eventContent={renderEventContent} // custom render function
//             eventClick={this.handleEventClick}
//             eventsSet={this.handleEvents} // called after events are initialized/added/changed/removed
//             /* you can update a remote database when these fire:
//             eventAdd={function(){}}
//             eventChange={function(){}}
//             eventRemove={function(){}}
//             */
//           />
//         </div>
//       </div>
//     );
//   }

//   renderSidebar() {
//     return (
//       <div className="demo-Calendar-sidebar">
//         <div className="demo-Calendar-sidebar-section">
//           <h2>All Events ({this.state.currentEvents.length})</h2>
//           <ul>{this.state.currentEvents.map(renderSidebarEvent)}</ul>
//         </div>
//       </div>
//     );
//   }

//   handleDateSelect = (selectInfo) => {
//     let title = prompt("Please enter a new title for your event");
//     let calendarApi = selectInfo.view.calendar;

//     calendarApi.unselect(); // clear date selection

//     if (title) {
//       calendarApi.addEvent({
//         id: createEventId(),
//         title,
//         start: selectInfo.startStr,
//         end: selectInfo.endStr,
//         allDay: selectInfo.allDay,
//         gv: "huan",
//       });
//     }
//   };

//   handleEventClick = (clickInfo) => {
//     if (
//       window.confirm(
//         `Are you sure you want to delete the event '${clickInfo.event.title}'`
//       )
//     ) {
//       clickInfo.event.remove();
//     }
//   };

//   handleEvents = (events) => {
//     this.setState({
//       currentEvents: events,
//     });
//   };
// }

// function renderEventContent(eventInfo) {
//   return (
//     <>
//       <b>{eventInfo.timeText}</b>
//       <i>{eventInfo.event.title}</i>
//     </>
//   );
// }

// function renderSidebarEvent(event) {
//   return (
//     <li key={event.id}>
//       <b>
//         {formatDate(event.start, {
//           year: "numeric",
//           month: "short",
//           day: "numeric",
//         })}
//       </b>
//       <i>{event.title}</i>
//       <i>{event.gv}</i>
//     </li>
//   );
// }
// import React from "react";
// import { CFormSelect } from "@coreui/react";
// import axios from "axios";
// import { useState, useEffect } from "react";

// const Calendar = () => {
//   const token = localStorage.getItem("access_token");
//   axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
//   const [listclass, setlistclass] = useState([]);
//   const [listyear, setlistyear] = useState([]);
//   const [listteacher, setlistTeacher] = useState([]);

//   useEffect(() => {
//     (async () => {
//       try {
//         const { data } = await axios.get("schoolyear");
//         //console.log(data);
//         setlistyear(data.data.items);
//         const res = await axios.get("classes");
//         setlistclass(res.data.data.items);
//       } catch (e) {}
//     })();
//   }, []);
//   useEffect(() => {
//     (async () => {
//       try {
//         const { data } = await axios.get("teachers");
//         //console.log({ data });
//         setlistTeacher(data.data.items);
//       } catch (e) {}
//     })();
//   }, []);
//   return (
//     <>
//       <div style={{ width: "100%", padding: "5px 2px 2px 2px" }}>
//         <div
//           classname="GreyBox"
//           style={{ marginRight: "auto", marginLeft: "auto" }}
//         >
//           <table className="table table-primary">
//             <tbody>
//               <tr>
//                 <td style={{ textAlign: "center", width: "7%" }}>Năm học:</td>
//                 <td>
//                   <CFormSelect>
//                     {listyear?.map((item) => (
//                       <option
//                         value={item.schoolYearId}
//                         label={item.schoolYear}
//                       ></option>
//                     ))}
//                   </CFormSelect>
//                 </td>
//                 <td style={{ textAlign: "center", width: "5%" }}>Lớp:</td>
//                 <td>
//                   <CFormSelect>
//                     {listclass?.map((items) => (
//                       <option
//                         value={items.classId}
//                         label={items.clazz}
//                       ></option>
//                     ))}
//                   </CFormSelect>
//                 </td>
//                 <td style={{ textAlign: "center", width: "50%" }}>
//                   Thời gian áp dụng: <input type="date" />
//                 </td>
//               </tr>
//             </tbody>
//           </table>
//         </div>
//       </div>
//       <div style={{ width: "80%", padding: "5px 2px 2px 2px" }}>
//         <div
//           classname="GreyBox"
//           style={{ marginRight: "auto", marginLeft: "auto" }}
//         >
//           <div class="table-wrCalendarer-scroll-y my-custom-scrollbar">
//             <table className="table table-bordered table-active">
//               <tbody>
//                 <tr>
//                   <td
//                     style={{ textAlign: "center", width: "20%" }}
//                     rowSpan={10}
//                   >
//                     Thứ 2
//                   </td>
//                   <td style={{ textAlign: "center", width: "10%" }}>Tiết 1</td>
//                   <td style={{ textAlign: "center", width: "35%" }}>
//                     <CFormSelect>
//                       <option selected="selected">Môn học</option>
//                       <option value={1} label="Toán"></option>
//                       <option value={2} label="Vật lí"></option>
//                       <option value={3} label="Hóa học"></option>
//                       <option value={4} label="Văn học"></option>
//                       <option value={5} label="Lịch sử"></option>
//                       <option value={6} label="Địa lí"></option>
//                       <option value={7} label="Sinh học"></option>
//                       <option value={8} label="Tiếng anh"></option>
//                       <option value={9} label="GDCD"></option>
//                       <option value={10} label="Công nghệ"></option>
//                       <option value={11} label="GDQPAN"></option>
//                       <option value={12} label="Thể dục"></option>
//                       <option value={13} label="Tin học"></option>
//                     </CFormSelect>
//                   </td>

//                   <td style={{ textAlign: "center", width: "35%" }}>
//                     <CFormSelect>
//                       <option selected="selected">Giáo viên</option>
//                       {listteacher.map((item) => (
//                         <option
//                           key={item.userId}
//                           value={item.userId}
//                           label={item.displayName}
//                         ></option>
//                       ))}
//                     </CFormSelect>
//                   </td>
//                 </tr>
//                 <tr>
//                   <td style={{ textAlign: "center", width: "180px" }}>
//                     Tiết 2
//                   </td>
//                   <td>
//                     <CFormSelect>
//                       <option selected="selected">Môn học</option>
//                       <option value={1} label="Toán"></option>
//                       <option value={2} label="Vật lí"></option>
//                       <option value={3} label="Hóa học"></option>
//                       <option value={4} label="Văn học"></option>
//                       <option value={5} label="Lịch sử"></option>
//                       <option value={6} label="Địa lí"></option>
//                       <option value={7} label="Sinh học"></option>
//                       <option value={8} label="Tiếng anh"></option>
//                       <option value={9} label="GDCD"></option>
//                       <option value={10} label="Công nghệ"></option>
//                       <option value={11} label="GDQPAN"></option>
//                       <option value={12} label="Thể dục"></option>
//                       <option value={13} label="Tin học"></option>
//                     </CFormSelect>
//                   </td>

//                   <td>
//                     <CFormSelect>
//                       <option selected="selected">Giáo viên</option>
//                       {listteacher.map((item) => (
//                         <option
//                           key={item.userId}
//                           value={item.userId}
//                           label={item.displayName}
//                         ></option>
//                       ))}
//                     </CFormSelect>
//                   </td>
//                 </tr>
//                 <tr>
//                   <td style={{ textAlign: "center", width: "180px" }}>
//                     Tiết 3
//                   </td>
//                   <td>
//                     <CFormSelect>
//                       <option selected="selected">Môn học</option>
//                       <option value={1} label="Toán"></option>
//                       <option value={2} label="Vật lí"></option>
//                       <option value={3} label="Hóa học"></option>
//                       <option value={4} label="Văn học"></option>
//                       <option value={5} label="Lịch sử"></option>
//                       <option value={6} label="Địa lí"></option>
//                       <option value={7} label="Sinh học"></option>
//                       <option value={8} label="Tiếng anh"></option>
//                       <option value={9} label="GDCD"></option>
//                       <option value={10} label="Công nghệ"></option>
//                       <option value={11} label="GDQPAN"></option>
//                       <option value={12} label="Thể dục"></option>
//                       <option value={13} label="Tin học"></option>
//                     </CFormSelect>
//                   </td>

//                   <td>
//                     <CFormSelect>
//                       <option selected="selected">Giáo viên</option>
//                       {listteacher.map((item) => (
//                         <option
//                           key={item.userId}
//                           value={item.userId}
//                           label={item.displayName}
//                         ></option>
//                       ))}
//                     </CFormSelect>
//                   </td>
//                 </tr>
//                 <tr>
//                   <td style={{ textAlign: "center", width: "180px" }}>
//                     Tiết 4
//                   </td>
//                   <td>
//                     <CFormSelect>
//                       <option selected="selected">Môn học</option>
//                       <option value={1} label="Toán"></option>
//                       <option value={2} label="Vật lí"></option>
//                       <option value={3} label="Hóa học"></option>
//                       <option value={4} label="Văn học"></option>
//                       <option value={5} label="Lịch sử"></option>
//                       <option value={6} label="Địa lí"></option>
//                       <option value={7} label="Sinh học"></option>
//                       <option value={8} label="Tiếng anh"></option>
//                       <option value={9} label="GDCD"></option>
//                       <option value={10} label="Công nghệ"></option>
//                       <option value={11} label="GDQPAN"></option>
//                       <option value={12} label="Thể dục"></option>
//                       <option value={13} label="Tin học"></option>
//                     </CFormSelect>
//                   </td>

//                   <td>
//                     <CFormSelect>
//                       <option selected="selected">Giáo viên</option>
//                       {listteacher.map((item) => (
//                         <option
//                           key={item.userId}
//                           value={item.userId}
//                           label={item.displayName}
//                         ></option>
//                       ))}
//                     </CFormSelect>
//                   </td>
//                 </tr>
//                 <tr>
//                   <td style={{ textAlign: "center", width: "180px" }}>
//                     Tiết 5
//                   </td>
//                   <td>
//                     <CFormSelect>
//                       <option selected="selected">Môn học</option>
//                       <option value={1} label="Toán"></option>
//                       <option value={2} label="Vật lí"></option>
//                       <option value={3} label="Hóa học"></option>
//                       <option value={4} label="Văn học"></option>
//                       <option value={5} label="Lịch sử"></option>
//                       <option value={6} label="Địa lí"></option>
//                       <option value={7} label="Sinh học"></option>
//                       <option value={8} label="Tiếng anh"></option>
//                       <option value={9} label="GDCD"></option>
//                       <option value={10} label="Công nghệ"></option>
//                       <option value={11} label="GDQPAN"></option>
//                       <option value={12} label="Thể dục"></option>
//                       <option value={13} label="Tin học"></option>
//                     </CFormSelect>
//                   </td>

//                   <td>
//                     <CFormSelect>
//                       <option selected="selected">Giáo viên</option>
//                       {listteacher.map((item) => (
//                         <option
//                           key={item.userId}
//                           value={item.userId}
//                           label={item.displayName}
//                         ></option>
//                       ))}
//                     </CFormSelect>
//                   </td>
//                 </tr>
//                 <tr>
//                   <td style={{ textAlign: "center", width: "180px" }}>
//                     Tiết 6
//                   </td>
//                   <td>
//                     <CFormSelect>
//                       <option selected="selected">Môn học</option>
//                       <option value={1} label="Toán"></option>
//                       <option value={2} label="Vật lí"></option>
//                       <option value={3} label="Hóa học"></option>
//                       <option value={4} label="Văn học"></option>
//                       <option value={5} label="Lịch sử"></option>
//                       <option value={6} label="Địa lí"></option>
//                       <option value={7} label="Sinh học"></option>
//                       <option value={8} label="Tiếng anh"></option>
//                       <option value={9} label="GDCD"></option>
//                       <option value={10} label="Công nghệ"></option>
//                       <option value={11} label="GDQPAN"></option>
//                       <option value={12} label="Thể dục"></option>
//                       <option value={13} label="Tin học"></option>
//                     </CFormSelect>
//                   </td>

//                   <td>
//                     <CFormSelect>
//                       <option selected="selected">Giáo viên</option>
//                       {listteacher.map((item) => (
//                         <option
//                           key={item.userId}
//                           value={item.userId}
//                           label={item.displayName}
//                         ></option>
//                       ))}
//                     </CFormSelect>
//                   </td>
//                 </tr>
//                 <tr>
//                   <td style={{ textAlign: "center", width: "180px" }}>
//                     Tiết 7
//                   </td>
//                   <td>
//                     <CFormSelect>
//                       <option selected="selected">Môn học</option>
//                       <option value={1} label="Toán"></option>
//                       <option value={2} label="Vật lí"></option>
//                       <option value={3} label="Hóa học"></option>
//                       <option value={4} label="Văn học"></option>
//                       <option value={5} label="Lịch sử"></option>
//                       <option value={6} label="Địa lí"></option>
//                       <option value={7} label="Sinh học"></option>
//                       <option value={8} label="Tiếng anh"></option>
//                       <option value={9} label="GDCD"></option>
//                       <option value={10} label="Công nghệ"></option>
//                       <option value={11} label="GDQPAN"></option>
//                       <option value={12} label="Thể dục"></option>
//                       <option value={13} label="Tin học"></option>
//                     </CFormSelect>
//                   </td>

//                   <td>
//                     <CFormSelect>
//                       <option selected="selected">Giáo viên</option>
//                       {listteacher.map((item) => (
//                         <option
//                           key={item.userId}
//                           value={item.userId}
//                           label={item.displayName}
//                         ></option>
//                       ))}
//                     </CFormSelect>
//                   </td>
//                 </tr>
//                 <tr>
//                   <td style={{ textAlign: "center", width: "180px" }}>
//                     Tiết 8
//                   </td>
//                   <td>
//                     <CFormSelect>
//                       <option selected="selected">Môn học</option>
//                       <option value={1} label="Toán"></option>
//                       <option value={2} label="Vật lí"></option>
//                       <option value={3} label="Hóa học"></option>
//                       <option value={4} label="Văn học"></option>
//                       <option value={5} label="Lịch sử"></option>
//                       <option value={6} label="Địa lí"></option>
//                       <option value={7} label="Sinh học"></option>
//                       <option value={8} label="Tiếng anh"></option>
//                       <option value={9} label="GDCD"></option>
//                       <option value={10} label="Công nghệ"></option>
//                       <option value={11} label="GDQPAN"></option>
//                       <option value={12} label="Thể dục"></option>
//                       <option value={13} label="Tin học"></option>
//                     </CFormSelect>
//                   </td>

//                   <td>
//                     <CFormSelect>
//                       <option selected="selected">Giáo viên</option>
//                       {listteacher.map((item) => (
//                         <option
//                           key={item.userId}
//                           value={item.userId}
//                           label={item.displayName}
//                         ></option>
//                       ))}
//                     </CFormSelect>
//                   </td>
//                 </tr>
//                 <tr>
//                   <td style={{ textAlign: "center", width: "180px" }}>
//                     Tiết 9
//                   </td>
//                   <td>
//                     <CFormSelect>
//                       <option selected="selected">Môn học</option>
//                       <option value={1} label="Toán"></option>
//                       <option value={2} label="Vật lí"></option>
//                       <option value={3} label="Hóa học"></option>
//                       <option value={4} label="Văn học"></option>
//                       <option value={5} label="Lịch sử"></option>
//                       <option value={6} label="Địa lí"></option>
//                       <option value={7} label="Sinh học"></option>
//                       <option value={8} label="Tiếng anh"></option>
//                       <option value={9} label="GDCD"></option>
//                       <option value={10} label="Công nghệ"></option>
//                       <option value={11} label="GDQPAN"></option>
//                       <option value={12} label="Thể dục"></option>
//                       <option value={13} label="Tin học"></option>
//                     </CFormSelect>
//                   </td>

//                   <td>
//                     <CFormSelect>
//                       <option selected="selected">Giáo viên</option>
//                       {listteacher.map((item) => (
//                         <option
//                           key={item.userId}
//                           value={item.userId}
//                           label={item.displayName}
//                         ></option>
//                       ))}
//                     </CFormSelect>
//                   </td>
//                 </tr>
//                 <tr>
//                   <td style={{ textAlign: "center", width: "180px" }}>
//                     Tiết 10
//                   </td>
//                   <td>
//                     <CFormSelect>
//                       <option selected="selected">Môn học</option>
//                       <option value={1} label="Toán"></option>
//                       <option value={2} label="Vật lí"></option>
//                       <option value={3} label="Hóa học"></option>
//                       <option value={4} label="Văn học"></option>
//                       <option value={5} label="Lịch sử"></option>
//                       <option value={6} label="Địa lí"></option>
//                       <option value={7} label="Sinh học"></option>
//                       <option value={8} label="Tiếng anh"></option>
//                       <option value={9} label="GDCD"></option>
//                       <option value={10} label="Công nghệ"></option>
//                       <option value={11} label="GDQPAN"></option>
//                       <option value={12} label="Thể dục"></option>
//                       <option value={13} label="Tin học"></option>
//                     </CFormSelect>
//                   </td>

//                   <td>
//                     <CFormSelect>
//                       <option selected="selected">Giáo viên</option>
//                       {listteacher.map((item) => (
//                         <option
//                           key={item.userId}
//                           value={item.userId}
//                           label={item.displayName}
//                         ></option>
//                       ))}
//                     </CFormSelect>
//                   </td>
//                 </tr>
//                 <tr>
//                   <td
//                     style={{ textAlign: "center", width: "20%" }}
//                     rowSpan={10}
//                   >
//                     Thứ 3
//                   </td>
//                   <td style={{ textAlign: "center", width: "10%" }}>Tiết 1</td>
//                   <td style={{ textAlign: "center", width: "35%" }}>
//                     <CFormSelect>
//                       <option selected="selected">Môn học</option>
//                       <option value={1} label="Toán"></option>
//                       <option value={2} label="Vật lí"></option>
//                       <option value={3} label="Hóa học"></option>
//                       <option value={4} label="Văn học"></option>
//                       <option value={5} label="Lịch sử"></option>
//                       <option value={6} label="Địa lí"></option>
//                       <option value={7} label="Sinh học"></option>
//                       <option value={8} label="Tiếng anh"></option>
//                       <option value={9} label="GDCD"></option>
//                       <option value={10} label="Công nghệ"></option>
//                       <option value={11} label="GDQPAN"></option>
//                       <option value={12} label="Thể dục"></option>
//                       <option value={13} label="Tin học"></option>
//                     </CFormSelect>
//                   </td>

//                   <td style={{ textAlign: "center", width: "35%" }}>
//                     <CFormSelect>
//                       <option selected="selected">Giáo viên</option>
//                       {listteacher.map((item) => (
//                         <option
//                           key={item.userId}
//                           value={item.userId}
//                           label={item.displayName}
//                         ></option>
//                       ))}
//                     </CFormSelect>
//                   </td>
//                 </tr>
//                 <tr>
//                   <td style={{ textAlign: "center", width: "180px" }}>
//                     Tiết 2
//                   </td>
//                   <td>
//                     <CFormSelect>
//                       <option selected="selected">Môn học</option>
//                       <option value={1} label="Toán"></option>
//                       <option value={2} label="Vật lí"></option>
//                       <option value={3} label="Hóa học"></option>
//                       <option value={4} label="Văn học"></option>
//                       <option value={5} label="Lịch sử"></option>
//                       <option value={6} label="Địa lí"></option>
//                       <option value={7} label="Sinh học"></option>
//                       <option value={8} label="Tiếng anh"></option>
//                       <option value={9} label="GDCD"></option>
//                       <option value={10} label="Công nghệ"></option>
//                       <option value={11} label="GDQPAN"></option>
//                       <option value={12} label="Thể dục"></option>
//                       <option value={13} label="Tin học"></option>
//                     </CFormSelect>
//                   </td>

//                   <td>
//                     <CFormSelect>
//                       <option selected="selected">Giáo viên</option>
//                       {listteacher.map((item) => (
//                         <option
//                           key={item.userId}
//                           value={item.userId}
//                           label={item.displayName}
//                         ></option>
//                       ))}
//                     </CFormSelect>
//                   </td>
//                 </tr>
//                 <tr>
//                   <td style={{ textAlign: "center", width: "180px" }}>
//                     Tiết 3
//                   </td>
//                   <td>
//                     <CFormSelect>
//                       <option selected="selected">Môn học</option>
//                       <option value={1} label="Toán"></option>
//                       <option value={2} label="Vật lí"></option>
//                       <option value={3} label="Hóa học"></option>
//                       <option value={4} label="Văn học"></option>
//                       <option value={5} label="Lịch sử"></option>
//                       <option value={6} label="Địa lí"></option>
//                       <option value={7} label="Sinh học"></option>
//                       <option value={8} label="Tiếng anh"></option>
//                       <option value={9} label="GDCD"></option>
//                       <option value={10} label="Công nghệ"></option>
//                       <option value={11} label="GDQPAN"></option>
//                       <option value={12} label="Thể dục"></option>
//                       <option value={13} label="Tin học"></option>
//                     </CFormSelect>
//                   </td>

//                   <td>
//                     <CFormSelect>
//                       <option selected="selected">Giáo viên</option>
//                       {listteacher.map((item) => (
//                         <option
//                           key={item.userId}
//                           value={item.userId}
//                           label={item.displayName}
//                         ></option>
//                       ))}
//                     </CFormSelect>
//                   </td>
//                 </tr>
//                 <tr>
//                   <td style={{ textAlign: "center", width: "180px" }}>
//                     Tiết 4
//                   </td>
//                   <td>
//                     <CFormSelect>
//                       <option selected="selected">Môn học</option>
//                       <option value={1} label="Toán"></option>
//                       <option value={2} label="Vật lí"></option>
//                       <option value={3} label="Hóa học"></option>
//                       <option value={4} label="Văn học"></option>
//                       <option value={5} label="Lịch sử"></option>
//                       <option value={6} label="Địa lí"></option>
//                       <option value={7} label="Sinh học"></option>
//                       <option value={8} label="Tiếng anh"></option>
//                       <option value={9} label="GDCD"></option>
//                       <option value={10} label="Công nghệ"></option>
//                       <option value={11} label="GDQPAN"></option>
//                       <option value={12} label="Thể dục"></option>
//                       <option value={13} label="Tin học"></option>
//                     </CFormSelect>
//                   </td>

//                   <td>
//                     <CFormSelect>
//                       <option selected="selected">Giáo viên</option>
//                       {listteacher.map((item) => (
//                         <option
//                           key={item.userId}
//                           value={item.userId}
//                           label={item.displayName}
//                         ></option>
//                       ))}
//                     </CFormSelect>
//                   </td>
//                 </tr>
//                 <tr>
//                   <td style={{ textAlign: "center", width: "180px" }}>
//                     Tiết 5
//                   </td>
//                   <td>
//                     <CFormSelect>
//                       <option selected="selected">Môn học</option>
//                       <option value={1} label="Toán"></option>
//                       <option value={2} label="Vật lí"></option>
//                       <option value={3} label="Hóa học"></option>
//                       <option value={4} label="Văn học"></option>
//                       <option value={5} label="Lịch sử"></option>
//                       <option value={6} label="Địa lí"></option>
//                       <option value={7} label="Sinh học"></option>
//                       <option value={8} label="Tiếng anh"></option>
//                       <option value={9} label="GDCD"></option>
//                       <option value={10} label="Công nghệ"></option>
//                       <option value={11} label="GDQPAN"></option>
//                       <option value={12} label="Thể dục"></option>
//                       <option value={13} label="Tin học"></option>
//                     </CFormSelect>
//                   </td>

//                   <td>
//                     <CFormSelect>
//                       <option selected="selected">Giáo viên</option>
//                       {listteacher.map((item) => (
//                         <option
//                           key={item.userId}
//                           value={item.userId}
//                           label={item.displayName}
//                         ></option>
//                       ))}
//                     </CFormSelect>
//                   </td>
//                 </tr>
//                 <tr>
//                   <td style={{ textAlign: "center", width: "180px" }}>
//                     Tiết 6
//                   </td>
//                   <td>
//                     <CFormSelect>
//                       <option selected="selected">Môn học</option>
//                       <option value={1} label="Toán"></option>
//                       <option value={2} label="Vật lí"></option>
//                       <option value={3} label="Hóa học"></option>
//                       <option value={4} label="Văn học"></option>
//                       <option value={5} label="Lịch sử"></option>
//                       <option value={6} label="Địa lí"></option>
//                       <option value={7} label="Sinh học"></option>
//                       <option value={8} label="Tiếng anh"></option>
//                       <option value={9} label="GDCD"></option>
//                       <option value={10} label="Công nghệ"></option>
//                       <option value={11} label="GDQPAN"></option>
//                       <option value={12} label="Thể dục"></option>
//                       <option value={13} label="Tin học"></option>
//                     </CFormSelect>
//                   </td>

//                   <td>
//                     <CFormSelect>
//                       <option selected="selected">Giáo viên</option>
//                       {listteacher.map((item) => (
//                         <option
//                           key={item.userId}
//                           value={item.userId}
//                           label={item.displayName}
//                         ></option>
//                       ))}
//                     </CFormSelect>
//                   </td>
//                 </tr>
//                 <tr>
//                   <td style={{ textAlign: "center", width: "180px" }}>
//                     Tiết 7
//                   </td>
//                   <td>
//                     <CFormSelect>
//                       <option selected="selected">Môn học</option>
//                       <option value={1} label="Toán"></option>
//                       <option value={2} label="Vật lí"></option>
//                       <option value={3} label="Hóa học"></option>
//                       <option value={4} label="Văn học"></option>
//                       <option value={5} label="Lịch sử"></option>
//                       <option value={6} label="Địa lí"></option>
//                       <option value={7} label="Sinh học"></option>
//                       <option value={8} label="Tiếng anh"></option>
//                       <option value={9} label="GDCD"></option>
//                       <option value={10} label="Công nghệ"></option>
//                       <option value={11} label="GDQPAN"></option>
//                       <option value={12} label="Thể dục"></option>
//                       <option value={13} label="Tin học"></option>
//                     </CFormSelect>
//                   </td>

//                   <td>
//                     <CFormSelect>
//                       <option selected="selected">Giáo viên</option>
//                       {listteacher.map((item) => (
//                         <option
//                           key={item.userId}
//                           value={item.userId}
//                           label={item.displayName}
//                         ></option>
//                       ))}
//                     </CFormSelect>
//                   </td>
//                 </tr>
//                 <tr>
//                   <td style={{ textAlign: "center", width: "180px" }}>
//                     Tiết 8
//                   </td>
//                   <td>
//                     <CFormSelect>
//                       <option selected="selected">Môn học</option>
//                       <option value={1} label="Toán"></option>
//                       <option value={2} label="Vật lí"></option>
//                       <option value={3} label="Hóa học"></option>
//                       <option value={4} label="Văn học"></option>
//                       <option value={5} label="Lịch sử"></option>
//                       <option value={6} label="Địa lí"></option>
//                       <option value={7} label="Sinh học"></option>
//                       <option value={8} label="Tiếng anh"></option>
//                       <option value={9} label="GDCD"></option>
//                       <option value={10} label="Công nghệ"></option>
//                       <option value={11} label="GDQPAN"></option>
//                       <option value={12} label="Thể dục"></option>
//                       <option value={13} label="Tin học"></option>
//                     </CFormSelect>
//                   </td>

//                   <td>
//                     <CFormSelect>
//                       <option selected="selected">Giáo viên</option>
//                       {listteacher.map((item) => (
//                         <option
//                           key={item.userId}
//                           value={item.userId}
//                           label={item.displayName}
//                         ></option>
//                       ))}
//                     </CFormSelect>
//                   </td>
//                 </tr>
//                 <tr>
//                   <td style={{ textAlign: "center", width: "180px" }}>
//                     Tiết 9
//                   </td>
//                   <td>
//                     <CFormSelect>
//                       <option selected="selected">Môn học</option>
//                       <option value={1} label="Toán"></option>
//                       <option value={2} label="Vật lí"></option>
//                       <option value={3} label="Hóa học"></option>
//                       <option value={4} label="Văn học"></option>
//                       <option value={5} label="Lịch sử"></option>
//                       <option value={6} label="Địa lí"></option>
//                       <option value={7} label="Sinh học"></option>
//                       <option value={8} label="Tiếng anh"></option>
//                       <option value={9} label="GDCD"></option>
//                       <option value={10} label="Công nghệ"></option>
//                       <option value={11} label="GDQPAN"></option>
//                       <option value={12} label="Thể dục"></option>
//                       <option value={13} label="Tin học"></option>
//                     </CFormSelect>
//                   </td>

//                   <td>
//                     <CFormSelect>
//                       <option selected="selected">Giáo viên</option>
//                       {listteacher.map((item) => (
//                         <option
//                           key={item.userId}
//                           value={item.userId}
//                           label={item.displayName}
//                         ></option>
//                       ))}
//                     </CFormSelect>
//                   </td>
//                 </tr>
//                 <tr>
//                   <td style={{ textAlign: "center", width: "180px" }}>
//                     Tiết 10
//                   </td>
//                   <td>
//                     <CFormSelect>
//                       <option selected="selected">Môn học</option>
//                       <option value={1} label="Toán"></option>
//                       <option value={2} label="Vật lí"></option>
//                       <option value={3} label="Hóa học"></option>
//                       <option value={4} label="Văn học"></option>
//                       <option value={5} label="Lịch sử"></option>
//                       <option value={6} label="Địa lí"></option>
//                       <option value={7} label="Sinh học"></option>
//                       <option value={8} label="Tiếng anh"></option>
//                       <option value={9} label="GDCD"></option>
//                       <option value={10} label="Công nghệ"></option>
//                       <option value={11} label="GDQPAN"></option>
//                       <option value={12} label="Thể dục"></option>
//                       <option value={13} label="Tin học"></option>
//                     </CFormSelect>
//                   </td>

//                   <td>
//                     <CFormSelect>
//                       <option selected="selected">Giáo viên</option>
//                       {listteacher.map((item) => (
//                         <option
//                           key={item.userId}
//                           value={item.userId}
//                           label={item.displayName}
//                         ></option>
//                       ))}
//                     </CFormSelect>
//                   </td>
//                 </tr>
//                 <tr>
//                   <td
//                     style={{ textAlign: "center", width: "20%" }}
//                     rowSpan={10}
//                   >
//                     Thứ 4
//                   </td>
//                   <td style={{ textAlign: "center", width: "10%" }}>Tiết 1</td>
//                   <td style={{ textAlign: "center", width: "35%" }}>
//                     <CFormSelect>
//                       <option selected="selected">Môn học</option>
//                       <option value={1} label="Toán"></option>
//                       <option value={2} label="Vật lí"></option>
//                       <option value={3} label="Hóa học"></option>
//                       <option value={4} label="Văn học"></option>
//                       <option value={5} label="Lịch sử"></option>
//                       <option value={6} label="Địa lí"></option>
//                       <option value={7} label="Sinh học"></option>
//                       <option value={8} label="Tiếng anh"></option>
//                       <option value={9} label="GDCD"></option>
//                       <option value={10} label="Công nghệ"></option>
//                       <option value={11} label="GDQPAN"></option>
//                       <option value={12} label="Thể dục"></option>
//                       <option value={13} label="Tin học"></option>
//                     </CFormSelect>
//                   </td>

//                   <td style={{ textAlign: "center", width: "35%" }}>
//                     <CFormSelect>
//                       <option selected="selected">Giáo viên</option>
//                       {listteacher.map((item) => (
//                         <option
//                           key={item.userId}
//                           value={item.userId}
//                           label={item.displayName}
//                         ></option>
//                       ))}
//                     </CFormSelect>
//                   </td>
//                 </tr>
//                 <tr>
//                   <td style={{ textAlign: "center", width: "180px" }}>
//                     Tiết 2
//                   </td>
//                   <td>
//                     <CFormSelect>
//                       <option selected="selected">Môn học</option>
//                       <option value={1} label="Toán"></option>
//                       <option value={2} label="Vật lí"></option>
//                       <option value={3} label="Hóa học"></option>
//                       <option value={4} label="Văn học"></option>
//                       <option value={5} label="Lịch sử"></option>
//                       <option value={6} label="Địa lí"></option>
//                       <option value={7} label="Sinh học"></option>
//                       <option value={8} label="Tiếng anh"></option>
//                       <option value={9} label="GDCD"></option>
//                       <option value={10} label="Công nghệ"></option>
//                       <option value={11} label="GDQPAN"></option>
//                       <option value={12} label="Thể dục"></option>
//                       <option value={13} label="Tin học"></option>
//                     </CFormSelect>
//                   </td>

//                   <td>
//                     <CFormSelect>
//                       <option selected="selected">Giáo viên</option>
//                       {listteacher.map((item) => (
//                         <option
//                           key={item.userId}
//                           value={item.userId}
//                           label={item.displayName}
//                         ></option>
//                       ))}
//                     </CFormSelect>
//                   </td>
//                 </tr>
//                 <tr>
//                   <td style={{ textAlign: "center", width: "180px" }}>
//                     Tiết 3
//                   </td>
//                   <td>
//                     <CFormSelect>
//                       <option selected="selected">Môn học</option>
//                       <option value={1} label="Toán"></option>
//                       <option value={2} label="Vật lí"></option>
//                       <option value={3} label="Hóa học"></option>
//                       <option value={4} label="Văn học"></option>
//                       <option value={5} label="Lịch sử"></option>
//                       <option value={6} label="Địa lí"></option>
//                       <option value={7} label="Sinh học"></option>
//                       <option value={8} label="Tiếng anh"></option>
//                       <option value={9} label="GDCD"></option>
//                       <option value={10} label="Công nghệ"></option>
//                       <option value={11} label="GDQPAN"></option>
//                       <option value={12} label="Thể dục"></option>
//                       <option value={13} label="Tin học"></option>
//                     </CFormSelect>
//                   </td>

//                   <td>
//                     <CFormSelect>
//                       <option selected="selected">Giáo viên</option>
//                       {listteacher.map((item) => (
//                         <option
//                           key={item.userId}
//                           value={item.userId}
//                           label={item.displayName}
//                         ></option>
//                       ))}
//                     </CFormSelect>
//                   </td>
//                 </tr>
//                 <tr>
//                   <td style={{ textAlign: "center", width: "180px" }}>
//                     Tiết 4
//                   </td>
//                   <td>
//                     <CFormSelect>
//                       <option selected="selected">Môn học</option>
//                       <option value={1} label="Toán"></option>
//                       <option value={2} label="Vật lí"></option>
//                       <option value={3} label="Hóa học"></option>
//                       <option value={4} label="Văn học"></option>
//                       <option value={5} label="Lịch sử"></option>
//                       <option value={6} label="Địa lí"></option>
//                       <option value={7} label="Sinh học"></option>
//                       <option value={8} label="Tiếng anh"></option>
//                       <option value={9} label="GDCD"></option>
//                       <option value={10} label="Công nghệ"></option>
//                       <option value={11} label="GDQPAN"></option>
//                       <option value={12} label="Thể dục"></option>
//                       <option value={13} label="Tin học"></option>
//                     </CFormSelect>
//                   </td>

//                   <td>
//                     <CFormSelect>
//                       <option selected="selected">Giáo viên</option>
//                       {listteacher.map((item) => (
//                         <option
//                           key={item.userId}
//                           value={item.userId}
//                           label={item.displayName}
//                         ></option>
//                       ))}
//                     </CFormSelect>
//                   </td>
//                 </tr>
//                 <tr>
//                   <td style={{ textAlign: "center", width: "180px" }}>
//                     Tiết 5
//                   </td>
//                   <td>
//                     <CFormSelect>
//                       <option selected="selected">Môn học</option>
//                       <option value={1} label="Toán"></option>
//                       <option value={2} label="Vật lí"></option>
//                       <option value={3} label="Hóa học"></option>
//                       <option value={4} label="Văn học"></option>
//                       <option value={5} label="Lịch sử"></option>
//                       <option value={6} label="Địa lí"></option>
//                       <option value={7} label="Sinh học"></option>
//                       <option value={8} label="Tiếng anh"></option>
//                       <option value={9} label="GDCD"></option>
//                       <option value={10} label="Công nghệ"></option>
//                       <option value={11} label="GDQPAN"></option>
//                       <option value={12} label="Thể dục"></option>
//                       <option value={13} label="Tin học"></option>
//                     </CFormSelect>
//                   </td>

//                   <td>
//                     <CFormSelect>
//                       <option selected="selected">Giáo viên</option>
//                       {listteacher.map((item) => (
//                         <option
//                           key={item.userId}
//                           value={item.userId}
//                           label={item.displayName}
//                         ></option>
//                       ))}
//                     </CFormSelect>
//                   </td>
//                 </tr>
//                 <tr>
//                   <td style={{ textAlign: "center", width: "180px" }}>
//                     Tiết 6
//                   </td>
//                   <td>
//                     <CFormSelect>
//                       <option selected="selected">Môn học</option>
//                       <option value={1} label="Toán"></option>
//                       <option value={2} label="Vật lí"></option>
//                       <option value={3} label="Hóa học"></option>
//                       <option value={4} label="Văn học"></option>
//                       <option value={5} label="Lịch sử"></option>
//                       <option value={6} label="Địa lí"></option>
//                       <option value={7} label="Sinh học"></option>
//                       <option value={8} label="Tiếng anh"></option>
//                       <option value={9} label="GDCD"></option>
//                       <option value={10} label="Công nghệ"></option>
//                       <option value={11} label="GDQPAN"></option>
//                       <option value={12} label="Thể dục"></option>
//                       <option value={13} label="Tin học"></option>
//                     </CFormSelect>
//                   </td>

//                   <td>
//                     <CFormSelect>
//                       <option selected="selected">Giáo viên</option>
//                       {listteacher.map((item) => (
//                         <option
//                           key={item.userId}
//                           value={item.userId}
//                           label={item.displayName}
//                         ></option>
//                       ))}
//                     </CFormSelect>
//                   </td>
//                 </tr>
//                 <tr>
//                   <td style={{ textAlign: "center", width: "180px" }}>
//                     Tiết 7
//                   </td>
//                   <td>
//                     <CFormSelect>
//                       <option selected="selected">Môn học</option>
//                       <option value={1} label="Toán"></option>
//                       <option value={2} label="Vật lí"></option>
//                       <option value={3} label="Hóa học"></option>
//                       <option value={4} label="Văn học"></option>
//                       <option value={5} label="Lịch sử"></option>
//                       <option value={6} label="Địa lí"></option>
//                       <option value={7} label="Sinh học"></option>
//                       <option value={8} label="Tiếng anh"></option>
//                       <option value={9} label="GDCD"></option>
//                       <option value={10} label="Công nghệ"></option>
//                       <option value={11} label="GDQPAN"></option>
//                       <option value={12} label="Thể dục"></option>
//                       <option value={13} label="Tin học"></option>
//                     </CFormSelect>
//                   </td>

//                   <td>
//                     <CFormSelect>
//                       <option selected="selected">Giáo viên</option>
//                       {listteacher.map((item) => (
//                         <option
//                           key={item.userId}
//                           value={item.userId}
//                           label={item.displayName}
//                         ></option>
//                       ))}
//                     </CFormSelect>
//                   </td>
//                 </tr>
//                 <tr>
//                   <td style={{ textAlign: "center", width: "180px" }}>
//                     Tiết 8
//                   </td>
//                   <td>
//                     <CFormSelect>
//                       <option selected="selected">Môn học</option>
//                       <option value={1} label="Toán"></option>
//                       <option value={2} label="Vật lí"></option>
//                       <option value={3} label="Hóa học"></option>
//                       <option value={4} label="Văn học"></option>
//                       <option value={5} label="Lịch sử"></option>
//                       <option value={6} label="Địa lí"></option>
//                       <option value={7} label="Sinh học"></option>
//                       <option value={8} label="Tiếng anh"></option>
//                       <option value={9} label="GDCD"></option>
//                       <option value={10} label="Công nghệ"></option>
//                       <option value={11} label="GDQPAN"></option>
//                       <option value={12} label="Thể dục"></option>
//                       <option value={13} label="Tin học"></option>
//                     </CFormSelect>
//                   </td>

//                   <td>
//                     <CFormSelect>
//                       <option selected="selected">Giáo viên</option>
//                       {listteacher.map((item) => (
//                         <option
//                           key={item.userId}
//                           value={item.userId}
//                           label={item.displayName}
//                         ></option>
//                       ))}
//                     </CFormSelect>
//                   </td>
//                 </tr>
//                 <tr>
//                   <td style={{ textAlign: "center", width: "180px" }}>
//                     Tiết 9
//                   </td>
//                   <td>
//                     <CFormSelect>
//                       <option selected="selected">Môn học</option>
//                       <option value={1} label="Toán"></option>
//                       <option value={2} label="Vật lí"></option>
//                       <option value={3} label="Hóa học"></option>
//                       <option value={4} label="Văn học"></option>
//                       <option value={5} label="Lịch sử"></option>
//                       <option value={6} label="Địa lí"></option>
//                       <option value={7} label="Sinh học"></option>
//                       <option value={8} label="Tiếng anh"></option>
//                       <option value={9} label="GDCD"></option>
//                       <option value={10} label="Công nghệ"></option>
//                       <option value={11} label="GDQPAN"></option>
//                       <option value={12} label="Thể dục"></option>
//                       <option value={13} label="Tin học"></option>
//                     </CFormSelect>
//                   </td>

//                   <td>
//                     <CFormSelect>
//                       <option selected="selected">Giáo viên</option>
//                       {listteacher.map((item) => (
//                         <option
//                           key={item.userId}
//                           value={item.userId}
//                           label={item.displayName}
//                         ></option>
//                       ))}
//                     </CFormSelect>
//                   </td>
//                 </tr>
//                 <tr>
//                   <td style={{ textAlign: "center", width: "180px" }}>
//                     Tiết 10
//                   </td>
//                   <td>
//                     <CFormSelect>
//                       <option selected="selected">Môn học</option>
//                       <option value={1} label="Toán"></option>
//                       <option value={2} label="Vật lí"></option>
//                       <option value={3} label="Hóa học"></option>
//                       <option value={4} label="Văn học"></option>
//                       <option value={5} label="Lịch sử"></option>
//                       <option value={6} label="Địa lí"></option>
//                       <option value={7} label="Sinh học"></option>
//                       <option value={8} label="Tiếng anh"></option>
//                       <option value={9} label="GDCD"></option>
//                       <option value={10} label="Công nghệ"></option>
//                       <option value={11} label="GDQPAN"></option>
//                       <option value={12} label="Thể dục"></option>
//                       <option value={13} label="Tin học"></option>
//                     </CFormSelect>
//                   </td>

//                   <td>
//                     <CFormSelect>
//                       <option selected="selected">Giáo viên</option>
//                       {listteacher.map((item) => (
//                         <option
//                           key={item.userId}
//                           value={item.userId}
//                           label={item.displayName}
//                         ></option>
//                       ))}
//                     </CFormSelect>
//                   </td>
//                 </tr>
//                 <tr>
//                   <td
//                     style={{ textAlign: "center", width: "20%" }}
//                     rowSpan={10}
//                   >
//                     Thứ 5
//                   </td>
//                   <td style={{ textAlign: "center", width: "10%" }}>Tiết 1</td>
//                   <td style={{ textAlign: "center", width: "35%" }}>
//                     <CFormSelect>
//                       <option selected="selected">Môn học</option>
//                       <option value={1} label="Toán"></option>
//                       <option value={2} label="Vật lí"></option>
//                       <option value={3} label="Hóa học"></option>
//                       <option value={4} label="Văn học"></option>
//                       <option value={5} label="Lịch sử"></option>
//                       <option value={6} label="Địa lí"></option>
//                       <option value={7} label="Sinh học"></option>
//                       <option value={8} label="Tiếng anh"></option>
//                       <option value={9} label="GDCD"></option>
//                       <option value={10} label="Công nghệ"></option>
//                       <option value={11} label="GDQPAN"></option>
//                       <option value={12} label="Thể dục"></option>
//                       <option value={13} label="Tin học"></option>
//                     </CFormSelect>
//                   </td>

//                   <td style={{ textAlign: "center", width: "35%" }}>
//                     <CFormSelect>
//                       <option selected="selected">Giáo viên</option>
//                       {listteacher.map((item) => (
//                         <option
//                           key={item.userId}
//                           value={item.userId}
//                           label={item.displayName}
//                         ></option>
//                       ))}
//                     </CFormSelect>
//                   </td>
//                 </tr>
//                 <tr>
//                   <td style={{ textAlign: "center", width: "180px" }}>
//                     Tiết 2
//                   </td>
//                   <td>
//                     <CFormSelect>
//                       <option selected="selected">Môn học</option>
//                       <option value={1} label="Toán"></option>
//                       <option value={2} label="Vật lí"></option>
//                       <option value={3} label="Hóa học"></option>
//                       <option value={4} label="Văn học"></option>
//                       <option value={5} label="Lịch sử"></option>
//                       <option value={6} label="Địa lí"></option>
//                       <option value={7} label="Sinh học"></option>
//                       <option value={8} label="Tiếng anh"></option>
//                       <option value={9} label="GDCD"></option>
//                       <option value={10} label="Công nghệ"></option>
//                       <option value={11} label="GDQPAN"></option>
//                       <option value={12} label="Thể dục"></option>
//                       <option value={13} label="Tin học"></option>
//                     </CFormSelect>
//                   </td>

//                   <td>
//                     <CFormSelect>
//                       <option selected="selected">Giáo viên</option>
//                       {listteacher.map((item) => (
//                         <option
//                           key={item.userId}
//                           value={item.userId}
//                           label={item.displayName}
//                         ></option>
//                       ))}
//                     </CFormSelect>
//                   </td>
//                 </tr>
//                 <tr>
//                   <td style={{ textAlign: "center", width: "180px" }}>
//                     Tiết 3
//                   </td>
//                   <td>
//                     <CFormSelect>
//                       <option selected="selected">Môn học</option>
//                       <option value={1} label="Toán"></option>
//                       <option value={2} label="Vật lí"></option>
//                       <option value={3} label="Hóa học"></option>
//                       <option value={4} label="Văn học"></option>
//                       <option value={5} label="Lịch sử"></option>
//                       <option value={6} label="Địa lí"></option>
//                       <option value={7} label="Sinh học"></option>
//                       <option value={8} label="Tiếng anh"></option>
//                       <option value={9} label="GDCD"></option>
//                       <option value={10} label="Công nghệ"></option>
//                       <option value={11} label="GDQPAN"></option>
//                       <option value={12} label="Thể dục"></option>
//                       <option value={13} label="Tin học"></option>
//                     </CFormSelect>
//                   </td>

//                   <td>
//                     <CFormSelect>
//                       <option selected="selected">Giáo viên</option>
//                       {listteacher.map((item) => (
//                         <option
//                           key={item.userId}
//                           value={item.userId}
//                           label={item.displayName}
//                         ></option>
//                       ))}
//                     </CFormSelect>
//                   </td>
//                 </tr>
//                 <tr>
//                   <td style={{ textAlign: "center", width: "180px" }}>
//                     Tiết 4
//                   </td>
//                   <td>
//                     <CFormSelect>
//                       <option selected="selected">Môn học</option>
//                       <option value={1} label="Toán"></option>
//                       <option value={2} label="Vật lí"></option>
//                       <option value={3} label="Hóa học"></option>
//                       <option value={4} label="Văn học"></option>
//                       <option value={5} label="Lịch sử"></option>
//                       <option value={6} label="Địa lí"></option>
//                       <option value={7} label="Sinh học"></option>
//                       <option value={8} label="Tiếng anh"></option>
//                       <option value={9} label="GDCD"></option>
//                       <option value={10} label="Công nghệ"></option>
//                       <option value={11} label="GDQPAN"></option>
//                       <option value={12} label="Thể dục"></option>
//                       <option value={13} label="Tin học"></option>
//                     </CFormSelect>
//                   </td>

//                   <td>
//                     <CFormSelect>
//                       <option selected="selected">Giáo viên</option>
//                       {listteacher.map((item) => (
//                         <option
//                           key={item.userId}
//                           value={item.userId}
//                           label={item.displayName}
//                         ></option>
//                       ))}
//                     </CFormSelect>
//                   </td>
//                 </tr>
//                 <tr>
//                   <td style={{ textAlign: "center", width: "180px" }}>
//                     Tiết 5
//                   </td>
//                   <td>
//                     <CFormSelect>
//                       <option selected="selected">Môn học</option>
//                       <option value={1} label="Toán"></option>
//                       <option value={2} label="Vật lí"></option>
//                       <option value={3} label="Hóa học"></option>
//                       <option value={4} label="Văn học"></option>
//                       <option value={5} label="Lịch sử"></option>
//                       <option value={6} label="Địa lí"></option>
//                       <option value={7} label="Sinh học"></option>
//                       <option value={8} label="Tiếng anh"></option>
//                       <option value={9} label="GDCD"></option>
//                       <option value={10} label="Công nghệ"></option>
//                       <option value={11} label="GDQPAN"></option>
//                       <option value={12} label="Thể dục"></option>
//                       <option value={13} label="Tin học"></option>
//                     </CFormSelect>
//                   </td>

//                   <td>
//                     <CFormSelect>
//                       <option selected="selected">Giáo viên</option>
//                       {listteacher.map((item) => (
//                         <option
//                           key={item.userId}
//                           value={item.userId}
//                           label={item.displayName}
//                         ></option>
//                       ))}
//                     </CFormSelect>
//                   </td>
//                 </tr>
//                 <tr>
//                   <td style={{ textAlign: "center", width: "180px" }}>
//                     Tiết 6
//                   </td>
//                   <td>
//                     <CFormSelect>
//                       <option selected="selected">Môn học</option>
//                       <option value={1} label="Toán"></option>
//                       <option value={2} label="Vật lí"></option>
//                       <option value={3} label="Hóa học"></option>
//                       <option value={4} label="Văn học"></option>
//                       <option value={5} label="Lịch sử"></option>
//                       <option value={6} label="Địa lí"></option>
//                       <option value={7} label="Sinh học"></option>
//                       <option value={8} label="Tiếng anh"></option>
//                       <option value={9} label="GDCD"></option>
//                       <option value={10} label="Công nghệ"></option>
//                       <option value={11} label="GDQPAN"></option>
//                       <option value={12} label="Thể dục"></option>
//                       <option value={13} label="Tin học"></option>
//                     </CFormSelect>
//                   </td>

//                   <td>
//                     <CFormSelect>
//                       <option selected="selected">Giáo viên</option>
//                       {listteacher.map((item) => (
//                         <option
//                           key={item.userId}
//                           value={item.userId}
//                           label={item.displayName}
//                         ></option>
//                       ))}
//                     </CFormSelect>
//                   </td>
//                 </tr>
//                 <tr>
//                   <td style={{ textAlign: "center", width: "180px" }}>
//                     Tiết 7
//                   </td>
//                   <td>
//                     <CFormSelect>
//                       <option selected="selected">Môn học</option>
//                       <option value={1} label="Toán"></option>
//                       <option value={2} label="Vật lí"></option>
//                       <option value={3} label="Hóa học"></option>
//                       <option value={4} label="Văn học"></option>
//                       <option value={5} label="Lịch sử"></option>
//                       <option value={6} label="Địa lí"></option>
//                       <option value={7} label="Sinh học"></option>
//                       <option value={8} label="Tiếng anh"></option>
//                       <option value={9} label="GDCD"></option>
//                       <option value={10} label="Công nghệ"></option>
//                       <option value={11} label="GDQPAN"></option>
//                       <option value={12} label="Thể dục"></option>
//                       <option value={13} label="Tin học"></option>
//                     </CFormSelect>
//                   </td>

//                   <td>
//                     <CFormSelect>
//                       <option selected="selected">Giáo viên</option>
//                       {listteacher.map((item) => (
//                         <option
//                           key={item.userId}
//                           value={item.userId}
//                           label={item.displayName}
//                         ></option>
//                       ))}
//                     </CFormSelect>
//                   </td>
//                 </tr>
//                 <tr>
//                   <td style={{ textAlign: "center", width: "180px" }}>
//                     Tiết 8
//                   </td>
//                   <td>
//                     <CFormSelect>
//                       <option selected="selected">Môn học</option>
//                       <option value={1} label="Toán"></option>
//                       <option value={2} label="Vật lí"></option>
//                       <option value={3} label="Hóa học"></option>
//                       <option value={4} label="Văn học"></option>
//                       <option value={5} label="Lịch sử"></option>
//                       <option value={6} label="Địa lí"></option>
//                       <option value={7} label="Sinh học"></option>
//                       <option value={8} label="Tiếng anh"></option>
//                       <option value={9} label="GDCD"></option>
//                       <option value={10} label="Công nghệ"></option>
//                       <option value={11} label="GDQPAN"></option>
//                       <option value={12} label="Thể dục"></option>
//                       <option value={13} label="Tin học"></option>
//                     </CFormSelect>
//                   </td>

//                   <td>
//                     <CFormSelect>
//                       <option selected="selected">Giáo viên</option>
//                       {listteacher.map((item) => (
//                         <option
//                           key={item.userId}
//                           value={item.userId}
//                           label={item.displayName}
//                         ></option>
//                       ))}
//                     </CFormSelect>
//                   </td>
//                 </tr>
//                 <tr>
//                   <td style={{ textAlign: "center", width: "180px" }}>
//                     Tiết 9
//                   </td>
//                   <td>
//                     <CFormSelect>
//                       <option selected="selected">Môn học</option>
//                       <option value={1} label="Toán"></option>
//                       <option value={2} label="Vật lí"></option>
//                       <option value={3} label="Hóa học"></option>
//                       <option value={4} label="Văn học"></option>
//                       <option value={5} label="Lịch sử"></option>
//                       <option value={6} label="Địa lí"></option>
//                       <option value={7} label="Sinh học"></option>
//                       <option value={8} label="Tiếng anh"></option>
//                       <option value={9} label="GDCD"></option>
//                       <option value={10} label="Công nghệ"></option>
//                       <option value={11} label="GDQPAN"></option>
//                       <option value={12} label="Thể dục"></option>
//                       <option value={13} label="Tin học"></option>
//                     </CFormSelect>
//                   </td>

//                   <td>
//                     <CFormSelect>
//                       <option selected="selected">Giáo viên</option>
//                       {listteacher.map((item) => (
//                         <option
//                           key={item.userId}
//                           value={item.userId}
//                           label={item.displayName}
//                         ></option>
//                       ))}
//                     </CFormSelect>
//                   </td>
//                 </tr>
//                 <tr>
//                   <td style={{ textAlign: "center", width: "180px" }}>
//                     Tiết 10
//                   </td>
//                   <td>
//                     <CFormSelect>
//                       <option selected="selected">Môn học</option>
//                       <option value={1} label="Toán"></option>
//                       <option value={2} label="Vật lí"></option>
//                       <option value={3} label="Hóa học"></option>
//                       <option value={4} label="Văn học"></option>
//                       <option value={5} label="Lịch sử"></option>
//                       <option value={6} label="Địa lí"></option>
//                       <option value={7} label="Sinh học"></option>
//                       <option value={8} label="Tiếng anh"></option>
//                       <option value={9} label="GDCD"></option>
//                       <option value={10} label="Công nghệ"></option>
//                       <option value={11} label="GDQPAN"></option>
//                       <option value={12} label="Thể dục"></option>
//                       <option value={13} label="Tin học"></option>
//                     </CFormSelect>
//                   </td>

//                   <td>
//                     <CFormSelect>
//                       <option selected="selected">Giáo viên</option>
//                       {listteacher.map((item) => (
//                         <option
//                           key={item.userId}
//                           value={item.userId}
//                           label={item.displayName}
//                         ></option>
//                       ))}
//                     </CFormSelect>
//                   </td>
//                 </tr>
//                 <tr>
//                   <td
//                     style={{ textAlign: "center", width: "20%" }}
//                     rowSpan={10}
//                   >
//                     Thứ 6
//                   </td>
//                   <td style={{ textAlign: "center", width: "10%" }}>Tiết 1</td>
//                   <td style={{ textAlign: "center", width: "35%" }}>
//                     <CFormSelect>
//                       <option selected="selected">Môn học</option>
//                       <option value={1} label="Toán"></option>
//                       <option value={2} label="Vật lí"></option>
//                       <option value={3} label="Hóa học"></option>
//                       <option value={4} label="Văn học"></option>
//                       <option value={5} label="Lịch sử"></option>
//                       <option value={6} label="Địa lí"></option>
//                       <option value={7} label="Sinh học"></option>
//                       <option value={8} label="Tiếng anh"></option>
//                       <option value={9} label="GDCD"></option>
//                       <option value={10} label="Công nghệ"></option>
//                       <option value={11} label="GDQPAN"></option>
//                       <option value={12} label="Thể dục"></option>
//                       <option value={13} label="Tin học"></option>
//                     </CFormSelect>
//                   </td>

//                   <td style={{ textAlign: "center", width: "35%" }}>
//                     <CFormSelect>
//                       <option selected="selected">Giáo viên</option>
//                       {listteacher.map((item) => (
//                         <option
//                           key={item.userId}
//                           value={item.userId}
//                           label={item.displayName}
//                         ></option>
//                       ))}
//                     </CFormSelect>
//                   </td>
//                 </tr>
//                 <tr>
//                   <td style={{ textAlign: "center", width: "180px" }}>
//                     Tiết 2
//                   </td>
//                   <td>
//                     <CFormSelect>
//                       <option selected="selected">Môn học</option>
//                       <option value={1} label="Toán"></option>
//                       <option value={2} label="Vật lí"></option>
//                       <option value={3} label="Hóa học"></option>
//                       <option value={4} label="Văn học"></option>
//                       <option value={5} label="Lịch sử"></option>
//                       <option value={6} label="Địa lí"></option>
//                       <option value={7} label="Sinh học"></option>
//                       <option value={8} label="Tiếng anh"></option>
//                       <option value={9} label="GDCD"></option>
//                       <option value={10} label="Công nghệ"></option>
//                       <option value={11} label="GDQPAN"></option>
//                       <option value={12} label="Thể dục"></option>
//                       <option value={13} label="Tin học"></option>
//                     </CFormSelect>
//                   </td>

//                   <td>
//                     <CFormSelect>
//                       <option selected="selected">Giáo viên</option>
//                       {listteacher.map((item) => (
//                         <option
//                           key={item.userId}
//                           value={item.userId}
//                           label={item.displayName}
//                         ></option>
//                       ))}
//                     </CFormSelect>
//                   </td>
//                 </tr>
//                 <tr>
//                   <td style={{ textAlign: "center", width: "180px" }}>
//                     Tiết 3
//                   </td>
//                   <td>
//                     <CFormSelect>
//                       <option selected="selected">Môn học</option>
//                       <option value={1} label="Toán"></option>
//                       <option value={2} label="Vật lí"></option>
//                       <option value={3} label="Hóa học"></option>
//                       <option value={4} label="Văn học"></option>
//                       <option value={5} label="Lịch sử"></option>
//                       <option value={6} label="Địa lí"></option>
//                       <option value={7} label="Sinh học"></option>
//                       <option value={8} label="Tiếng anh"></option>
//                       <option value={9} label="GDCD"></option>
//                       <option value={10} label="Công nghệ"></option>
//                       <option value={11} label="GDQPAN"></option>
//                       <option value={12} label="Thể dục"></option>
//                       <option value={13} label="Tin học"></option>
//                     </CFormSelect>
//                   </td>

//                   <td>
//                     <CFormSelect>
//                       <option selected="selected">Giáo viên</option>
//                       {listteacher.map((item) => (
//                         <option
//                           key={item.userId}
//                           value={item.userId}
//                           label={item.displayName}
//                         ></option>
//                       ))}
//                     </CFormSelect>
//                   </td>
//                 </tr>
//                 <tr>
//                   <td style={{ textAlign: "center", width: "180px" }}>
//                     Tiết 4
//                   </td>
//                   <td>
//                     <CFormSelect>
//                       <option selected="selected">Môn học</option>
//                       <option value={1} label="Toán"></option>
//                       <option value={2} label="Vật lí"></option>
//                       <option value={3} label="Hóa học"></option>
//                       <option value={4} label="Văn học"></option>
//                       <option value={5} label="Lịch sử"></option>
//                       <option value={6} label="Địa lí"></option>
//                       <option value={7} label="Sinh học"></option>
//                       <option value={8} label="Tiếng anh"></option>
//                       <option value={9} label="GDCD"></option>
//                       <option value={10} label="Công nghệ"></option>
//                       <option value={11} label="GDQPAN"></option>
//                       <option value={12} label="Thể dục"></option>
//                       <option value={13} label="Tin học"></option>
//                     </CFormSelect>
//                   </td>

//                   <td>
//                     <CFormSelect>
//                       <option selected="selected">Giáo viên</option>
//                       {listteacher.map((item) => (
//                         <option
//                           key={item.userId}
//                           value={item.userId}
//                           label={item.displayName}
//                         ></option>
//                       ))}
//                     </CFormSelect>
//                   </td>
//                 </tr>
//                 <tr>
//                   <td style={{ textAlign: "center", width: "180px" }}>
//                     Tiết 5
//                   </td>
//                   <td>
//                     <CFormSelect>
//                       <option selected="selected">Môn học</option>
//                       <option value={1} label="Toán"></option>
//                       <option value={2} label="Vật lí"></option>
//                       <option value={3} label="Hóa học"></option>
//                       <option value={4} label="Văn học"></option>
//                       <option value={5} label="Lịch sử"></option>
//                       <option value={6} label="Địa lí"></option>
//                       <option value={7} label="Sinh học"></option>
//                       <option value={8} label="Tiếng anh"></option>
//                       <option value={9} label="GDCD"></option>
//                       <option value={10} label="Công nghệ"></option>
//                       <option value={11} label="GDQPAN"></option>
//                       <option value={12} label="Thể dục"></option>
//                       <option value={13} label="Tin học"></option>
//                     </CFormSelect>
//                   </td>

//                   <td>
//                     <CFormSelect>
//                       <option selected="selected">Giáo viên</option>
//                       {listteacher.map((item) => (
//                         <option
//                           key={item.userId}
//                           value={item.userId}
//                           label={item.displayName}
//                         ></option>
//                       ))}
//                     </CFormSelect>
//                   </td>
//                 </tr>
//                 <tr>
//                   <td style={{ textAlign: "center", width: "180px" }}>
//                     Tiết 6
//                   </td>
//                   <td>
//                     <CFormSelect>
//                       <option selected="selected">Môn học</option>
//                       <option value={1} label="Toán"></option>
//                       <option value={2} label="Vật lí"></option>
//                       <option value={3} label="Hóa học"></option>
//                       <option value={4} label="Văn học"></option>
//                       <option value={5} label="Lịch sử"></option>
//                       <option value={6} label="Địa lí"></option>
//                       <option value={7} label="Sinh học"></option>
//                       <option value={8} label="Tiếng anh"></option>
//                       <option value={9} label="GDCD"></option>
//                       <option value={10} label="Công nghệ"></option>
//                       <option value={11} label="GDQPAN"></option>
//                       <option value={12} label="Thể dục"></option>
//                       <option value={13} label="Tin học"></option>
//                     </CFormSelect>
//                   </td>

//                   <td>
//                     <CFormSelect>
//                       <option selected="selected">Giáo viên</option>
//                       {listteacher.map((item) => (
//                         <option
//                           key={item.userId}
//                           value={item.userId}
//                           label={item.displayName}
//                         ></option>
//                       ))}
//                     </CFormSelect>
//                   </td>
//                 </tr>
//                 <tr>
//                   <td style={{ textAlign: "center", width: "180px" }}>
//                     Tiết 7
//                   </td>
//                   <td>
//                     <CFormSelect>
//                       <option selected="selected">Môn học</option>
//                       <option value={1} label="Toán"></option>
//                       <option value={2} label="Vật lí"></option>
//                       <option value={3} label="Hóa học"></option>
//                       <option value={4} label="Văn học"></option>
//                       <option value={5} label="Lịch sử"></option>
//                       <option value={6} label="Địa lí"></option>
//                       <option value={7} label="Sinh học"></option>
//                       <option value={8} label="Tiếng anh"></option>
//                       <option value={9} label="GDCD"></option>
//                       <option value={10} label="Công nghệ"></option>
//                       <option value={11} label="GDQPAN"></option>
//                       <option value={12} label="Thể dục"></option>
//                       <option value={13} label="Tin học"></option>
//                     </CFormSelect>
//                   </td>

//                   <td>
//                     <CFormSelect>
//                       <option selected="selected">Giáo viên</option>
//                       {listteacher.map((item) => (
//                         <option
//                           key={item.userId}
//                           value={item.userId}
//                           label={item.displayName}
//                         ></option>
//                       ))}
//                     </CFormSelect>
//                   </td>
//                 </tr>
//                 <tr>
//                   <td style={{ textAlign: "center", width: "180px" }}>
//                     Tiết 8
//                   </td>
//                   <td>
//                     <CFormSelect>
//                       <option selected="selected">Môn học</option>
//                       <option value={1} label="Toán"></option>
//                       <option value={2} label="Vật lí"></option>
//                       <option value={3} label="Hóa học"></option>
//                       <option value={4} label="Văn học"></option>
//                       <option value={5} label="Lịch sử"></option>
//                       <option value={6} label="Địa lí"></option>
//                       <option value={7} label="Sinh học"></option>
//                       <option value={8} label="Tiếng anh"></option>
//                       <option value={9} label="GDCD"></option>
//                       <option value={10} label="Công nghệ"></option>
//                       <option value={11} label="GDQPAN"></option>
//                       <option value={12} label="Thể dục"></option>
//                       <option value={13} label="Tin học"></option>
//                     </CFormSelect>
//                   </td>

//                   <td>
//                     <CFormSelect>
//                       <option selected="selected">Giáo viên</option>
//                       {listteacher.map((item) => (
//                         <option
//                           key={item.userId}
//                           value={item.userId}
//                           label={item.displayName}
//                         ></option>
//                       ))}
//                     </CFormSelect>
//                   </td>
//                 </tr>
//                 <tr>
//                   <td style={{ textAlign: "center", width: "180px" }}>
//                     Tiết 9
//                   </td>
//                   <td>
//                     <CFormSelect>
//                       <option selected="selected">Môn học</option>
//                       <option value={1} label="Toán"></option>
//                       <option value={2} label="Vật lí"></option>
//                       <option value={3} label="Hóa học"></option>
//                       <option value={4} label="Văn học"></option>
//                       <option value={5} label="Lịch sử"></option>
//                       <option value={6} label="Địa lí"></option>
//                       <option value={7} label="Sinh học"></option>
//                       <option value={8} label="Tiếng anh"></option>
//                       <option value={9} label="GDCD"></option>
//                       <option value={10} label="Công nghệ"></option>
//                       <option value={11} label="GDQPAN"></option>
//                       <option value={12} label="Thể dục"></option>
//                       <option value={13} label="Tin học"></option>
//                     </CFormSelect>
//                   </td>

//                   <td>
//                     <CFormSelect>
//                       <option selected="selected">Giáo viên</option>
//                       {listteacher.map((item) => (
//                         <option
//                           key={item.userId}
//                           value={item.userId}
//                           label={item.displayName}
//                         ></option>
//                       ))}
//                     </CFormSelect>
//                   </td>
//                 </tr>
//                 <tr>
//                   <td style={{ textAlign: "center", width: "180px" }}>
//                     Tiết 10
//                   </td>
//                   <td>
//                     <CFormSelect>
//                       <option selected="selected">Môn học</option>
//                       <option value={1} label="Toán"></option>
//                       <option value={2} label="Vật lí"></option>
//                       <option value={3} label="Hóa học"></option>
//                       <option value={4} label="Văn học"></option>
//                       <option value={5} label="Lịch sử"></option>
//                       <option value={6} label="Địa lí"></option>
//                       <option value={7} label="Sinh học"></option>
//                       <option value={8} label="Tiếng anh"></option>
//                       <option value={9} label="GDCD"></option>
//                       <option value={10} label="Công nghệ"></option>
//                       <option value={11} label="GDQPAN"></option>
//                       <option value={12} label="Thể dục"></option>
//                       <option value={13} label="Tin học"></option>
//                     </CFormSelect>
//                   </td>

//                   <td>
//                     <CFormSelect>
//                       <option selected="selected">Giáo viên</option>
//                       {listteacher.map((item) => (
//                         <option
//                           key={item.userId}
//                           value={item.userId}
//                           label={item.displayName}
//                         ></option>
//                       ))}
//                     </CFormSelect>
//                   </td>
//                 </tr>
//                 <tr>
//                   <td
//                     style={{ textAlign: "center", width: "20%" }}
//                     rowSpan={10}
//                   >
//                     Thứ 7
//                   </td>
//                   <td style={{ textAlign: "center", width: "10%" }}>Tiết 1</td>
//                   <td style={{ textAlign: "center", width: "35%" }}>
//                     <CFormSelect>
//                       <option selected="selected">Môn học</option>
//                       <option value={1} label="Toán"></option>
//                       <option value={2} label="Vật lí"></option>
//                       <option value={3} label="Hóa học"></option>
//                       <option value={4} label="Văn học"></option>
//                       <option value={5} label="Lịch sử"></option>
//                       <option value={6} label="Địa lí"></option>
//                       <option value={7} label="Sinh học"></option>
//                       <option value={8} label="Tiếng anh"></option>
//                       <option value={9} label="GDCD"></option>
//                       <option value={10} label="Công nghệ"></option>
//                       <option value={11} label="GDQPAN"></option>
//                       <option value={12} label="Thể dục"></option>
//                       <option value={13} label="Tin học"></option>
//                     </CFormSelect>
//                   </td>

//                   <td style={{ textAlign: "center", width: "35%" }}>
//                     <CFormSelect>
//                       <option selected="selected">Giáo viên</option>
//                       {listteacher.map((item) => (
//                         <option
//                           key={item.userId}
//                           value={item.userId}
//                           label={item.displayName}
//                         ></option>
//                       ))}
//                     </CFormSelect>
//                   </td>
//                 </tr>
//                 <tr>
//                   <td style={{ textAlign: "center", width: "180px" }}>
//                     Tiết 2
//                   </td>
//                   <td>
//                     <CFormSelect>
//                       <option selected="selected">Môn học</option>
//                       <option value={1} label="Toán"></option>
//                       <option value={2} label="Vật lí"></option>
//                       <option value={3} label="Hóa học"></option>
//                       <option value={4} label="Văn học"></option>
//                       <option value={5} label="Lịch sử"></option>
//                       <option value={6} label="Địa lí"></option>
//                       <option value={7} label="Sinh học"></option>
//                       <option value={8} label="Tiếng anh"></option>
//                       <option value={9} label="GDCD"></option>
//                       <option value={10} label="Công nghệ"></option>
//                       <option value={11} label="GDQPAN"></option>
//                       <option value={12} label="Thể dục"></option>
//                       <option value={13} label="Tin học"></option>
//                     </CFormSelect>
//                   </td>

//                   <td>
//                     <CFormSelect>
//                       <option selected="selected">Giáo viên</option>
//                       {listteacher.map((item) => (
//                         <option
//                           key={item.userId}
//                           value={item.userId}
//                           label={item.displayName}
//                         ></option>
//                       ))}
//                     </CFormSelect>
//                   </td>
//                 </tr>
//                 <tr>
//                   <td style={{ textAlign: "center", width: "180px" }}>
//                     Tiết 3
//                   </td>
//                   <td>
//                     <CFormSelect>
//                       <option selected="selected">Môn học</option>
//                       <option value={1} label="Toán"></option>
//                       <option value={2} label="Vật lí"></option>
//                       <option value={3} label="Hóa học"></option>
//                       <option value={4} label="Văn học"></option>
//                       <option value={5} label="Lịch sử"></option>
//                       <option value={6} label="Địa lí"></option>
//                       <option value={7} label="Sinh học"></option>
//                       <option value={8} label="Tiếng anh"></option>
//                       <option value={9} label="GDCD"></option>
//                       <option value={10} label="Công nghệ"></option>
//                       <option value={11} label="GDQPAN"></option>
//                       <option value={12} label="Thể dục"></option>
//                       <option value={13} label="Tin học"></option>
//                     </CFormSelect>
//                   </td>

//                   <td>
//                     <CFormSelect>
//                       <option selected="selected">Giáo viên</option>
//                       {listteacher.map((item) => (
//                         <option
//                           key={item.userId}
//                           value={item.userId}
//                           label={item.displayName}
//                         ></option>
//                       ))}
//                     </CFormSelect>
//                   </td>
//                 </tr>
//                 <tr>
//                   <td style={{ textAlign: "center", width: "180px" }}>
//                     Tiết 4
//                   </td>
//                   <td>
//                     <CFormSelect>
//                       <option selected="selected">Môn học</option>
//                       <option value={1} label="Toán"></option>
//                       <option value={2} label="Vật lí"></option>
//                       <option value={3} label="Hóa học"></option>
//                       <option value={4} label="Văn học"></option>
//                       <option value={5} label="Lịch sử"></option>
//                       <option value={6} label="Địa lí"></option>
//                       <option value={7} label="Sinh học"></option>
//                       <option value={8} label="Tiếng anh"></option>
//                       <option value={9} label="GDCD"></option>
//                       <option value={10} label="Công nghệ"></option>
//                       <option value={11} label="GDQPAN"></option>
//                       <option value={12} label="Thể dục"></option>
//                       <option value={13} label="Tin học"></option>
//                     </CFormSelect>
//                   </td>

//                   <td>
//                     <CFormSelect>
//                       <option selected="selected">Giáo viên</option>
//                       {listteacher.map((item) => (
//                         <option
//                           key={item.userId}
//                           value={item.userId}
//                           label={item.displayName}
//                         ></option>
//                       ))}
//                     </CFormSelect>
//                   </td>
//                 </tr>
//                 <tr>
//                   <td style={{ textAlign: "center", width: "180px" }}>
//                     Tiết 5
//                   </td>
//                   <td>
//                     <CFormSelect>
//                       <option selected="selected">Môn học</option>
//                       <option value={1} label="Toán"></option>
//                       <option value={2} label="Vật lí"></option>
//                       <option value={3} label="Hóa học"></option>
//                       <option value={4} label="Văn học"></option>
//                       <option value={5} label="Lịch sử"></option>
//                       <option value={6} label="Địa lí"></option>
//                       <option value={7} label="Sinh học"></option>
//                       <option value={8} label="Tiếng anh"></option>
//                       <option value={9} label="GDCD"></option>
//                       <option value={10} label="Công nghệ"></option>
//                       <option value={11} label="GDQPAN"></option>
//                       <option value={12} label="Thể dục"></option>
//                       <option value={13} label="Tin học"></option>
//                     </CFormSelect>
//                   </td>

//                   <td>
//                     <CFormSelect>
//                       <option selected="selected">Giáo viên</option>
//                       {listteacher.map((item) => (
//                         <option
//                           key={item.userId}
//                           value={item.userId}
//                           label={item.displayName}
//                         ></option>
//                       ))}
//                     </CFormSelect>
//                   </td>
//                 </tr>
//                 <tr>
//                   <td style={{ textAlign: "center", width: "180px" }}>
//                     Tiết 6
//                   </td>
//                   <td>
//                     <CFormSelect>
//                       <option selected="selected">Môn học</option>
//                       <option value={1} label="Toán"></option>
//                       <option value={2} label="Vật lí"></option>
//                       <option value={3} label="Hóa học"></option>
//                       <option value={4} label="Văn học"></option>
//                       <option value={5} label="Lịch sử"></option>
//                       <option value={6} label="Địa lí"></option>
//                       <option value={7} label="Sinh học"></option>
//                       <option value={8} label="Tiếng anh"></option>
//                       <option value={9} label="GDCD"></option>
//                       <option value={10} label="Công nghệ"></option>
//                       <option value={11} label="GDQPAN"></option>
//                       <option value={12} label="Thể dục"></option>
//                       <option value={13} label="Tin học"></option>
//                     </CFormSelect>
//                   </td>

//                   <td>
//                     <CFormSelect>
//                       <option selected="selected">Giáo viên</option>
//                       {listteacher.map((item) => (
//                         <option
//                           key={item.userId}
//                           value={item.userId}
//                           label={item.displayName}
//                         ></option>
//                       ))}
//                     </CFormSelect>
//                   </td>
//                 </tr>
//                 <tr>
//                   <td style={{ textAlign: "center", width: "180px" }}>
//                     Tiết 7
//                   </td>
//                   <td>
//                     <CFormSelect>
//                       <option selected="selected">Môn học</option>
//                       <option value={1} label="Toán"></option>
//                       <option value={2} label="Vật lí"></option>
//                       <option value={3} label="Hóa học"></option>
//                       <option value={4} label="Văn học"></option>
//                       <option value={5} label="Lịch sử"></option>
//                       <option value={6} label="Địa lí"></option>
//                       <option value={7} label="Sinh học"></option>
//                       <option value={8} label="Tiếng anh"></option>
//                       <option value={9} label="GDCD"></option>
//                       <option value={10} label="Công nghệ"></option>
//                       <option value={11} label="GDQPAN"></option>
//                       <option value={12} label="Thể dục"></option>
//                       <option value={13} label="Tin học"></option>
//                     </CFormSelect>
//                   </td>

//                   <td>
//                     <CFormSelect>
//                       <option selected="selected">Giáo viên</option>
//                       {listteacher.map((item) => (
//                         <option
//                           key={item.userId}
//                           value={item.userId}
//                           label={item.displayName}
//                         ></option>
//                       ))}
//                     </CFormSelect>
//                   </td>
//                 </tr>
//                 <tr>
//                   <td style={{ textAlign: "center", width: "180px" }}>
//                     Tiết 8
//                   </td>
//                   <td>
//                     <CFormSelect>
//                       <option selected="selected">Môn học</option>
//                       <option value={1} label="Toán"></option>
//                       <option value={2} label="Vật lí"></option>
//                       <option value={3} label="Hóa học"></option>
//                       <option value={4} label="Văn học"></option>
//                       <option value={5} label="Lịch sử"></option>
//                       <option value={6} label="Địa lí"></option>
//                       <option value={7} label="Sinh học"></option>
//                       <option value={8} label="Tiếng anh"></option>
//                       <option value={9} label="GDCD"></option>
//                       <option value={10} label="Công nghệ"></option>
//                       <option value={11} label="GDQPAN"></option>
//                       <option value={12} label="Thể dục"></option>
//                       <option value={13} label="Tin học"></option>
//                     </CFormSelect>
//                   </td>

//                   <td>
//                     <CFormSelect>
//                       <option selected="selected">Giáo viên</option>
//                       {listteacher.map((item) => (
//                         <option
//                           key={item.userId}
//                           value={item.userId}
//                           label={item.displayName}
//                         ></option>
//                       ))}
//                     </CFormSelect>
//                   </td>
//                 </tr>
//                 <tr>
//                   <td style={{ textAlign: "center", width: "180px" }}>
//                     Tiết 9
//                   </td>
//                   <td>
//                     <CFormSelect>
//                       <option selected="selected">Môn học</option>
//                       <option value={1} label="Toán"></option>
//                       <option value={2} label="Vật lí"></option>
//                       <option value={3} label="Hóa học"></option>
//                       <option value={4} label="Văn học"></option>
//                       <option value={5} label="Lịch sử"></option>
//                       <option value={6} label="Địa lí"></option>
//                       <option value={7} label="Sinh học"></option>
//                       <option value={8} label="Tiếng anh"></option>
//                       <option value={9} label="GDCD"></option>
//                       <option value={10} label="Công nghệ"></option>
//                       <option value={11} label="GDQPAN"></option>
//                       <option value={12} label="Thể dục"></option>
//                       <option value={13} label="Tin học"></option>
//                     </CFormSelect>
//                   </td>

//                   <td>
//                     <CFormSelect>
//                       <option selected="selected">Giáo viên</option>
//                       {listteacher.map((item) => (
//                         <option
//                           key={item.userId}
//                           value={item.userId}
//                           label={item.displayName}
//                         ></option>
//                       ))}
//                     </CFormSelect>
//                   </td>
//                 </tr>
//                 <tr>
//                   <td style={{ textAlign: "center", width: "180px" }}>
//                     Tiết 10
//                   </td>
//                   <td>
//                     <CFormSelect>
//                       <option selected="selected">Môn học</option>
//                       <option value={1} label="Toán"></option>
//                       <option value={2} label="Vật lí"></option>
//                       <option value={3} label="Hóa học"></option>
//                       <option value={4} label="Văn học"></option>
//                       <option value={5} label="Lịch sử"></option>
//                       <option value={6} label="Địa lí"></option>
//                       <option value={7} label="Sinh học"></option>
//                       <option value={8} label="Tiếng anh"></option>
//                       <option value={9} label="GDCD"></option>
//                       <option value={10} label="Công nghệ"></option>
//                       <option value={11} label="GDQPAN"></option>
//                       <option value={12} label="Thể dục"></option>
//                       <option value={13} label="Tin học"></option>
//                     </CFormSelect>
//                   </td>

//                   <td>
//                     <CFormSelect>
//                       <option selected="selected">Giáo viên</option>
//                       {listteacher.map((item) => (
//                         <option
//                           key={item.userId}
//                           value={item.userId}
//                           label={item.displayName}
//                         ></option>
//                       ))}
//                     </CFormSelect>
//                   </td>
//                 </tr>
//               </tbody>
//             </table>
//           </div>
//           <div className="mt-5 text-center">
//             <button className="btn btn-primary profile-button" type="button">
//               Cập nhật
//             </button>
//           </div>
//         </div>
//         <br />
//         <br />
//       </div>
//     </>
//   );
// };

// export default Calendar;
