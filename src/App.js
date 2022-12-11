import React, { Component, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./scss/style.scss";
import Admin from "./views/pages/admin/Admin";
import { Login } from "./views/pages/Login";
import WebTeacher from "./views/pages/webteacher/webteacher";
import WebStudent from "./views/pages/webstudent/webstudent";

const Page404 = React.lazy(() => import("./views/pages/page404/Page404"));
const Page500 = React.lazy(() => import("./views/pages/page500/Page500"));
const SchoolAdmin = React.lazy(() =>
  import("./views/pages/schooladmin/SchoolAdmin")
);

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Suspense>
          <Routes>
            <Route exact path="/404" name="Page 404" element={<Page404 />} />
            <Route exact path="/500" name="Page 500" element={<Page500 />} />
            <Route path="/admin/*" element={<Admin />} />
            <Route path="/teacher/*" element={<WebTeacher />} />
            <Route path="/student/*" element={<WebStudent />} />
            <Route path="/" element={<Login />} />
            <Route path="/*" element={<SchoolAdmin />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    );
  }
}

export default App;
