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
        errors.old_password = 'Missing the [old password] parameter!';
    }

    if(Validator.isEmpty(data.new_password)) {
        errors.error_code = '1002';
        errors.password = 'Missing the [new password] parameter!';
    }

    if(Validator.isEmpty(data.confirm_password)) {
        errors.error_code = '1003';
        errors.password = 'Missing the [confirm password] parameter!';
    }

    if(data.new_password !== data.confirm_password) {
        errors.error_code = '1004';
        errors.password = '[Password] and [Confirm Password] don\'t match!';
    }

    return {
        errors, 
        is_valid: isEmpty(errors)
    };
}