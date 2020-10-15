import React from "react";
import { withTranslation } from "react-i18next";
import OurModal from "../../Common/OurModal/OurModal";
import Swal from "sweetalert2";
import { getOr, map, pick, get } from "lodash/fp";
import SimpleReactValidator from "simple-react-validator";
import { getLocale, handleInputChangeGeneric } from "../../../utils/forms";
import { details, publishers } from "../../../services";
import FormDetails from "./FormDetails";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const fields = {
  information: "",
  idPublisher: "",
  idStatus: "",
  idLanguage: "",
  gender: "",
  name: "",
};

class EditDetailsContact extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      form: fields,
      submitting: false,
      loading: false,
      validated: false,
      publishersOptions: [],
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

  async handleGetOne() {
    this.setState({ loading: true });
    const id = getOr(0, "props.id", this);
    const response = await details.getOne(id);
    const form = getOr(fields, "data.data", response);
    const publishersOptions = this.reducePublishers(await publishers.getAll());

    this.setState({
      form,
      publishersOptions,
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
    const { t, contact } = this.props;
    const id = getOr(0, "props.id", this);

    const data = {
      detailsContact: pick(["idPublisher", "information"], form),
      contact: {
        idStatus: get("idStatus", form),
        idLanguage: get("idLanguage", form),
        gender: get("gender", form),
        phone: get("phone", contact),
        name: get("name", form),
      },
    };
    try {
      await details.updateOneContactDetail(id, data);
      Swal.fire({
        title: t("common:dataSuccessfullySaved"),
        icon: "success",
        timer: 2000,
        timerProgressBar: true,
      });
      onHide();
      this.setState({ form: fields, submitting: false, validated: false });
      this.validator.hideMessages();
    } catch (error) {
      this.setState({ submitting: false });
      Swal.fire({
        icon: "error",
        title: t(
          `common:${getOr("errorTextUndefined", "response.data.cod", error)}`
        ),
        text: t(
          `common:${getOr(
            "errorWithoutDetails",
            "response.data.error.code",
            error
          )}`
        ),
      });
    }
  }

  render() {
    const { form, validated, publishersOptions } = this.state;
    const { t, afterClose } = this.props;
    return (
      <OurModal
        body={FormDetails}
        validator={this.validator}
        validated={validated}
        handleSubmit={this.handleSubmit}
        handleInputChange={this.handleInputChange}
        form={form}
        onEnter={this.handleGetOne}
        onExit={afterClose}
        publishersOptions={publishersOptions}
        title={`${t("common:edit")} ${t("title")}`}
        buttonText={<FontAwesomeIcon icon={faEdit} />}
      />
    );
  }
}

export default withTranslation(["detailsContacts", "common"])(
  EditDetailsContact
);
