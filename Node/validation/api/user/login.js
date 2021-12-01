// https://github.com/chriso/validator.js/
const Validator = require('validator');
const isEmpty = require('../../is-empty');

module.exports = validateLoginInput = (data) => {
    let errors = {};

    data.username = !isEmpty(data.username) ? data.username : '';
    data.password = !isEmpty(data.password) ? data.password : '';

    if(Validator.isEmpty(data.username)) {
        errors.error_code = '1001';
        errors.message = 'Bạn vui lòng nhập tên đăng nhập!';

        return {
            errors, 
            is_valid: isEmpty(errors)
        };
    }

    if(Validator.isEmpty(data.password)) {
        errors.error_code = '1002';
        errors.message = 'Bạn vui lòng nhập mật khẩu!';

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