// https://github.com/chriso/validator.js/
const Validator = require('validator');
const isEmpty = require('../../is-empty');

module.exports = validateAddInput = (data) => {
    let errors = {};

    data.company_id = !isEmpty(data.company_id) ? data.company_id : '';
    data.fullname = !isEmpty(data.fullname) ? data.fullname : '';
    data.mobile = !isEmpty(data.mobile) ? data.mobile : '';
    data.email = !isEmpty(data.email) ? data.email : '';
    data.username = !isEmpty(data.username) ? data.username : '';
    data.password = !isEmpty(data.password) ? data.password : '';
    data.role_id = !isEmpty(data.role_id) ? data.role_id : '';

    if(Validator.isEmpty(data.company_id)) {
        errors.error_code = '1001';
        errors.message = 'Bruh, Bạn vui lòng chọn doanh nghiệp!';

        return {
            errors, 
            is_valid: isEmpty(errors)
        };
    }

    if(Validator.isEmpty(data.fullname)) {
        errors.error_code = '1002';
        errors.message = 'Bruh, Bạn vui lòng nhập tên người dùng!';

        return {
            errors, 
            is_valid: isEmpty(errors)
        };
    }

    if(Validator.isEmpty(data.mobile)) {
        errors.error_code = '1003';
        errors.message = 'Bruh, Bạn vui lòng nhập số di động!';

        return {
            errors, 
            is_valid: isEmpty(errors)
        };
    }
    else {
        if(!Validator.isMobilePhone(data.mobile, 'vi-VN')) {
            errors.error_code = '1004';
            errors.message = 'Bruh, Định dạng số di động không hợp lệ!';

            return {
                errors, 
                is_valid: isEmpty(errors)
            };
        }
    }

    if(Validator.isEmpty(data.email)) {
        errors.error_code = '1005';
        errors.message = 'Bruh, Bạn vui lòng nhập email!';

        return {
            errors, 
            is_valid: isEmpty(errors)
        };
    }
    else {
        if(!Validator.isEmail(data.email)) {
            errors.error_code = '1006';
            errors.message = 'Bruh, Định dạng email không hợp lệ!';

            return {
                errors, 
                is_valid: isEmpty(errors)
            };
        }
    }

    if(Validator.isEmpty(data.username)) {
        errors.error_code = '1007';
        errors.message = 'Bruh, Bạn vui lòng nhập tên đăng nhập!';

        return {
            errors, 
            is_valid: isEmpty(errors)
        };
    }

    if(Validator.isEmpty(data.password)) {
        errors.error_code = '1008';
        errors.message = 'Bruh, Bạn vui lòng nhập mật khẩu!';

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