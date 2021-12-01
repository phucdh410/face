import React from "react";
import Input from "../../../components/no_label/Input";

const SearchPanel = React.memo(({ search_input, onChange }) => {
  return (
    <React.Fragment>
      <div className="row">
        <div className="col-sm-12 p-0">
          <div className="panel panel-bd lobidrag">
            <div className="panel-heading">
              <div className="panel-title">
                <h4>Quản lý vai trò người dùng</h4>
              </div>
            </div>

            <div className="panel-body">
              <form id="search-form" noValidate>
                <div className="form-group row mb-0">
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
});

export default SearchPanel;
