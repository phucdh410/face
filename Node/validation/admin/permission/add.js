// https://github.com/chriso/validator.js/
const Validator = require('validator');
const isEmpty = require('../../is-empty');

module.exports = validateAddInput = (data) => {
    let errors = {};

    data.code = !isEmpty(data.code) ? data.code : '';
    data.name = !isEmpty(data.name) ? data.name : '';

    if(Validator.isEmpty(data.code)) {
        errors.error_code = '1001';
        errors.code = 'Bruh, Bạn vui lòng nhập mã phân quyền!';
    }

    if(Validator.isEmpty(data.name)) {
        errors.error_code = '1002';
        errors.name = 'Bruh, Bạn vui lòng nhập tên phân quyền!';
    }

    return {
        errors, 
        is_valid: isEmpty(errors)
    };
}