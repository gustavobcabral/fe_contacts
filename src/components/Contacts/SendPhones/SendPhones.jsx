import React from "react";
import { withTranslation } from "react-i18next";
import OurModal from "../../common/OurModal/OurModal";
import Swal from "sweetalert2";
import {
  getOr,
  map,
  get,
  find,
  pipe,
  join,
  compact,
  isEmpty,
} from "lodash/fp";
import SimpleReactValidator from "simple-react-validator";
import { getLocale, handleInputChangeGeneric } from "../../../utils/forms";
import { contacts, publishers } from "../../../services";
import FormSendPhones from "./FormSendPhones";
import { faShareAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment";

const fields = {
  idPublisher: "",
};

class NewContact extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      form: fields,
      submitting: false,
      loading: false,
      validated: false,
      publishersOptions: [],
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.onlyPhones = this.onlyPhones.bind(this);
    this.mappingContactsPhones = this.mappingContactsPhones.bind(this);

    this.validator = new SimpleReactValidator({
      autoForceUpdate: this,
      locale: getLocale(this.props),
      element: (message) => <div className="text-danger">{message}</div>,
    });
  }

  reducePublishers = (publishers) =>
    map(
      (publisher) => ({
        value: publisher.id,
        label: publisher.name,
        data: publisher,
      }),
      getOr([], "data.data", publishers)
    );

  async componentDidMount() {
    this.setState({ loading: true });
    const publishersOptions = this.reducePublishers(await publishers.getAll());

    this.setState({
      publishersOptions,
      loading: false,
    });
  }

  handleInputChange(event) {
    handleInputChangeGeneric(event, this);
  }

  getDataPublisherSeleccted(idPublisher) {
    const { publishersOptions } = this.state;
    return pipe(
      find((publisher) => publisher.value === idPublisher),
      getOr(0, "data")
    )(publishersOptions);
  }

  getInformation(objData) {
    return !isEmpty(objData.details)
      ? `: ${objData.details.information} - ${moment(
          objData.details.createdAt
        ).format("DD/MM/YYYY HH:mm")}`
      : null;
  }

  mappingContactsPhones(contactsPhones) {
    return map((data) => {
      const objData = JSON.parse(data);
      const info = `${objData.phone} ${this.getInformation(objData)}`;
      return info;
    }, contactsPhones);
  }

  parsePhonesToBeEasierToRead() {
    const { contactsPhones } = this.props;
    const formatted = pipe(
      this.mappingContactsPhones,
      join("\n"),
      (data) => "\n\n" + data,
      encodeURIComponent
    )(contactsPhones);

    return formatted;
  }

  sendMessage() {
    const { t } = this.props;
    const { form } = this.state;
    const idPublisher = get("idPublisher", form);
    const publisherData = this.getDataPublisherSeleccted(idPublisher);
    const textToSend = `${encodeURIComponent(
      t("messageToSend", { name: publisherData.name })
    )}: ${this.parsePhonesToBeEasierToRead()} `;
    window.open(`https://wa.me/${publisherData.phone}?text=${textToSend}`);
  }

  getJustPhonesAllowed(contactsPhones) {
    return pipe(
      map((data) => {
        const objData = JSON.parse(data);
        return !objData.forbiddenSend ? objData.phone : null;
      }),
      compact
    )(contactsPhones);
  }

  async handleSubmit(onHide) {
    this.setState({ validated: true });

    if (!this.validator.allValid()) {
      this.validator.showMessages();
      return true;
    }
    this.setState({ submitting: true });

    const { form } = this.state;
    const { t, contactsPhones } = this.props;
    const idPublisher = get("idPublisher", form);

    const data = {
      phones: this.getJustPhonesAllowed(contactsPhones),
      idPublisher,
    };

    try {
      if (getOr([], "phones", data).length > 0) await contacts.assign(data);
      this.sendMessage();
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
      console.log(error);
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

  onlyPhones() {
    return pipe(
      map((data) => {
        if (isEmpty(data)) return;
        const objData = JSON.parse(data);
        return objData.phone;
      }),
      join(", ")
    )(this.props.contactsPhones);
  }

  render() {
    const { form, validated, publishersOptions } = this.state;
    const { t, contactsPhones } = this.props;
    return (
      <OurModal
        body={FormSendPhones}
        validator={this.validator}
        validated={validated}
        handleSubmit={this.handleSubmit}
        handleInputChange={this.handleInputChange}
        form={form}
        phones={this.onlyPhones(contactsPhones)}
        publishersOptions={publishersOptions}
        title={`${t("title")}`}
        buttonText={<FontAwesomeIcon icon={faShareAlt} />}
        buttonDisabled={contactsPhones.length === 0}
        buttonVariant="warning"
      />
    );
  }
}

export default withTranslation(["sendPhones", "common"])(NewContact);
