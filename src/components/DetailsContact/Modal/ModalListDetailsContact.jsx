//aqui vai toda a logica para criar um novo
// Aqui voce devera usar o mesmo formulario que vc usa via rora o arquivo FormDetails.js que na verdade deveri ser jsx porque rederiza componentes

import React, { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faPlusSquare } from "@fortawesome/free-solid-svg-icons";
import Select from "react-select";

const ModalListDetailsContact = (props) => {
  console.log(props, "MERDA.PROPS");

  return (
    <Modal show={props.show} onHide={props.onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>{props.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group>
          <Form.Label>Publisher</Form.Label>
          <Select
          // name="idPublisher"
          // value={publisherSelected}
          // options={publishersOptions}
          // onChange={({ value }) => props.setFormData("idPublisher", value)}
          />
          {/* {validator.message("idPublisher", form.idPublisher, "required")} */}
        </Form.Group>
        <Form.Group>
          <Form.Label>Status</Form.Label>
          <Select
          // name="idStatus"
          // value={statusSelected}
          // options={statusOptions}
          // onChange={({ value }) => props.setFormData("idStatus", value)}
          />
          {/* {validator.message("idStatus", form.idStatus, "required")} */}
        </Form.Group>
        <Form.Group>
          <Form.Label>Details</Form.Label>
          <Form.Control
          // as="textarea"
          // rows={3}
          // name="information"
          // onChange={props.handleInputChange}
          // defaultValue={form.information}
          />
          {/* {validator.message("information", form.information, "required")} */}
        </Form.Group>
        <Button
          //disabled={submitting}
          variant="primary"
          onClick={props.onSubmit}
        >
          {/* {t(submitting ? "common:btnSubmitting" : "common:btnSubmit")} */}
        </Button>{" "}
        <Button
          variant="secondary"
          //onClick={() => props.props.history.goBack()}
        >
          {/* {t("common:back")} */}
        </Button>{" "}
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>{props.t("common:close")}</Button>
      </Modal.Footer>
    </Modal>
  );
};

const ModalListDetailsContactComponent = (props) => {
  const [modalShow, setModalShow] = useState(false);
  const { t } = useTranslation(["status", "common"]);
  const { modeEdit } = props;

  return (
    <>
      <Button variant="primary" onClick={() => setModalShow(true)}>
        <FontAwesomeIcon icon={modeEdit ? faEdit : faPlusSquare} />
      </Button>
      {/* <Button variant="primary" onClick={() => setModalShow(true)}>
        {t("common:add")}
      </Button> */}
      <ModalListDetailsContact
        {...props}
        show={modalShow}
        onHide={setModalShow.bind(this, false)}
        t={t}
      />
    </>
  );
};
export default ModalListDetailsContactComponent;

// import React from "react";
// import { Button, Modal, Table } from "react-bootstrap";
// import moment from "moment";
// import { map, get } from "lodash/fp";
// import EditDetailsContacts from "./EditDetailsContact";
// import AskDelete from "../../Common/AskDelete/AskDelete";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faEye, faEdit } from "@fortawesome/free-solid-svg-icons";
// import { details } from "../../../services";
// import { delay } from "lodash";
// import FormDetailsNew from "./NewDetailsContact";

// const ModalDetailsContact = ({ data, onHide, show, t, del }) => {
//   //  console.log(data, "OQ VEM DESSA MERDA ?");
//   return (
//     <Modal
//       show={show}
//       onHide={onHide}
//       size="lg"
//       aria-labelledby="contained-modal-title-vcenter"
//       centered
//     >
//       <Modal.Header closeButton>
//         <Modal.Title id="contained-modal-title-vcenter">
//           {data.name} - {data.phone}
//         </Modal.Title>
//       </Modal.Header>
//       <Modal.Body>
//         <Table striped bordered hover responsive>
//           <thead>
//             <tr>
//               <th>{t("common:publisher")}</th>
//               <th>{t("common:date")}</th>
//               <th>{t("common:information")}</th>
//               <th>
//                 <Button onClick={<FormDetailsNew />} variant="primary">
//                   {t("common:add")}
//                 </Button>
//               </th>
//             </tr>
//           </thead>
//           <tbody>
//             {map(
//               ({ createdAt, namePublisher, information }) => (
//                 <tr key={createdAt}>
//                   <td>{namePublisher}</td>
//                   <td>{moment(createdAt).format("DD/MM/YYYY HH:mm")}</td>
//                   <td colSpan="2">{information}</td>
//                   <td>
//                     <Button variant="success" onClick={() => {}}>
//                       <FontAwesomeIcon icon={faEdit} />
//                     </Button>{" "}
//                     {/* <EditDetailsContacts
//                          data={status}
//                         afterClose={this.handleGetAll}
//                       />{" "} */}
//                     <AskDelete
//                       id={data.details.id}
//                       funcToCallAfterConfirmation={del}
//                     />
//                   </td>
//                 </tr>
//               ),
//               get("details", data)
//             )}
//           </tbody>
//         </Table>
//       </Modal.Body>
//       <Modal.Footer>
//         <Button onClick={onHide}>Close</Button>
//       </Modal.Footer>
//     </Modal>
//   );
// };

// export default ModalDetailsContact;
