// https://github.com/chriso/validator.js/
const Validator = require('validator');
const isEmpty = require('../../is-empty');

module.exports = validateAddInput = (data) => {
    let errors = {};

    data.code = !isEmpty(data.code) ? data.code : '';
    data.name = !isEmpty(data.name) ? data.name : '';

    if(Validator.isEmpty(data.code)) {
        errors.error_code = '1001';
        errors.message = 'Bruh, Bạn vui lòng nhập mã vai trò người dùng!';

        return {
            errors, 
            is_valid: isEmpty(errors)
        };
    }

    if(Validator.isEmpty(data.name)) {
        errors.error_code = '1002';
        errors.message = 'Bruh, Bạn vui lòng nhập tên vai trò người dùng!';

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