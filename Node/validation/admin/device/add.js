// https://github.com/chriso/validator.js/
const Validator = require('validator');
const isEmpty = require('../../is-empty');

module.exports = validateAddInput = (data) => {
    let errors = {};

    data.company_id = !isEmpty(data.company_id) ? data.name : '';
    data.name = !isEmpty(data.name) ? data.name : '';
    data.position = !isEmpty(data.position) ? data.position : '';
    data.store_id = !isEmpty(data.store_id) ? data.store_id : '';

    if(Validator.isEmpty(data.company_id)) {
        errors.error_code = '1001';
        errors.company_id = 'Bruh, Bạn vui lòng chọn doanh nghiệp!';
    }

    if(Validator.isEmpty(data.name)) {
        errors.error_code = '1002';
        errors.name = 'Bruh, Bạn vui lòng nhập tên thiết bị!';
    }

    if(Validator.isEmpty(data.position)) {
        errors.error_code = '1003';
        errors.position = 'Bruh, Bạn vui lòng nhập vị trí thiết bị!';
    }

    if(Validator.isEmpty(data.store_id)) {
        errors.error_code = '1004';
        errors.store_id = 'Bruh, Bạn vui lòng chọn cửa hàng!';
    }

    return {
        errors, 
        is_valid: isEmpty(errors)
    };
}