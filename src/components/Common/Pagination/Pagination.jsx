import React from "react";
import { Pagination } from "react-bootstrap";
import { toNumber, isNil } from "lodash/fp";
import { withTranslation } from "react-i18next";
import { ITEMS_PAGINATION } from "../../../constants/application";

const PaginationComponent = (props) => {
  const { lastPage, to, from, currentPage } = props.pagination;
  const { t } = props;

  if (isNil(currentPage)) return <span>{t("loading")}...</span>;
  let items = [];
  const maxItems = ITEMS_PAGINATION;
  const goBackStart = currentPage - 1 > 0 ? currentPage - 1 : 1;
  const goBackEnd = currentPage - maxItems > 0 ? currentPage - maxItems : 1;
  const goForwardStart =
    currentPage + 1 > lastPage ? lastPage : currentPage + 1;
  const goForwardEnd =
    currentPage + maxItems > lastPage ? lastPage : currentPage + maxItems;
  for (let number = goBackEnd; number <= goBackStart; number++) {
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
  if (currentPage !== 1)
    items.push(
      <Pagination.Item
        key={currentPage}
        active={currentPage === toNumber(currentPage)}
        onClick={() => props.onClick({ currentPage: currentPage })}
      >
        {currentPage}
      </Pagination.Item>
    );

  for (let number = goForwardStart; number <= goForwardEnd; number++) {
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
export default withTranslation(["common"])(PaginationComponent);
