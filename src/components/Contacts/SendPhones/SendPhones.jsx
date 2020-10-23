import React from "react";
import { withTranslation } from "react-i18next";
import OurModal from "../../common/OurModal/OurModal";
import Swal from "sweetalert2";
import { getOr, map, get, find, pipe, startsWith, join } from "lodash/fp";
import SimpleReactValidator from "simple-react-validator";
import { getLocale, handleInputChangeGeneric } from "../../../utils/forms";
import { contacts, publishers } from "../../../services";
import FormSendPhones from "./FormSendPhones";
import { faShareAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { COD_COUNTRY } from "../../../constants/settings";

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
    this.justNumbers = this.justNumbers.bind(this);

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

  getPhonePublisher(idPublisher) {
    const { publishersOptions } = this.state;
    const phone = pipe(
      find((publisher) => publisher.value === idPublisher),
      getOr(0, "data.phone"),
      (data) => (startsWith("0", data) ? data.substr(1) : data)
    )(publishersOptions);
    return phone.indexOf(COD_COUNTRY) === -1 ? `${COD_COUNTRY}${phone}` : phone;
  }

  mappingObjData(phones) {
    return map((data) => {
      const objData = JSON.parse(data);
      const info = `${objData.phone}: ${objData.details}`;
      return info;
    }, phones);
  }

  parsePhonesToBeEasierToRead() {
    const { phones } = this.props;
    const formatted = pipe(
      this.mappingObjData,
      (data) => {
        console.log(data);
        return data;
      },
      join("\n"),
      (data) => "\n\n" + data,
      encodeURIComponent
    )(phones);

    return formatted;
  }

  sendMessage() {
    const { t } = this.props;
    const { form } = this.state;
    const idPublisher = get("idPublisher", form);
    const publisherPhone = this.getPhonePublisher(idPublisher);
    const textToSend = `${encodeURIComponent(
      t("messageToSend")
    )}: ${this.parsePhonesToBeEasierToRead()} `;
    window.open(`https://wa.me/${publisherPhone}?text=${textToSend}`);
  }

  async handleSubmit(onHide) {
    this.setState({ validated: true });

    if (!this.validator.allValid()) {
      this.validator.showMessages();
      return true;
    }
    this.setState({ submitting: true });

    const { form } = this.state;
    const { t, phones } = this.props;
    const idPublisher = get("idPublisher", form);

    const data = {
      phones,
      idPublisher,
    };
    this.sendMessage();

    try {
      await contacts.assign(data);
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

  justNumbers() {
    return join(
      ", ",
      map((data) => {
        const objData = JSON.parse(data);
        return objData.phone;
      }, this.props.phones)
    );
  }

  render() {
    const { form, validated, publishersOptions } = this.state;
    const { t, phones } = this.props;
    return (
      <OurModal
        body={FormSendPhones}
        validator={this.validator}
        validated={validated}
        handleSubmit={this.handleSubmit}
        handleInputChange={this.handleInputChange}
        form={form}
        phones={this.justNumbers(phones)}
        publishersOptions={publishersOptions}
        title={`${t("title")}`}
        buttonText={<FontAwesomeIcon icon={faShareAlt} />}
        buttonDisabled={phones.length === 0}
        buttonVariant="warning"
      />
    );
  }
}

export default withTranslation(["SendPhones", "common"])(NewContact);
