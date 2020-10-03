import React from "react";
import { NavDropdown } from "react-bootstrap";
import { dropToken } from "../../utils/loginDataManager";
import Swal from "sweetalert2";

const handleLogout = (props) => {
  const { history } = props;
  dropToken();
  history.push("/");
  Swal.fire({
    title: "You was logout successfully",
    icon: "success",
    timer: 2000,
    timerProgressBar: true,
  });
};

const Logout = (props) => (
  <NavDropdown.Item onClick={() => handleLogout(props)}>
    Logout
  </NavDropdown.Item>
);

export default Logout;
