// https://github.com/chriso/validator.js/
const Validator = require('validator');
const isEmpty = require('../../is-empty');

module.exports = validateAddInput = (data) => {
    let errors = {};

    data.role_id = !isEmpty(data.role_id) ? data.role_id : '';

    if(Validator.isEmpty(data.role_id)) {
        errors.error_code = '1001';
        errors.message = 'Bruh, Bạn vui lòng chọn vai trò cần phân quyền!';

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