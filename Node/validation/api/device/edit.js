// https://github.com/chriso/validator.js/
const Validator = require('validator');
const isEmpty = require('../../is-empty');

module.exports = validateEditInput = (data) => {
    let errors = {};

    data.id = !isEmpty(data.id) ? data.id : '';
    data.name = !isEmpty(data.name) ? data.name : '';
    data.position = !isEmpty(data.position) ? data.position : '';
    data.store_id = !isEmpty(data.store_id) ? data.store_id : '';

    if(Validator.isEmpty(data.name)) {
        errors.error_code = '1001';
        errors.message = 'Bruh, Bạn vui lòng nhập tên thiết bị!';

        return {
            errors, 
            is_valid: isEmpty(errors)
        };
    }

    if(Validator.isEmpty(data.position)) {
        errors.error_code = '1002';
        errors.message = 'Bruh, Bạn vui lòng nhập vị trí thiết bị!';

        return {
            errors, 
            is_valid: isEmpty(errors)
        };
    }

    if(Validator.isEmpty(data.store_id)) {
        errors.error_code = '1003';
        errors.message = 'Bruh, Bạn vui lòng chọn cửa hàng!';

        return {
            errors, 
            is_valid: isEmpty(errors)
        };
    }

    if(Validator.isEmpty(data.id)) {
        errors.error_code = '1004';
        errors.message = 'Bruh, Bạn vui lòng chọn thiết bị!';

        return {
            errors, 
            is_valid: isEmpty(errors)
        };
    }

    return {
        errors, 
        is_valid: isEmpty(errors)
    };
}