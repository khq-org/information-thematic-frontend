import React from "react";

const Dashboard = React.lazy(() => import("./views/dashboard/Dashboard"));
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
const StudentDetail = React.lazy(() =>
  import("./views/pages/schooladmin/Students/StudentDetail")
);
const CreateStudent = React.lazy(() =>
  import("./views/pages/schooladmin/Students/CreateStudent")
);
const Class = React.lazy(() => import("./views/pages/schooladmin/class"));
const Calendar = React.lazy(() => import("./views/pages/schooladmin/Calendar"));
const routes = [
  { path: "/dashboard", exact: true, name: "" },
  { path: "/dashboard", name: "Dashboard", element: Dashboard },

  {
    path: "/all-students",
    name: "Danh sách học sinh",
    element: AllStudents,
  },

  {
    path: "/all-students/:id",
    name: "Hồ sơ học sinh",
    element: StudentDetail,
  },
  {
    path: "/all-students/student",
    name: "Thêm mới học sinh",
    element: CreateStudent,
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
  {
    path: "/calendar",
    name: "Lịch",
    element: Calendar,
  },
  { path: "/info", name: "Thông tin tài khoản", element: Info },
  { path: "/changepw", name: "Đổi mật khẩu", element: Password },
  { path: "/school", name: "Thông tin trường", element: School },
];

export default routes;
