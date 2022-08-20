import "./register.css";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import Joi from "joi-browser";

import axios from "axios";
import { userInputs } from "../../../formSource";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [file, setFile] = useState("");
  const [info, setInfo] = useState({
    username: undefined,
    email: undefined,
    password: undefined,
    phone: undefined,
    country: undefined,
    city: undefined,
  });
  const [errors, setErrors] = useState({});
  const [errorSend, setErrorSend] = useState({});

  var schema = {
    username: Joi.string().required().label("Username"),
    password: Joi.string().required().label("Password"),
    country: Joi.string().required().label("Country"),
    phone: Joi.string().required().label("Phone"),
    email: Joi.string().email().required().label("Email"),
    city: Joi.string().required().label("City"),
  };

  const navigate = useNavigate();

  const handleChange = (event) => {
    const { id, value } = event.target;
    let errorData = {};
    const errorMessage = validateProperty(event);

    if (errorMessage) {
      errorData[id] = errorMessage;
    } else {
      delete errorData[id];
    }
    let infoData = { ...info };
    infoData[id] = value;
    setInfo(infoData);
    setErrors(errorData);
  };

  const validateProperty = (event) => {
    const { id, value } = event.target;
    const obj = { [id]: value };

    const subSchema = { [id]: schema[id] };
    const result = Joi.validate(obj, subSchema);
    const { error } = result;

    return error
      ? error.details[0].message.toString().replace(/['"]+/g, "")
      : null;
  };

  const handleClick = async (e) => {
    e.preventDefault();

    const result = validate();
    setErrors({ errors: result });

    if (!errors) return false;
    else {
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

        const success = await axios.post(
          "http://localhost:3000/api/auth/register",
          newUser
        );

        success ? navigate("/login") : console.log(success);
      } catch (ex) {
        if (ex.response && ex.response.status === 400) {
          const errorsObj = { ...errors };
          errorsObj.username = ex.response.data;
          setErrorSend({ errorsObj });
        } else if (ex.response && ex.response.status === 500) {
          const errorsObj = { ...errors };
          errorsObj.username = ex.response.data;
          setErrorSend({ errorsObj });
        }
      }
    }
  };

  const validate = () => {
    const options = {
      abortEarly: false,
    };
    const { error } = Joi.validate(info, schema, options);

    if (!error) return null;

    const errorData = {};
    for (let item of error.details) {
      const name = item.path[0];
      const message = item.message;
      errorData[name] = message;
    }

    setErrors(errorData);
    return errorData;
  };

  return (
    <div className="newRegister">
      <div className="newRegisterContainer container-sm mx-auto">
        <div className="top">
          <h1>Register Yourself</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img
              src={
                file
                  ? URL.createObjectURL(file)
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
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
                  autoFocus
                  onChange={(e) => setFile(e.target.files[0])}
                  style={{ display: "none" }}
                />
              </div>

              {userInputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input
                    autoFocus
                    onChange={handleChange}
                    type={input.type}
                    placeholder={input.placeholder}
                    id={input.id}
                  />
                  {errors.errors?.[input.id] && (
                    <span className="mt-2">{errors.errors[input.id]}</span>
                  )}
                </div>
              ))}
              <button onClick={handleClick}>Send</button>
            </form>
          </div>
        </div>
        {errorSend.errorsObj && (
          <span className="pb-3 text-white text-center mx-auto">
            {errorSend.errorsObj.username.error.message}
          </span>
        )}
      </div>
      <span className="text-white fw-bold">or</span>
      <Link to="/login">
        <button className="loginBtn">Login</button>
      </Link>
    </div>
  );
};

export default Register;
