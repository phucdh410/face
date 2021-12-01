// https://github.com/chriso/validator.js/
const Validator = require('validator');
const isEmpty = require('../../is-empty');

module.exports = validateLoginInput = (data) => {
    let errors = {};

    data.username = !isEmpty(data.username) ? data.username : '';
    data.password = !isEmpty(data.password) ? data.password : '';

    if(Validator.isEmpty(data.username)) {
        errors.error_code = '1000';
        errors.username = 'Missing the [username] parameter!';
    }

    if(Validator.isEmpty(data.password)) {
        errors.error_code = '1001';
        errors.password = 'Missing the [password] parameter!';
    }

    return {
        errors, 
        is_valid: isEmpty(errors)
    };
}