import axios from "axios";
import { useState, useEffect } from "react";
import {
  CModal,
  CButton,
  CModalHeader,
  CModalBody,
  CModalTitle,
  CFormSelect,
  CForm,
} from "@coreui/react";

const Exam = () => {
  const [visible, setVisible] = useState(false);
  return (
    <>
      <CModal
        alignment="center"
        visible={visible}
        onClose={() => setVisible(false)}
      >
        <CModalHeader>
          <CModalTitle>
            <h2>Thêm mới lịch thi</h2>
          </CModalTitle>
        </CModalHeader>
        <CModalBody></CModalBody>
      </CModal>
      <div className="d-grid gap-2 d-md-flex justify-content-md-end">
        <button
          className="btn btn-primary"
          type="button"
          onClick={(e) => {
            setVisible(true);
          }}
        >
          Thêm mới
        </button>
      </div>
      <div style={{ width: "100%", padding: "5px 2px 2px 2px" }}>
        <div
          classname="GreyBox"
          style={{ marginRight: "auto", marginLeft: "auto" }}
        >
          <table className="table table-bordered table-striped">
            <tr>
              <td></td>
            </tr>
          </table>
        </div>
      </div>
    </>
  );
};
export default Exam;
