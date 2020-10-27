import React from "react";
import { Pagination } from "react-bootstrap";
import { toNumber } from "lodash/fp";

const PaginationComponent = (props) => {
  let items = [];
  const { lastPage, to, from, currentPage } = props.pagination;
  const maxPages = lastPage > 5 ? 5 : lastPage;

  for (let number = 1; number <= maxPages; number++) {
    items.push(
      <Pagination.Item
        key={number}
        active={number === toNumber(currentPage)}
        onClick={() => props.onClick({ currentPage: number })}
      >
        {number}
      </Pagination.Item>
    );
  }
  // const twoAhead = maxPages === currentPage ? currentPage + 1 : maxPages + 1;
  // if (maxPages === currentPage) {
  //   for (let number = currentPage + 1; number <= currentPage + 3; number++) {
  //     items.push(
  //       <Pagination.Item
  //         key={number}
  //         active={number === toNumber(currentPage)}
  //         onClick={() => props.onClick({ currentPage: number })}
  //       >
  //         {number}
  //       </Pagination.Item>
  //     );
  //   }
  // }
  // for (let number = twoAhead; number <= twoAhead+3; number++) {
  //   items.push(
  //     <Pagination.Item
  //       key={number}
  //       active={number === toNumber(currentPage)}
  //       onClick={() => props.onClick({ currentPage: number })}
  //     >
  //       {number}
  //     </Pagination.Item>
  //   );
  // }

  return (
    <Pagination>
      <Pagination.First
        onClick={() =>
          currentPage !== 1 ? props.onClick({ currentPage: 1 }) : null
        }
      />
      <Pagination.Prev
        onClick={() =>
          currentPage !== from && from > 0
            ? props.onClick({ currentPage: from })
            : null
        }
      />
      <Pagination>{items}</Pagination>
      <Pagination.Next
        onClick={() =>
          currentPage !== to && to <= lastPage
            ? props.onClick({ currentPage: to })
            : null
        }
      />
      <Pagination.Last
        onClick={() =>
          currentPage !== lastPage
            ? props.onClick({ currentPage: lastPage })
            : null
        }
      />
    </Pagination>
  );
};

export default PaginationComponent;
