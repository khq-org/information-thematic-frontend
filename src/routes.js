import React from "react";

const StartNewYear = React.lazy(() => import("./views/pages/schooladmin/System"));
const AllStudents = React.lazy(() =>
  import("./views/pages/schooladmin/Students")
);
const AllTeachers = React.lazy(() =>
  import("./views/pages/schooladmin/Teachers")
);
const Info = React.lazy(() => import("./views/pages/schooladmin/InfoAdmin"));
const Password = React.lazy(() => import("./views/pages/schooladmin/ChangePW"));
const School = React.lazy(() => import("./views/pages/schooladmin/School"));
const TeacherDetail = React.lazy(() =>
  import("./views/pages/schooladmin/Teachers/TeacherDetail")
);
const ClassDetail = React.lazy(() =>
  import("./views/pages/schooladmin/class/ClassDetail")
);
const Class = React.lazy(() => import("./views/pages/schooladmin/class"));

const routes = [

  { path: "/startnewyear", name: "Bắt đầu năm học mới", element: StartNewYear },

  {
    path: "/all-students",
    name: "Danh sách học sinh",
    element: AllStudents,
  },

  {
    path: "/all-teachers",
    name: "Danh sách giáo viên",
    element: AllTeachers,
  },
  {
    path: "/all-teachers/:id",
    name: "Thông tin giáo viên",
    element: TeacherDetail,
  },

  {
    path: "/classes",
    name: "Danh sách lớp",
    element: Class,
  },
  {
    path: "/classes/:id",
    name: "Thông tin lớp",
    element: ClassDetail,
  },
  { path: "/info", name: "Thông tin tài khoản", element: Info },
  { path: "/changepw", name: "Đổi mật khẩu", element: Password },
  { path: "/school", name: "Thông tin trường", element: School },
];

export default routes;
