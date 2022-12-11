import Profile from "./Profile";
import ChangePW from "./password";
import Calendar from "./Calendar";
const routes = [
  { path: "/profile", exact: true, name: "" },
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
    path: "/calendar",
    name: "Thời khóa biểu",
    element: Calendar,
  },
];

export default routes;
