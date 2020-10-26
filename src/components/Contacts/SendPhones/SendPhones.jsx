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
  includes,
} from "lodash/fp";
import SimpleReactValidator from "simple-react-validator";
import { getLocale, handleInputChangeGeneric } from "../../../utils/forms";
import { contacts, publishers } from "../../../services";
import FormSendPhones from "./FormSendPhones";
import { faShareAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment";
import { URL_SEND_MESSAGE } from "../../../constants/settings";
import { parseErrorMessage } from "../../../utils/generic";

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
    this.mappingContactsPhones = this.mappingContactsPhones.bind(this);
    this.getInformation = this.getInformation.bind(this);

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

  getDataPublisherSelected(idPublisher) {
    const { publishersOptions } = this.state;
    return pipe(
      find((publisher) => publisher.value === idPublisher),
      getOr(0, "data")
    )(publishersOptions);
  }

  getInformation(contact) {
    const { t } = this.props;

    return !isEmpty(contact.details)
      ? `${contact.details.information} - ${moment(
          contact.details.createdAt
        ).format("DD/MM/YYYY HH:mm")}`
      : t("withoutDetails");
  }

  mappingContactsPhones({ checksContactsPhones, contactsData }) {
    return map((phone) => {
      const contact = find((contact) => contact.phone === phone, contactsData);
      return `*${phone}:* ${this.getInformation(contact)}`;
    }, checksContactsPhones);
  }

  parsePhonesToBeEasierToRead() {
    const { checksContactsPhones, contactsData } = this.props;
    return pipe(
      this.mappingContactsPhones,
      join("\n"),
      (data) => "\n\n" + data,
      encodeURIComponent
    )({ checksContactsPhones, contactsData });
  }

  sendMessage() {
    const { t } = this.props;
    const { form } = this.state;
    const idPublisher = get("idPublisher", form);
    const publisherData = this.getDataPublisherSelected(idPublisher);
    const textToSend = `${encodeURIComponent(
      t("messageToSend", { name: publisherData.name })
    )}: ${this.parsePhonesToBeEasierToRead()} `;
    window.open(
      `${URL_SEND_MESSAGE}?phone=${publisherData.phone}&text=${textToSend}`
    );
  }

  getJustPhonesAllowed(checksContactsPhones, contactsData) {
    return pipe(
      map((phone) => {
        const contact = find(
          (contact) => contact.phone === phone,
          contactsData
        );
        return !contact.waitingFeedback ? contact.phone : null;
      }),
      compact
    )(checksContactsPhones);
  }

  async handleSubmit(onHide) {
    this.setState({ validated: true });

    if (!this.validator.allValid()) {
      this.validator.showMessages();
      return true;
    }
    this.setState({ submitting: true });

    const { form } = this.state;
    const { t, checksContactsPhones, contactsData } = this.props;
    const idPublisher = get("idPublisher", form);

    const dataAssign = {
      phones: this.getJustPhonesAllowed(checksContactsPhones, contactsData),
      idPublisher,
    };

    try {
      if (getOr([], "phones", dataAssign).length > 0)
        await contacts.assign(dataAssign);
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
      const textError = parseErrorMessage(error);
      let text = textError;
      if (includes("ERROR_PUBLISHER_ALREADY_WAITING_FEEDBACK", textError)) {
        const phone = getOr(0, "response.data.extra.phone", error);
        text = t(`ERROR_PUBLISHER_ALREADY_WAITING_FEEDBACK`, { phone });
      }

      this.setState({ submitting: false });
      Swal.fire({
        icon: "error",
        title: t(
          `common:${getOr("errorTextUndefined", "response.data.cod", error)}`
        ),
        text,
      });
    }
  }

  render() {
    const { form, validated, publishersOptions } = this.state;
    const { t, checksContactsPhones } = this.props;
    return (
      <OurModal
        body={FormSendPhones}
        validator={this.validator}
        validated={validated}
        handleSubmit={this.handleSubmit}
        handleInputChange={this.handleInputChange}
        form={form}
        phones={join(", ", checksContactsPhones)}
        publishersOptions={publishersOptions}
        title={`${t("title")}`}
        buttonText={<FontAwesomeIcon icon={faShareAlt} />}
        buttonDisabled={checksContactsPhones.length === 0}
        buttonVariant="warning"
      />
    );
  }
}

export default withTranslation(["sendPhones", "common"])(NewContact);
