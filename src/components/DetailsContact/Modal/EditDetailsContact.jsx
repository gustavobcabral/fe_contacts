import React from "react";
import { withTranslation } from "react-i18next";
import ModalForm from "./ModalForm";
import Swal from "sweetalert2";
import { getOr, map, pick, get } from "lodash/fp";
import SimpleReactValidator from "simple-react-validator";
import { getLocale, handleInputChangeGeneric } from "../../../utils/forms";
import { details, publishers, status } from "../../../services";

const fields = {
  information: "",
  idPublisher: "",
  idStatus: "",
};

class EditDetailsContact extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      form: fields,
      submitting: false,
      loading: false,
      validated: false,
      publisherSelected: {},
      publishersOptions: [],
      statusSelected: {},
      statusOptions: [],
    };
    this.handleGetOne = this.handleGetOne.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.validator = new SimpleReactValidator({
      autoForceUpdate: this,
      locale: getLocale(this.props),
      element: (message) => <div className="text-danger">{message}</div>,
    });
  }

  reducePublishers = (publishers) =>
    map(
      (publisher) => ({ value: publisher.id, label: publisher.name }),
      getOr([], "data.data", publishers)
    );

  reduceStatus = (status) =>
    map(
      (status) => ({ value: status.id, label: status.description }),
      getOr([], "data.data", status)
    );

  async handleGetOne() {
    this.setState({ loading: true });
    const id = getOr(0, "props.id", this);
    const response = await details.getOne(id);
    // console.log(response, "response  NO MODAL");
    const form = getOr(fields, "data.data", response);
    const publishersOptions = this.reducePublishers(await publishers.getAll());
    const statusOptions = this.reduceStatus(await status.getAll());

    this.setState({
      form,
      publishersOptions,
      statusOptions,
      loading: false,
    });
  }

  handleInputChange(event) {
    handleInputChangeGeneric(event, this);
  }

  async handleSubmit(onHide) {
    if (!this.validator.allValid()) {
      this.validator.showMessages();
      return true;
    }
    this.setState({ submitting: true });

    const { form } = this.state;
    const { afterClose } = this.props;
    const { t } = this.props;

    const id = getOr(0, "props.id", this);

    const data = {
      detailsContact: pick(["idPublisher", "information"], form),
      contact: {
        idStatus: get("idStatus", form),
        phone: get("phoneContact", form),
      },
    };
    try {
      await details.updateOneContactDetail(id, data);
      this.setState({ submitting: false });
      Swal.fire({
        title: t("common:dataSuccessfullySaved"),
        icon: "success",
        timer: 2000,
        timerProgressBar: true,
      });
      onHide()
      afterClose();

    } catch (error) {
      this.setState({ submitting: false });
      Swal.fire({
        icon: "error",
        title: t("common:dataFailedSaved"),
      });
    }
  }

  componentDidMount() {
    //tirei daqui porque estava indo no banco pegar a informacao sem sabrmos se o usuario iria clicar para editar.
    //agora so traz depois que o usuario abrir o modal
    // this.handleGetOne();
    // const { data } = this.props;
    //vc nao pode pegar o data aqui pode ela vem do banco e demora um tempo por isso tem o await para esperar pela resposta, entao nesse momento aqui ainda nao temos essa informacao
    // this.setState({ form: data });
  }

  render() {
    const { form, validated, publishersOptions, statusOptions } = this.state;
    // console.log(form);
    return (
      <>
        <ModalForm
          modeEdit={true}
          validator={this.validator}
          validated={validated}
          handleSubmit={this.handleSubmit}
          handleInputChange={this.handleInputChange}
          onOpen={this.handleGetOne}
          form={form}
          publishersOptions={publishersOptions}
          statusOptions={statusOptions}
        />
      </>
    );
  }
}

export default withTranslation(["contacts", "common"])(EditDetailsContact);
