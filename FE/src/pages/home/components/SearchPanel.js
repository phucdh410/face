import React, { Suspense, lazy } from "react";

const Select = lazy(() => import("../../../components/no_label/Select"));
const DatePicker = lazy(() => import("../../../components/no_label/DatePicker"));

const SearchPanel = React.memo(
  ({
    stores,
    renderStores,
    search_store_id,
    search_from,
    search_to,
    onChange,
    onSelect
  }) => {
    return (
      <Suspense>
        <React.Fragment>
          <div className="row">
            <div className="col-sm-12">
              <div className="panel panel-bd lobidrag">
                <div className="panel-heading">
                  <div className="panel-title">
                    <i className="ti-check-box"></i>
                    <h4>Thông tin chấm công</h4>
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
                    </div>

                    <div className="form-group row mb-0">
                      <DatePicker
                          id="search_from"
                          name="search_from"
                          placeholder="Từ ngày....."
                          label="Từ ngày"
                          data_required_error="Bruh, Bạn vui lòng nhập Từ ngày!"
                          type="text"
                          value={search_from}
                          onChange={onChange}
                          onDateChange={onSelect}
                          readonly={true}
                          required={false}
                          control_container_class_name="col-sm-12 col-md-4 col-lg-3"
                        />

                      <DatePicker
                        id="search_to"
                        name="search_to"
                        placeholder="Đến ngày....."
                        label="Đến ngày"
                        data_required_error="Bruh, Bạn vui lòng nhập đến ngày!"
                        type="text"
                        value={search_to}
                        onChange={onChange}
                        onDateChange={onSelect}
                        readonly={true}
                        required={false}
                        control_container_class_name="col-sm-12 col-md-4 col-lg-3"
                      />
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </React.Fragment>
      </Suspense>
    );
  }
);

export default SearchPanel;
