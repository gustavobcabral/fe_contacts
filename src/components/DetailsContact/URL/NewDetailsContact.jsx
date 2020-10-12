import React from "react";
import { withTranslation } from "react-i18next";
import ContainerCRUD from "../../../components/ContainerCRUD/ContainerCRUD";
import { getOr } from "lodash/fp";

class NewDetailsContact extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.state = { data: [] };
  //   this.handleGetAll = this.handleGetAll.bind(this);
  //   this.handleDelete = this.handleDelete.bind(this);
  // }

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
    const { t } = this.props;
    // const { data } = this.state;
    const phone = getOr(0, "props.match.params.phone", this);
    return (
      <ContainerCRUD title={t("title")} {...this.props}>
        <h1>CREATE TODOS OS DETALHES</h1>
        phone:{phone}
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
    );
  }
}

export default withTranslation(["contacts", "common"])(NewDetailsContact);
