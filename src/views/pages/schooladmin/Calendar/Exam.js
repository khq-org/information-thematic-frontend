import React from "react";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

import Control from "./Control";
import Form from "./Form";
import ListEvent from "./ListEvent";
const convertDate = (info) => {
  let start = new Date(info.event.start);
  let end = new Date(info.event.end);
  const eventUpdate = {
    title: info.event.title,
    start: start.toISOString(),
    end: end.toISOString(),
    id: info.event.id,
    allDay: info.event.allDay,
  };
  return eventUpdate;
};
class Exam extends React.Component {
  calendarRef = React.createRef();
  state = {
    Events: [],
    eventUpdate: {},
    isShowForm: false,
    isShowListEvent: false,
    infoDateClick: undefined,
  };

  eventDragStop = (info) => {
    // // const Events = Object.assign([], this.state.Events);
    // let Events = JSON.parse(JSON.stringify(this.state.Events))
    // const event = convertDate(info);
    // const index = Events.findIndex((Event) => Event.id === event.id);
    // console.log(index)
    // Events.splice(index, 1, event);
    // this.setState({
    //   Events: Object.assign([], Events)
    // })
  };
  handleDateClick = (infoDateClick) => {
    this.setState({
      eventUpdate: {},
      isShowForm: true,
      infoDateClick,
    });
  };
  handleEventClick = (infoEventClick) => {
    const eventUpdate = convertDate(infoEventClick);
    console.log(eventUpdate);
    this.setState({
      eventUpdate: { ...eventUpdate },
      isShowForm: true,
    });
  };
  onClick = (name) => {
    switch (name) {
      case "add": {
        this.setState({
          isShowForm: !this.state.isShowForm,
          eventUpdate: {},
        });
        break;
      }
      case "event": {
        this.setState({
          isShowListEvent: !this.state.isShowListEvent,
        });
        break;
      }
      default:
    }
  };
  onSubmit = (eventFromChild) => {
    let Events = JSON.parse(JSON.stringify(this.state.Events));
    if (this.state.eventUpdate.id) {
      const index = Events.findIndex((event) => event.id === eventFromChild.id);
      Events.splice(index, 1, eventFromChild);
      this.setState({
        Events,
        isShowForm: false,
        eventUpdate: {},
        infoDateClick: undefined,
      });
    } else {
      Events.push(eventFromChild);
      this.setState({
        Events: Events,
        isShowForm: false,
        infoDateClick: undefined,
      });
    }
  };
  deleteEvent = (id) => {
    let Events = JSON.parse(JSON.stringify(this.state.Events));
    const index = Events.findIndex((event) => event.id === id);
    Events.splice(index, 1);
    this.setState({
      Events,
    });
  };
  isUpdateEvent = (eventUpdate) => {
    this.setState({
      eventUpdate: { ...eventUpdate },
      isShowForm: true,
      infoDateClick: undefined,
    });
  };
  render() {
    let { isShowForm, isShowListEvent, Events, eventUpdate, infoDateClick } =
      this.state;

    return (
      <div className="Calendar">
        <Control onClick={this.onClick} />
        {isShowForm && (
          <Form
            onSubmit={this.onSubmit}
            infoDateClick={infoDateClick}
            eventUpdate={eventUpdate}
          />
        )}
        {isShowListEvent && (
          <ListEvent
            Events={Events}
            deleteEvent={this.deleteEvent}
            isUpdateEvent={this.isUpdateEvent}
          />
        )}
        <FullCalendar
          initialView="timeGridWeek"
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay",
          }}
          ref={this.calendarRef}
          events={Events}
          dateClick={this.handleDateClick}
          eventClick={this.handleEventClick}
          editable={true}
          selectable={true}
          selectMirror={true}
          dayMaxEvents={true}
          // eventDragStop={this.eventDragStop}
        />
      </div>
    );
  }
}

export default Exam;
