// import React, { useState } from "react";
// import "./Header.css";
// import { Link } from "react-router-dom";
// import {
//   Home,
//   HomeOutlined,
//   Add,
//   AddOutlined,
//   SearchOutlined,
//   Search,
//   AccountCircle,
//   AccountCircleOutlined,
// } from "@mui/icons-material";

// const Header = () => {
//   const [tab, setTab] = useState(window.location.pathname);
//   return (
//     <div className="header">
//       <Link to="/" onClick={() => setTab("/")}>
//         {tab === "/" ? <Home style={{ color: "black" }} /> : <HomeOutlined />}
//       </Link>

//       <Link to="/createQuiz" onClick={() => setTab("/createQuiz")}>
//         {tab === "/createQuiz" ? (
//           <Add style={{ color: "black" }} />
//         ) : (
//           <AddOutlined />
//         )}
//       </Link>

//       <Link to="/search" onClick={() => setTab("/search")}>
//         {tab === "/search" ? (
//           <Search style={{ color: "black" }} />
//         ) : (
//           <SearchOutlined />
//         )}
//       </Link>

//       <Link to="/account" onClick={() => setTab("/account")}>
//         {tab === "/account" ? (
//           <AccountCircle style={{ color: "black" }} />
//         ) : (
//           <AccountCircleOutlined />
//         )}
//       </Link>
//     </div>
//   );
// };

// export default Header;


// Header.js

import React, { useState } from "react";
import "./Header.css";
import { Link } from "react-router-dom";
import {
  Home,
  HomeOutlined,
  Add,
  AddOutlined,
  SearchOutlined,
  Search,
  AccountCircle,
  AccountCircleOutlined,
} from "@mui/icons-material";
import LogoutIcon from '@mui/icons-material/Logout';
import { logoutUser } from "../../Actions/User";
import { useDispatch, useSelector } from "react-redux";

const Header = () => {
  const dispatch = useDispatch();
  const [tab, setTab] = useState(window.location.pathname);
  const {isAdmin} = useSelector(state => state.user.user);
  const logoutHandler = () => {
    dispatch(logoutUser());
    alert.success("Logged out successfully");
  };

  return (
    <div className="header">
      <div className="header-title">
        <h1>inQUIZitive</h1>
      </div>
      <Link to="/" onClick={() => setTab("/")}>
        {tab === "/" ? <Home style={{ color: "black" }} /> : <HomeOutlined />}
      </Link>

      {isAdmin &&
        <Link to="/createQuiz" onClick={() => setTab("/createQuiz")}>
          {tab === "/createQuiz" ? (
            <Add style={{ color: "black" }} />
          ) : (
            <AddOutlined />
          )}
        </Link> 
      }

       <Link to="/search" onClick={() => setTab("/search")}>
        {tab === "/search" ? (
          <Search style={{ color: "black" }} />
        ) : (
          <SearchOutlined />
        )}
      </Link>

      <Link to="/account" onClick={() => setTab("/account")}>
        {tab === "/account" ? (
          <AccountCircle style={{ color: "black" }} />
        ) : (
          <AccountCircleOutlined />
        )}
      </Link>

      <div className="logout-button" onClick={logoutHandler}>
        <LogoutIcon />
      </div>
    </div>
  );
};

export default Header;
