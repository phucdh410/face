import React, { Suspense, lazy } from "react";
import PropTypes from "prop-types";
import {
  Box,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";

const List = lazy(() => import("../../../components/no_label/List"));
const DateControl = lazy(() => import("../../../components/no_label/DateControl"));

const FilterPanel = React.memo(
  ({
    searchStore,
    searchFrom,
    searchTo,
    stores,
    renderStores,
    onChange,
    onSelect,
  }) => {
    const theme = useTheme();

    return (
      <Suspense>
        <Box className="row">
          <Box className="col-sm-12">
            <Box className="panel panel-bd lobidrag">
              <Box className="panel-heading">
                <Box className="panel-title">
                  <Typography
                    variant="h4"
                    color={theme.palette.text.secondary}
                  >
                    Thông tin chấm công
                  </Typography>
                </Box>
              </Box>

              <Box className="panel-body">
                <Box className="row">
                  <List
                    id="search_store_id"
                    name="search_store_id"
                    placeholder="Chọn cửa hàng..."
                    data={stores}
                    defaultValue={0}
                    value={searchStore}
                    renderItems={renderStores}
                    onChange={onSelect}
                    controlContainerClass="col-sm-12 col-md-6 col-lg-3"
                  />
                </Box>

                <Box className="row" marginTop={5}>
                  <DateControl
                    id="search_from"
                    name="search_from"
                    label="Từ ngày"
                    placeholder="Từ ngày....."
                    type="text"
                    value={searchFrom}
                    onChange={onChange}
                    readOnly
                    controlContainerClass="col-sm-12 col-md-4 col-lg-3"
                  />

                  <DateControl
                    id="search_to"
                    name="search_to"
                    label="Đến ngày"
                    placeholder="Đến ngày....."
                    type="text"
                    value={searchTo}
                    onChange={onChange}
                    readOnly
                    controlContainerClass="col-sm-12 col-md-4 col-lg-3"
                  />
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Suspense>
    );
  },
);

FilterPanel.propTypes = {
  searchStore: PropTypes.number.isRequired,
  searchFrom: PropTypes.string.isRequired,
  searchTo: PropTypes.string.isRequired,
  stores: PropTypes.array.isRequired,
  renderStores: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired,
};

export default FilterPanel;
