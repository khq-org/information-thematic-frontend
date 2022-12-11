import { format } from "date-fns";

export const COLUMNS = [
  {
    Header: "Id",

    accessor: "calendarEventId",
    disableFilters: true,
    sticky: "left",
  },
  {
    Header: "Lịch",

    accessor: "calendarEvent",
    sticky: "left",
  },

  {
    Header: "Ngày",

    accessor: "calendarDate",
    Cell: ({ value }) => {
      return format(new Date(value), "dd/MM/yyyy");
    },
  },
  {
    Header: "Bắt đầu",

    accessor: "timeStart",
  },
  {
    Header: "Kết thúc",

    accessor: "timeFinish",
    sticky: "left",
  },
  {
    Header: "Phòng",

    accessor: "roomName",
  },
  {
    Header: "Thành phần tham dự",

    accessor: "teacher.lastName",
  },
];
