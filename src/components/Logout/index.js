import React from "react";
import { Button } from "react-bootstrap";
import { dropToken } from "../../utils/tokenManager";
import Swal from "sweetalert2";

class Logout extends React.Component {
  constructor(props) {
    super(props);
    this.state = { form: {}, modalShow: false };
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout() {
    const { history } = this.props;
    dropToken()
    history.push("/login");
    Swal.fire({
      title: "You was logout successfully",
      icon: "success",
    });
  }

  render() {
    return (
      <>
        <Button variant="primary" onClick={this.handleLogout}>
          Logout
        </Button>
      </>
    );
  }
}

export default Logout;
