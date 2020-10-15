import React from "react";
import { withTranslation } from "react-i18next";
import ContainerCRUD from "../../../components/ContainerCRUD/ContainerCRUD";
import SimpleReactValidator from "simple-react-validator";
import { getOr, map, pick, get } from "lodash/fp";
import FormDetails from "./FormDetails";
import { getLocale, handleInputChangeGeneric } from "../../../utils/forms";
import { details, publishers } from "../../../services";
import Swal from "sweetalert2";

const fields = {
  information: "",
  idPublisher: "",
  idStatus: "",
  idLanguage: "",
  gender: "",
  name: "",
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

  async handleSubmit() {
    this.setState({ validated: true });
    if (!this.validator.allValid()) {
      this.validator.showMessages();
      return true;
    }
    this.setState({ submitting: true });

    const { form } = this.state;
    const { history } = this.props;
    const { t } = this.props;

    const data = {
      detailsContact: {
        ...pick(["idPublisher", "information"], form),
        phoneContact: getOr(0, "props.match.params.phone", this),
      },
      contact: {
        idStatus: get("idStatus", form),
        idLanguage: get("idLanguage", form),
        phone: getOr(0, "props.match.params.phone", this),
        gender: get("gender", form),
        name: get("name", form),
      },
    };
    try {
      await details.create(data);
      this.setState({ submitting: false });
      history.goBack();
      Swal.fire({
        title: t("common:dataSuccessfullySaved"),
        icon: "success",
      });
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
    const { t } = this.props;
    const phone = getOr(0, "props.match.params.phone", this);
    return (
      <ContainerCRUD title={t("title")} {...this.props}>
        <h1>{`${t("common:new")} ${t("detailsContacts:title")}: ${phone}`}</h1>

        <FormDetails onSubmit={(e) => this.handleSubmit(e)} {...this} />
      </ContainerCRUD>
    );
  }
}

export default withTranslation(["contacts", "common"])(NewDetailsContact);
