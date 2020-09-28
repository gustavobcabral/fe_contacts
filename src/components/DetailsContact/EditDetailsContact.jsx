import React from "react";
import { withTranslation } from "react-i18next";
import { details } from "../../services";
import { Form, Button } from "react-bootstrap";
import ContainerCRUD from "../../components/ContainerCRUD/ContainerCRUD";
import { getOr, map } from "lodash/fp";

class EditDetailsContact extends React.Component {
  constructor(props) {
    super(props);

    this.state = { data: [] };
    this.handleGetAllOneContact = this.handleGetAllOneContact.bind(this);
    //  this.handleDelete = this.handleDelete.bind(this);
  }
  async handleGetAllOneContact() {
    const phone = getOr(0, "props.match.params.phone", this);
    this.setState({ submitting: true });
    const response = await details.getAllOneContact(phone);
    this.setState({ data: response.data.data, submitting: false });
  }

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

  componentDidMount() {
    this.handleGetAllOneContact();
  }

  render() {
    const { t } = this.props;
    const { data } = this.state;
    console.log(data);
    const phone = getOr(0, "props.match.params.phone", this);
    const id = getOr(0, "props.match.params.id", this);

    return (
      <>
        <ContainerCRUD title={t("title")} {...this.props}>
          <h1>EDIT TODOS OS DETALHES</h1>
          <h4>Phone:{phone}</h4>
          <h4>Details number:{id}</h4>
          <Form key={data.id}>
            <Form.Group controlId="exampleForm.ControlInput1">
              <Form.Label>Publisher</Form.Label>
              <Form.Control type="text" placeholder={data.name} />
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlSelect1">
              <Form.Label>Status</Form.Label>
              <Form.Control as="select">
                <option>Disponivel</option>
                <option>Revisita</option>
                <option>Estudo</option>
                <option>Nao ligar</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlTextarea1">
              <Form.Label>Details</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder={data.information}
              />
            </Form.Group>
            <Button variant="primary">Save</Button>{" "}
          </Form>
          
          {/* <td>
                    <Button
                      variant="success"
                      onClick={handleEdit.bind(this, id_detail)}
                      href={`contacts/${data.phone}/details/${id_detail}`}
                    >
                      {t("common:edit")}
                    </Button>{" "}
                    <AskDelete
                      id={id_detail}
                      funcToCallAfterConfirmation={handleDelete}
                    />
                  </td> */}
        </ContainerCRUD>
      </>
    );
  }
}

export default withTranslation(["contacts", "common"])(EditDetailsContact);
