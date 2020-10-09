import React from "react";
import { withTranslation } from "react-i18next";
import ContainerCRUD from "../../ContainerCRUD/ContainerCRUD";
import { Button, Modal, Table } from "react-bootstrap";
import { getOr } from "lodash/fp";
import ModalListDetailsContact from "./ModalListDetailsContact";

class NewDetailsContactModel extends React.Component {
  constructor(props) {
    super(props);
    //   this.state = { data: [] };
    //   this.handleGetAll = this.handleGetAll.bind(this);
    //   this.handleDelete = this.handleDelete.bind(this);
  }

  // async handleGetAll() {
  //   this.setState({ submitting: true });
  //   const response = await contacts.getAll("");
  //   this.setState({ data: response.data.data.list, submitting: false });
  // }

  // handleEdit(id) {
  //   console.log("i will get contact id " + id);
  // }

  // async handleDelete(t, id) {
  //   this.setState({ submitting: true });
  //   await contacts
  //     .dellOne(id)
  //     .then(() => {
  //       this.handleGetAll();
  //     })
  //     .catch((error) => {
  //       this.setState({ submitting: false });
  //       Swal.fire({
  //         icon: "error",
  //         title: t(getOr("errorTextUndefined", "response.data.cod", error)),
  //       });
  //     });
  // }

  // componentDidMount() {
  //   this.handleGetAll();
  // }

  render() {
    const { t, data } = this.props;

    return (
      <>
        <ModalListDetailsContact
          data={data}
          modeEdit={false}
          //validator={this.validator}
          //validated={validated}
          //handleSubmit={this.handleSubmit}
          //handleInputChange={this.handleInputChange}
          // form={form}
        />
      </>
    );
  }
}

export default withTranslation(["contacts", "common"])(NewDetailsContactModel);
