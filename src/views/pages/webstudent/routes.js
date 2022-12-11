import Profile from "./Profile";
import ChangePW from "./password";
import StudentDetail from "./StudentDetail";

const routes = [
  { path: "/profile", exact: true, name: "Thông tin tài khoản" },
  {
    path: "/profile",
    name: "Thông tin tài khoản",
    element: Profile,
  },
  {
    path: "/pw",
    name: "Mật khẩu",
    element: ChangePW,
  },
  {
    path: "/studentdetail",
    name: "Học bạ",
    element: StudentDetail,
  },
];

export default routes;
