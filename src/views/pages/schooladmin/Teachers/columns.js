import { format } from "date-fns";
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
export const COLUMNS = [
  {
    Header: "Id",
    Footer: "Id",
    accessor: "userId",
    disableFilters: true,
    sticky: "left",
    sorter: true,
  },
  {
    Header: "Họ tên",
    Footer: "Họ tên",
    accessor: "displayName",
    sticky: "left",
  },

  {
    Header: "Ngày sinh",
    Footer: "Ngày sinh",
    accessor: "dateOfBirth",
    Cell: ({ value }) => {
      return format(new Date(value), "dd/MM/yyyy");
    },
  },
  {
    Header: "Giới tính",
    Footer: "Giới tính",
    accessor: "gender",
    Cell: ({ value }) => {
      return value ? "Nam" : "Nữ";
    },
  },
  // {
  //   Header: "Địa chỉ",
  //   Footer: "Địa chỉ",
  //   accessor: "street",
  //   sticky: "left",
  // },

  // {
  //   Header: "Quận/Huyện",
  //   Footer: "Quận/Huyện",
  //   accessor: "district",
  //   sticky: "left",
  // },
  // {
  //   Header: "Tỉnh/Thành phố",
  //   Footer: "Tỉnh/Thành phố",
  //   accessor: "city",
  //   sticky: "left",
  // },
  {
    Header: "Giáo viên bộ môn",
    Footer: "Giáo viên bộ môn",
    accessor: "workingPosition",
    sticky: "left",
    Cell: ({ value }) => {
      return mapSubjects[value.replace(" ", "_")];
    },
  },
  {
    Header: "Số điện thoại",
    Footer: "Số điện thoại",
    accessor: "phone",
    sticky: "left",
  },
  {
    Header: "Email",
    Footer: "Email",
    accessor: "email",
  },
  // {
  //   Header: "Tài khoản",
  //   Footer: "Tài khoản",
  //   accessor: "username",
  // },
];
