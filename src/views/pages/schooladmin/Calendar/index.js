import React from "react";
import FullCalendar, { formatDate } from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { INITIAL_EVENTS, createEventId } from "./event-utils";

export default class Calendar extends React.Component {
  state = {
    weekendsVisible: true,
    currentEvents: [],
  };

  render() {
    return (
      <div className="demo-app">
        {this.renderSidebar()}
        <div className="demo-app-main">
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "dayGridMonth,timeGridWeek,timeGridDay",
            }}
            initialView="dayGridMonth"
            editable={true}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            weekends={this.state.weekendsVisible}
            initialEvents={INITIAL_EVENTS} // alternatively, use the `events` setting to fetch from a feed
            select={this.handleDateSelect}
            eventContent={renderEventContent} // custom render function
            eventClick={this.handleEventClick}
            eventsSet={this.handleEvents} // called after events are initialized/added/changed/removed
            /* you can update a remote database when these fire:
            eventAdd={function(){}}
            eventChange={function(){}}
            eventRemove={function(){}}
            */
          />
        </div>
      </div>
    );
  }

  renderSidebar() {
    return (
      <div className="demo-app-sidebar">
        <div className="demo-app-sidebar-section">
          <h2>Instructions</h2>
          <ul>
            <li>Select dates and you will be prompted to create a new event</li>
            <li>Drag, drop, and resize events</li>
            <li>Click an event to delete it</li>
          </ul>
        </div>
        <div className="demo-app-sidebar-section">
          <div>
            <input
              type="checkbox"
              checked={this.state.weekendsVisible}
              onChange={this.handleWeekendsToggle}
            ></input>
            toggle weekends
          </div>
        </div>
        <div className="demo-app-sidebar-section">
          <h2>All Events ({this.state.currentEvents.length})</h2>
          <ul>{this.state.currentEvents.map(renderSidebarEvent)}</ul>
        </div>
      </div>
    );
  }

  handleWeekendsToggle = () => {
    this.setState({
      weekendsVisible: !this.state.weekendsVisible,
    });
  };

  handleDateSelect = (selectInfo) => {
    let title = prompt("Please enter a new title for your event");
    let calendarApi = selectInfo.view.calendar;

    calendarApi.unselect(); // clear date selection

    if (title) {
      calendarApi.addEvent({
        id: createEventId(),
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay,
      });
    }
  };

  handleEventClick = (clickInfo) => {
    clickInfo.event.remove();
  };

  handleEvents = (events) => {
    this.setState({
      currentEvents: events,
    });
  };
}

function renderEventContent(eventInfo) {
  return (
    <>
      <b>{eventInfo.timeText}</b>
      <i>{eventInfo.event.title}</i>
    </>
  );
}

function renderSidebarEvent(event) {
  return (
    <li key={event.id}>
      <b>
        {formatDate(event.start, {
          year: "numeric",
          month: "short",
          day: "numeric",
        })}
      </b>
      <i>{event.title}</i>
    </li>
  );
}
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
//           <div class="table-wrapper-scroll-y my-custom-scrollbar">
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