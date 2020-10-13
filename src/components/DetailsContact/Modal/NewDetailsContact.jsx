import React from "react";
import { withTranslation } from "react-i18next";
import OurModal from "../../Common/OurModal/OurModal";
import Swal from "sweetalert2";
import { getOr, map, pick, get } from "lodash/fp";
import SimpleReactValidator from "simple-react-validator";
import { getLocale, handleInputChangeGeneric } from "../../../utils/forms";
import { details, publishers, status } from "../../../services";
import FormDetails from "./FormDetails";
import { faPlusSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const fields = {
  information: "",
  idPublisher: "",
  idStatus: "",
  gender: "",
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
    const { contact, t } = this.props;

    const data = {
      detailsContact: {
        ...pick(["idPublisher", "information"], form),
        phoneContact: get("phone", contact),
      },
      contact: {
        idStatus: get("idStatus", form),
        gender: get("gender", form),
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
    const { form, validated, publishersOptions, statusOptions } = this.state;
    const { t, afterClose } = this.props;
    return (
      <OurModal
        body={FormDetails}
        validator={this.validator}
        validated={validated}
        handleSubmit={this.handleSubmit}
        handleInputChange={this.handleInputChange}
        form={form}
        onExit={afterClose}
        publishersOptions={publishersOptions}
        statusOptions={statusOptions}
        title={`${t("common:new")} ${t("title")}`}
        buttonText={<FontAwesomeIcon icon={faPlusSquare} />}
      />
    );
  }
}

export default withTranslation(["detailsContacts", "common"])(
  NewDetailsContact
);
