import "./newUser.scss";
import Sidebar from "../../../components/admin/sidebar/Sidebar";
import Navbar from "../../../components/admin/navbar/navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";

import axios from "axios";
import useFetch from "../../../hooks/useFetch";
import { useLocation } from "react-router-dom";

const EditUserAdmin = ({ inputs, title }) => {
  const [file, setFile] = useState("");
  const [info, setInfo] = useState({});
  const [success, setSuccess] = useState();
  const location = useLocation();
  const path = location.pathname.split("/")[2];
  const id = location.pathname.split("/")[4];

  const { data } = useFetch(`/api/${path}/${id}`);

  console.log(path, id);

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "upload");
    try {
      const uploadResponse = await axios.post(
        "https://api.cloudinary.com/v1_1/daxilgrvn/image/upload",
        data
      );

      const { url } = uploadResponse.data;

      const newUser = { ...info, profileImage: url };

      const val = await axios.put(`/api/${path}/${id}`, newUser);
      setSuccess(val);
    } catch (error) {}
  };
  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>{title}</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img
              src={file ? URL.createObjectURL(file) : data.profileImage}
              alt=""
            />
          </div>
          <div className="right">
            <form>
              <div className="formInput">
                <label htmlFor="file">
                  Image: <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input
                  type="file"
                  id="file"
                  onChange={(e) => setFile(e.target.files[0])}
                  style={{ display: "none" }}
                />
              </div>

              {inputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input
                    onChange={handleChange}
                    type={input.type}
                    placeholder={input.placeholder}
                    id={input.id}
                    defaultValue={data[input.id]}
                  />
                </div>
              ))}
              <div className="btnSuccess">
                <button onClick={handleClick}>Send</button>
                {success && (
                  <span className="text-success fw-bold">Success</span>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditUserAdmin;
