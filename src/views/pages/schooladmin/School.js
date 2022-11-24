import "./School.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { CAlert, CButton } from "@coreui/react";

const School = () => {
  const token = localStorage.getItem("access_token");
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  const [school, setschool] = useState("");
  const [phone, setphone] = useState("");
  const [street, setstreet] = useState("");
  const [district, setdistrict] = useState("");
  const [city, setcity] = useState("");
  const [website, setwebsite] = useState("");
  const [schoolId, setschoolid] = useState();
  const [nav, setnav] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get("users");
        setschoolid(res.data.data.user.schoolId);
        const { data } = await axios.get(
          `schools/${res.data.data.user.schoolId}`
        );
        setschool(data.data.school);
        setphone(data.data.phone);
        setstreet(data.data.street);
        setdistrict(data.data.district);
        setcity(data.data.city);
        setwebsite(data.data.website);
      } catch (e) {}
    })();
  }, []);

  const save = async (e) => {
    e.preventDefault();

    const { data } = await axios.put(`schools/${schoolId}`, {
      school,
      street,
      district,
      city,
      phone,
      website,
    });
    //console.log({ data });
    //alert("done.");
    setnav(true);
  };

  return (
    <>
      {nav ? (
        <section>
          <div className="text-center mx-5">
            <CAlert color="success">Lưu thông tin thành công!</CAlert>
            <CButton color="success" onClick={() => setnav(false)}>
              Quay lại
            </CButton>
          </div>
        </section>
      ) : (
        <section>
          <div className="container rounded bg-white mt-0 mb-0">
            <form className="row" onSubmit={save}>
              <div className="ml-9">
                <div className="p-3 py-5">
                  <div className="text-center">
                    <h2>Thông tin trường học</h2>
                  </div>

                  <div className="row d-flex justify-content-center">
                    <div className="col-md-8">
                      <b>Tên trường</b>
                      <input
                        type="text"
                        className="form-control"
                        value={school}
                        onChange={(e) => setschool(e.target.value)}
                        required
                      />
                    </div>

                    <div className="col-md-8">
                      <b>Xã/Phường</b>
                      <input
                        type="text"
                        className="form-control"
                        value={street}
                        onChange={(e) => setstreet(e.target.value)}
                        required
                      />
                    </div>
                    <div className="col-md-8">
                      <b>Quận/Huyện</b>
                      <input
                        type="text"
                        className="form-control"
                        value={district}
                        onChange={(e) => setdistrict(e.target.value)}
                        required
                      />
                    </div>

                    <div className="col-md-8">
                      <b>Tỉnh/Thành phố</b>
                      <input
                        type="text"
                        className="form-control"
                        value={city}
                        onChange={(e) => setcity(e.target.value)}
                        required
                      />
                    </div>

                    <div className="col-md-8">
                      <b>Liên hệ</b>
                      <input
                        type="text"
                        className="form-control"
                        value={phone}
                        onChange={(e) => setphone(e.target.value)}
                        required
                      />
                    </div>

                    <div className="col-md-8">
                      <b>Website</b>
                      <input
                        type="text"
                        className="form-control"
                        value={website}
                        onChange={(e) => setwebsite(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="mt-5 text-center">
                    <button
                      className="btn btn-primary profile-button"
                      type="submit"
                    >
                      Lưu thông tin
                    </button>
                  </div>
                </div>
              </div>
              {/* <div className="col-md-4">
          <div className="p-3 py-5">
            <br />
            <br />
            <div className="d-flex justify-content-between align-items-center experience">
              <h3>Account(School Admin)</h3>
            </div>
            <br />
            <br />
          </div>
        </div> */}
            </form>
          </div>
        </section>
      )}
    </>
  );
};
export default School;
