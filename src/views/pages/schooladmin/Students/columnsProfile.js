import { format } from "date-fns";
import { Link } from "react-router-dom";

export const COLUMNSPROFILE = [
  {
    Header: "Năm học",
    Footer: "Id",
    accessor: "schoolYear",
    disableFilters: true,
    sticky: "left",
  },
  {
    Header: "Lớp",
    Footer: "className",
    accessor: "className",
    disableFilters: true,
    sticky: "left",
  },
  {
    Header: "Điểm trung bình",
    Footer: "Họ tên",
    accessor: "averageScore",
    sticky: "left",
  },

  // {
  //   Header: "Học lực",
  //   Footer: "Ngày sinh",
  //   accessor: "dateOfBirth",
  //   Cell: ({ value }) => {
  //     return format(new Date(value), "dd/MM/yyyy");
  //   },
  // },
  {
    Header: "Hạnh kiểm",
    Footer: "conduct",
    accessor: "conduct",
  },
  {
    Header: "Danh hiệu thi đua",
    Footer: "Số nhà",
    accessor: "learningGrade",
    sticky: "left",
  },

];
