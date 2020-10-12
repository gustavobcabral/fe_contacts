import React from "react";
import { withTranslation } from "react-i18next";
import { details, publishers, status } from "../../../services";
import ContainerCRUD from "../../../components/ContainerCRUD/ContainerCRUD";
import { getOr, map, pick, get } from "lodash/fp";
import FormDetails from "./FormDetails";
import SimpleReactValidator from "simple-react-validator";
import Swal from "sweetalert2";

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
      locale:
        this.props.i18n.language === "en-US" ? "en" : this.props.i18n.language,
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
    const id = getOr(0, "props.match.params.id", this);
    this.setState({ loading: true });
    const response = await details.getOne(id);
    console.log(response, "response na URl");
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

  setFormData = (name, value) => {
    const { form } = this.state;
    this.setState({
      form: {
        ...form,
        [name]: value,
      },
    });
  };

  handleInputChange(obj) {
    const {
      target: { name, value },
    } = obj;
    this.setFormData(name, value);
  }

  async handleSubmit() {
    if (!this.validator.allValid()) {
      this.validator.showMessages();
      return true;
    }
    this.setState({ submitting: true });

    const { form } = this.state;
    const { history } = this.props;
    const { t } = this.props;

    const id = getOr(0, "props.match.params.id", this);

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
      }).then(() => {
        history.goBack();
      });
    } catch (error) {
      this.setState({ submitting: false });
      Swal.fire({
        icon: "error",
        title: t("common:dataFailedSaved"),
      });
    }
  }

  componentDidMount() {
    this.handleGetOne();
  }

  render() {
    const { t } = this.props;
    const phone = getOr(0, "props.match.params.phone", this);
    const id = getOr(0, "props.match.params.id", this);

    return (
      <>
        <ContainerCRUD title={t("title")} {...this.props}>
          <h1>EDIT TODOS OS DETALHES</h1>
          <h4>Phone:{phone}</h4>
          <h4>Details number:{id}</h4>
          <FormDetails onSubmit={(e) => this.handleSubmit(e)} {...this} />
        </ContainerCRUD>
      </>
    );
  }
}

export default withTranslation(["contacts", "common"])(EditDetailsContact);
