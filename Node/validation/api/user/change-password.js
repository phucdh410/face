// https://github.com/chriso/validator.js/
const Validator = require('validator');
const isEmpty = require('../../is-empty');

module.exports = validateChangePasswordInput = (data) => {
    let errors = {};

    data.old_password = !isEmpty(data.old_password) ? data.old_password : '';
    data.new_password = !isEmpty(data.new_password) ? data.new_password : '';
    data.confirm_password = !isEmpty(data.confirm_password) ? data.confirm_password : '';

    if(Validator.isEmpty(data.old_password)) {
        errors.error_code = '1001';
        errors.message = 'Bạn vui lòng nhập mật khẩu cũ!';

        return {
            errors, 
            is_valid: isEmpty(errors)
        };
    }

    if(Validator.isEmpty(data.new_password)) {
        errors.error_code = '1002';
        errors.message = 'Bạn vui lòng nhập mật khẩu mới!';

        return {
            errors, 
            is_valid: isEmpty(errors)
        };
    }

    if(Validator.isEmpty(data.confirm_password)) {
        errors.error_code = '1003';
        errors.message = 'Bạn vui lòng nhập xác nhận mật khẩu!';

        return {
            errors, 
            is_valid: isEmpty(errors)
        };
    }

    if(data.new_password !== data.confirm_password) {
        errors.error_code = '1004';
        errors.message = 'Mật khẩu xác nhận không trùng khớp!';

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