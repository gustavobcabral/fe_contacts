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

class NewDetailsContact extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      form: fields,
      submitting: false,
      loading: false,
      validated: false,
      publishersOptions: [],
      statusOptions: [],
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.onOpen = this.onOpen.bind(this);
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

  async componentDidMount() {
    this.setState({ loading: true });
    const publishersOptions = this.reducePublishers(await publishers.getAll());
    const statusOptions = this.reduceStatus(await status.getAll());

    this.setState({
      publishersOptions,
      statusOptions,
      loading: false,
    });
  }

  handleInputChange(event) {
    handleInputChangeGeneric(event, this);
  }

  async handleSubmit(onHide) {
    this.setState({ validated: true });

    if (!this.validator.allValid()) {
      this.validator.showMessages();
      return true;
    }
    this.setState({ submitting: true });

    const { form } = this.state;
    const { afterClose, contact, t } = this.props;

    const data = {
      detailsContact: {
        ...pick(["idPublisher", "information"], form),
        phoneContact: get("phone", contact),
      },
      contact: {
        idStatus: get("idStatus", form),
        phone: get("phone", contact),
      },
    };
    try {
      await details.create(data);
      this.setState({ submitting: false });
      Swal.fire({
        title: t("common:dataSuccessfullySaved"),
        icon: "success",
        timer: 2000,
        timerProgressBar: true,
      });
      onHide();
      afterClose();
    } catch (error) {
      this.setState({ submitting: false });
      Swal.fire({
        icon: "error",
        title: t("common:dataFailedSaved"),
      });
    }
  }

  onOpen() {
    this.setState({
      form: fields,
      validated: false,
    });
    this.validator.hideMessages();
    console.log(this.validator.hideMessages());
  }

  render() {
    const { form, validated, publishersOptions, statusOptions } = this.state;
    //  console.log(form);
    return (
      <>
        <ModalForm
          modeEdit={false}
          validator={this.validator}
          validated={validated}
          handleSubmit={this.handleSubmit}
          handleInputChange={this.handleInputChange}
          onOpen={this.onOpen}
          form={form}
          publishersOptions={publishersOptions}
          statusOptions={statusOptions}
        />
      </>
    );
  }
}

export default withTranslation(["contacts", "common"])(NewDetailsContact);
