import DarkModeIcon from "@mui/icons-material/DarkMode";
import { DarkModeContext } from "../../../context/context";
import { useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";

const NavBarIcon = () => {
  const { dispatch } = useContext(DarkModeContext);
  const { user } = useContext(AuthContext);
  return (
    <div className="items">
      <div className="item">
        <DarkModeIcon onClick={() => dispatch({ type: "TOGGLE" })} />
        Dark Mode
      </div>

      <div className="item">
        <div className="cellWithImg">
          <img
            className="cellImg"
            src={
              user.profileImage ||
              "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
            }
            alt="avatar"
          />
          {user.username}
        </div>
      </div>
    </div>
  );
};

export default NavBarIcon;
