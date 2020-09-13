import React from "react";
import { Button } from "react-bootstrap";
import { dropToken } from "../../utils/tokenManager";
import Swal from "sweetalert2";

const handleLogout = (props) => {
  const { history } = props;
  dropToken();
  history.push("/login");
  Swal.fire({
    title: "You was logout successfully",
    icon: "success",
  });
};

const Logout = (props) => (
  <Button variant="primary" onClick={() => handleLogout(props)}>
    Logout
  </Button>
);

export default Logout;
