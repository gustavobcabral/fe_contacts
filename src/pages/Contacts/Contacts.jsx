import React from "react";
import { Button, Table } from "react-bootstrap";
import ContainerCRUD from "../../components/ContainerCRUD/ContainerCRUD";

const ContactsPage = (props) => (
  <ContainerCRUD title="Contacts">
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Nome</th>
          <th>Telefone</th>
          <th>Idioma</th>
          <th>Data</th>
          <th>Status</th>
          <th>Detalhes</th>
          <th>
            <Button variant="primary">Adicionar</Button>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Zé</td>
          <td>30232713</td>
          <td>espanhol</td>
          <td>09/09/2020</td>
          <td>Revisita</td>
          <td>
            <Button variant="outline-info">Mostrar</Button>
          </td>

          <td>
            <Button variant="success">Editar</Button>{" "}
            <Button variant="danger">Exlcuir</Button>
          </td>
        </tr>
      </tbody>
    </Table>
  </ContainerCRUD>
);

export default ContactsPage;
