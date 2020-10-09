// import React, { useState } from "react";
// import { Button, Modal, Table } from "react-bootstrap";
// import moment from "moment";
// import { map, get } from "lodash/fp";
// import { useTranslation } from "react-i18next";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faEye } from "@fortawesome/free-solid-svg-icons";
// import ListDetailsContact from "../DetailsContact/Modal/ListDetailsContact";

// const MyVerticallyCenteredModal = ({ data, onHide, show, t }) => {
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
//                 <Button variant="primary">{t("common:add")}</Button>
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
//                     {/* Acho que deveriamos renomear para ModalListDetailsContact ao inves de usar QuickLookDetailsEdit
//                     porque ao ver o nome ja sabemos que é um modal e sabemos que ele lista os detalhes de um contato
//                     */}
//                     {/* <QuickLookDetailsEdit data={data} />{" "} */}
//                     <ListDetailsContact 
//                      data={data} 
//                      id={data.phone}
//                     />{" "}
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

// const ShowDetails = (props) => {
//   const [modalShow, setModalShow] = useState(false);
//   const { t } = useTranslation(["common"]);

//   return (
//     <>
//       <Button variant="primary" onClick={() => setModalShow(true)}>
//         <FontAwesomeIcon icon={faEye} />
//       </Button>

//       <MyVerticallyCenteredModal
//         data={props.data}
//         show={modalShow}
//         onHide={setModalShow.bind(this, false)}
//         t={t}
//       />
//     </>
//   );
// };
// export default ShowDetails;
