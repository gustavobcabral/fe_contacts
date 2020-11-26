import React from "react";
import { withTranslation } from "react-i18next";
import ContainerCRUD from "../../../components/common/ContainerCRUD/ContainerCRUD";
import SimpleReactValidator from "simple-react-validator";
import { getOr, pick, get } from "lodash/fp";
import FormDetails from "../FormDetails";
import { getLocale, handleInputChangeGeneric } from "../../../utils/forms";
import { details, publishers, contacts } from "../../../services";
import { reducePublishers } from "../../../stateReducers/publishers";
import { showError, showSuccessful } from "../../../utils/generic";
import { Container } from "react-bootstrap";
import { GENDER_UNKNOWN } from "../../../constants/contacts";

const fields = {
  information: "",
  idPublisher: "",
  idStatus: "",
  idLanguage: null,
  gender: "",
  name: "",
  owner: "",
  typeCompany: "0",
};

class NewDetailsContact extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      form: fields,
      loading: false,
      validated: false,
      publishersOptions: [],
      statusOptions: [],
      phone: getOr(0, "match.params.phone", props),
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleGetOneContact = this.handleGetOneContact.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.validator = new SimpleReactValidator({
      autoForceUpdate: this,
      locale: getLocale(this.props),
      element: (message) => <div className="text-danger">{message}</div>,
    });
  }

  async handleGetOneContact() {
    const { phone } = this.state;
    const contact = await contacts.getOne(phone);
    const form = getOr(fields, "data.data", contact);
    const newForm = {
      ...fields,
      ...form,
    };
    this.setState({ form: newForm });
  }

  async componentDidMount() {
    this.setState({ loading: true });
    this.handleGetOneContact();
    const publishersOptions = reducePublishers(await publishers.getAll());

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
    this.setState({ loading: true });

    const { form, phone } = this.state;
    const { history } = this.props;
    const { t } = this.props;
    const gender =
      form.typeCompany === true || form.typeCompany === "1"
        ? GENDER_UNKNOWN
        : form.gender;
    const owner =
      form.typeCompany === true || form.typeCompany === "1" ? form.owner : null;
      
    const data = {
      detailsContact: {
        ...pick(["idPublisher", "information"], form),
        phoneContact: phone,
      },
      contact: {
        idStatus: get("idStatus", form),
        idLanguage: get("idLanguage", form),
        phone,
        gender,
        owner,
        name: get("name", form),
        typeCompany: get("typeCompany", form),
      },
    };
    try {
      await details.create(data);
      this.setState({ loading: false });
      history.goBack();
      showSuccessful(t);
    } catch (error) {
      this.setState({ loading: false });
      showError(error, t, "detailsContacts");
    }
  }

  render() {
    const { form, validated, publishersOptions, loading } = this.state;
    const { t, contact, history } = this.props;
    return (
      <ContainerCRUD title={t("title")} {...this.props}>
        <Container className="border p-4">
          <h1>{`${t("common:new")} ${t("detailsContacts:title")}`}</h1>
          <FormDetails
            validator={this.validator}
            loading={loading}
            validated={validated}
            handleSubmit={this.handleSubmit}
            handleInputChange={this.handleInputChange}
            form={form}
            publishersOptions={publishersOptions}
            title={`${t("common:new")} ${t("titleCrud")} #${get(
              "phone",
              contact
            )}`}
            onSubmit={this.handleSubmit}
            history={history}
          />
        </Container>
      </ContainerCRUD>
    );
  }
}

export default withTranslation(["contacts", "common"])(NewDetailsContact);
