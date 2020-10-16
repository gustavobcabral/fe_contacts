import React from "react";
import { Pagination } from "react-bootstrap";
import { toNumber } from "lodash/fp";

const PaginationComponent = (props) => {
  let items = [];
  const { currentPage, totalRows, lastPage, from, to } = props.pagination;
  for (let number = 1; number <= totalRows; number++) {
    items.push(
      <Pagination.Item
        key={number}
        active={number === toNumber(currentPage)}
        onClick={() => props.onClick(number)}
      >
        {number}
      </Pagination.Item>
    );
  }

  return (
    <Pagination>
      <Pagination.First onClick={() => props.onClick(1)} />
      <Pagination.Prev onClick={() => props.onClick(from)} />
      <Pagination>{items}</Pagination>
      <Pagination.Next onClick={() => props.onClick(to)} />
      <Pagination.Last onClick={() => props.onClick(lastPage)} />
    </Pagination>
  );
};

export default PaginationComponent;
