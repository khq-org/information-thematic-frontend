//import React from "react";
import StartNewYear from "./views/pages/schooladmin/System";
import AllStudents from "./views/pages/schooladmin/Students";
import AllTeachers from "./views/pages/schooladmin/Teachers";
import InfoAdmin from "./views/pages/schooladmin/InfoAdmin";
import ChangePW from "./views/pages/schooladmin/ChangePW";
import School from "./views/pages/schooladmin/School";
import TeacherDetail from "./views/pages/schooladmin/Teachers/TeacherDetail";
import ClassDetail from "./views/pages/schooladmin/class/ClassDetail";
import StudentDetail from "./views/pages/schooladmin/Students/StudentDetail";
import CreateStudent from "./views/pages/schooladmin/Students/CreateStudent";
import Class from "./views/pages/schooladmin/class";
import Calendar from "./views/pages/schooladmin/Calendar";
import Exam from "./views/pages/schooladmin/Calendar/Exam";
import Dashboard from "./views/dashboard/Dashboard";
// const StartNewYear = React.lazy(() =>
//   import("./views/pages/schooladmin/System")
// );
// const AllStudents = React.lazy(() =>
//   import("./views/pages/schooladmin/Students")
// );
// const AllTeachers = React.lazy(() =>
//   import("./views/pages/schooladmin/Teachers")
// );
// const Info = React.lazy(() => import("./views/pages/schooladmin/InfoAdmin"));
// const Password = React.lazy(() => import("./views/pages/schooladmin/ChangePW"));
// const School = React.lazy(() => import("./views/pages/schooladmin/School"));
// const TeacherDetail = React.lazy(() =>
//   import("./views/pages/schooladmin/Teachers/TeacherDetail")
// );
// const ClassDetail = React.lazy(() =>
//   import("./views/pages/schooladmin/class/ClassDetail")
// );
// const StudentDetail = React.lazy(() =>
//   import("./views/pages/schooladmin/Students/StudentDetail")
// );
// const CreateStudent = React.lazy(() =>
//   import("./views/pages/schooladmin/Students/CreateStudent")
// );
// const Class = React.lazy(() => import("./views/pages/schooladmin/class"));
// const Calendar = React.lazy(() => import("./views/pages/schooladmin/Calendar"));
// const Exam = React.lazy(() =>
//   import("./views/pages/schooladmin/Calendar/Exam")
// );
// const Dashboard = React.lazy(() => import("./views/dashboard/Dashboard"));
const routes = [
  { path: "/dashboard", exact: true, name: "" },
  { path: "/dashboard", name: "Dashboard", element: Dashboard },

  { path: "/startnewyear", name: "Bắt đầu năm học mới", element: StartNewYear },

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
    name: "Thời khóa biểu",
    element: Calendar,
  },
  {
    path: "/exam",
    name: "Lịch ",
    element: Exam,
  },
  { path: "/info", name: "Thông tin tài khoản", element: InfoAdmin },
  { path: "/changepw", name: "Đổi mật khẩu", element: ChangePW },
  { path: "/school", name: "Thông tin trường", element: School },
];

export default routes;
