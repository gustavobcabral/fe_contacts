import React from "react";
import { handleLogout } from "../../components/Logout/Logout";

class Logout extends React.Component {
  componentDidMount() {
    handleLogout(this.props);
  }

  render() {
    return <> </>;
  }
}

export default Logout;
