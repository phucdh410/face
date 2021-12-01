import React from "react";

import Select from "../../../components/no_label/Select";
import Input from "../../../components/no_label/Input";

const SearchPanel = React.memo(
  ({ search_store_id, search_input, stores, onChange, renderStores }) => {
    return (
      <React.Fragment>
        <div className="row">
          <div className="col-sm-12 p-0">
            <div className="panel panel-bd lobidrag">
              <div className="panel-heading">
                <div className="panel-title">
                  <h4>Quản lý nhân viên</h4>
                </div>
              </div>

              <div className="panel-body">
                <form id="search-form" noValidate>
                  <div className="form-group row mb-0">
                    <Select
                      id="search_store_id"
                      name="search_store_id"
                      placeholder="Chọn cửa hàng..."
                      data={stores}
                      default_value="0"
                      default_message="Chọn cửa hàng"
                      value={search_store_id}
                      onChange={onChange}
                      renderOptions={renderStores}
                      control_container_class_name="col-sm-12 col-md-4 col-lg-3"
                      data_minimum_results_for_search=""
                      parent="search-form"
                    />

                    <Input
                      id="search_input"
                      name="search_input"
                      placeholder="Nhập nội dung cần tìm kiếm..."
                      value={search_input}
                      onChange={onChange}
                      control_container_class_name="col-sm-12 col-md-4 col-lg-3"
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
);

export default SearchPanel;
