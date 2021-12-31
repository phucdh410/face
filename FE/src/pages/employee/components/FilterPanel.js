import React, { Suspense, lazy } from "react";
import PropTypes from "prop-types";
import { Box, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";

const Input = lazy(() => import("../../../components/no_label/Input"));
const List = lazy(() => import("../../../components/no_label/List"));

const FilterPanel = React.memo(
  ({ searchStore, searchInput, stores, onChange, renderStores }) => {
    const theme = useTheme();
    return (
      <Suspense>
        <Box className="row">
          <Box className="col-sm-12 p-0">
            <Box className="panel panel-bd lobidrag">
              <Box className="panel-heading">
                <Box className="panel-title">
                  <Typography variant="h4" color={theme.palette.text.secondary}>
                    Quản lý nhân viên
                  </Typography>
                </Box>
              </Box>

              <Box className="panel-body">
                <Box className="form-group row mb-0">
                  <List
                    id="search_store_id"
                    name="search_store_id"
                    placeholder="Chọn cửa hàng..."
                    data={stores}
                    defaultValue={0}
                    value={searchStore}
                    onChange={onChange}
                    renderItems={renderStores}
                    controlContainerClass="col-sm-12 col-md-4 col-lg-3"
                  />

                  <Input
                    id="search_input"
                    name="search_input"
                    placeholder="Nhập nội dung cần tìm kiếm..."
                    value={searchInput}
                    onChange={onChange}
                    controlContainerClass="col-sm-12 col-md-4 col-lg-3"
                  />
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Suspense>
    );
  }
);

FilterPanel.propTypes = {
  searchInput: PropTypes.string.isRequired,
  searchStore: PropTypes.number.isRequired,
  stores: PropTypes.array.isRequired,
  renderStores: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default FilterPanel;
