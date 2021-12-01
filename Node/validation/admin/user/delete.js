// https://github.com/chriso/validator.js/
const Validator = require('validator');
const isEmpty = require('../../is-empty');

module.exports = validateDeleteInput = (data) => {
    let errors = {};

    data.id = !isEmpty(data.id) ? data.id : '';

    if(Validator.isEmpty(data.id)) {
        errors.error_code = '1001';
        errors.old_password = 'Bruh, Bạn vui lòng chọn người dùng!';
    }

    return {
        errors, 
        is_valid: isEmpty(errors)
    };
}