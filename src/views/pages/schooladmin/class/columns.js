import { format } from "date-fns";

export const COLUMNS = [
  {
    Header: "Id",
    Footer: "Id",
    accessor: "classId",
    disableFilters: true,
    sticky: "left",
  },
  {
    Header: "Tên lớp",
    Footer: "Tên lớp",
    accessor: "clazz",
    sticky: "left",
  },

  {
    Header: "Khối",
    Footer: "Khối",
    accessor: "grade.grade",
    sticky: "left",
  },
  {
    Header: "Lớp chọn",
    Footer: "Lớp chọn",
    accessor: "specializedClass",
    Cell: ({ value }) => {
      return value ? "Lớp chọn" : "Lớp bình thường";
    },
  },
  {
    Header: "Môn học",
    Footer: "Môn học",
    accessor: "subject",
    sticky: "left",
  },
  {
    Header: "Giáo viên chủ nhiệm",
    Footer: "Giáo viên chủ nhiệm",
    accessor: "",
    sticky: "left",
  },
];
