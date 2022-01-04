import React from "react";
import { MenuItem, Typography } from "@mui/material";
import classnames from "classnames";
import memoizeOne from "memoize-one";

export const renderSelect = memoizeOne((data, theme) =>
  data.map((item, key) => (
    <MenuItem key={key} value={item.id}>
      <Typography variant="h5" color={theme.palette.text.primary}>
        {item.name}
      </Typography>
    </MenuItem>
  ))
);

const renderPage = memoizeOne((pages, page, handler) => {
  const items = [];

  for (let i = 0; i < pages; i++) {
    items.push(
      <li
        key={i}
        className={classnames("paginate_button", {
          active: page === i,
        })}
      >
        <a
          href="#/"
          aria-controls="data2"
          data-dt-idx="0"
          tabIndex="0"
          onClick={() => handler(pages, i)}
        >
          {i + 1}
        </a>
      </li>
    );
  }

  return items;
});

export const renderPagination = memoizeOne(
  (pages, page, prev, next, handler) => (
    <div
      className="datatables-paginate paging_simple_numbers"
      id="data2_paginate"
    >
      {/* Display cuurent page */}
      <div className="pagination">
        <div
          className="dataTables_info"
          id="dataTable_info"
          role="status"
          aria-live="polite"
        >
          Trang số: {page + 1}
        </div>
      </div>

      <ul className="pagination pull-right">
        {/* Previous */}
        <li
          className={classnames("paginate_button previous", {
            disabled: !(page !== 0),
          })}
        >
          <a
            href="#/"
            aria-controls="data2"
            data-dt-idx="0"
            tabIndex="0"
            onClick={prev}
          >
            Previous
          </a>
        </li>

        {renderPage(pages, page, handler)}

        {/* Next */}
        <li
          className={classnames("paginate_button next", {
            disabled: !(page !== pages - 1),
          })}
        >
          <a
            href="#/"
            aria-controls="data2"
            data-dt-idx="7"
            tabIndex="0"
            onClick={next}
          >
            Next
          </a>
        </li>
      </ul>
    </div>
  )
);

export const handleError = (err, dispatch, type) => {
  if (err.response) {
    dispatch({
      type,
      payload: err.response.data,
    });
    return true;
  }
  dispatch({
    type,
    payload: { message: err.message },
  });

  return false;
};

// Re-run the filter whenever the list array or filter text changes:
// eslint-disable-next-line camelcase
export const getCamerasByStore = memoizeOne((cameras, store_id) => {
  // eslint-disable-next-line camelcase
  const items = cameras.filter((camera) => camera.store_id === store_id);
  return items;
});

// Re-run the filter whenever the list array or filter text changes:
export const getStoreById = memoizeOne((stores, value) => {
  const items = stores.filter((item) => item._id === value);
  return items;
});

export const prevHandler = async (e, pages, page, handler) => {
  e.preventDefault();
  if (page > 0) await handler(pages, page - 1);
};

export const nextHandler = async (e, pages, page, handler) => {
  e.preventDefault();
  if (page < pages - 1) await handler(pages, page + 1);
};
