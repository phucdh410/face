// https://github.com/chriso/validator.js/
const Validator = require('validator');
const isEmpty = require('../../is-empty');

module.exports = validateDeleteInput = (data) => {
    let errors = {};

    data.id = !isEmpty(data.id) ? data.id : '';

    if(Validator.isEmpty(data.id)) {
        errors.error_code = '1003';
        errors.old_password = 'Bruh, Bạn vui lòng chọn phân quyền!';
    }

    return {
        errors, 
        is_valid: isEmpty(errors)
    };
}