import { format } from "date-fns";
import { Link } from "react-router-dom";

export const COLUMNS = [
  {
    Header: "Id",
    Footer: "Id",
    accessor: "userId",
    disableFilters: true,
    sticky: "left",
  },
  {
    Header: "Họ tên",
    Footer: "Họ tên",
    accessor: "displayName",
    sticky: "left",
    Cell: ({ value }) => {
      return (
        <Link to="#">
          {value}
        </Link>
      )
    },
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
  {
    Header: "Số nhà",
    Footer: "Số nhà",
    accessor: "street",
    sticky: "left",
  },

  {
    Header: "Quận/Huyện",
    Footer: "Quận/Huyện",
    accessor: "district",
    sticky: "left",
  },
  {
    Header: "Tỉnh/Thành phố",
    Footer: "Tỉnh/Thành phố",
    accessor: "city",
    sticky: "left",
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
];
