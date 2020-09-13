import React from "react";
import { Button, Table } from "react-bootstrap";
import ContainerCRUD from "../../components/ContainerCRUD/ContainerCRUD";

const PublishersPage = (props) => (
  <ContainerCRUD title="Publishers">
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Nome</th>
          <th>Privilégio</th>
          <th>
            <Button variant="primary">
              Adicionar
            </Button>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Gustavo</td>
          <td>Pioneiro</td>
          <td>
            <Button variant="success">Editar</Button>{" "}
            <Button variant="danger">Exlcuir</Button>
          </td>
        </tr>
        <tr>
          <td>Luciano</td>
          <td>Pioneiro</td>
          <td>
            <Button variant="success">Editar</Button>{" "}
            <Button variant="danger">Exlcuir</Button>
          </td>
        </tr>
        <tr>
          <td>Rafael</td>
          <td>Pioneiro</td>
          <td>
            <Button variant="success">Editar</Button>{" "}
            <Button variant="danger">Exlcuir</Button>
          </td>
        </tr>
      </tbody>
    </Table>
  </ContainerCRUD>
);

export default PublishersPage;
