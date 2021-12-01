// https://github.com/chriso/validator.js/
const Validator = require('validator');
const isEmpty = require('../../is-empty');

module.exports = validateAddInput = (data) => {
    let errors = {};

    data.tax = !isEmpty(data.tax) ? data.tax : '';
    data.name = !isEmpty(data.name) ? data.name : '';
    data.tel = !isEmpty(data.tel) ? data.tel : '';
    data.line_of_business = !isEmpty(data.line_of_business) ? data.line_of_business : '';
    data.agent = !isEmpty(data.agent) ? data.agent : '';
    data.mobile = !isEmpty(data.mobile) ? data.mobile : '';
    data.email = !isEmpty(data.email) ? data.email : '';
    data.password = !isEmpty(data.password) ? data.password : '';
    data.date = !isEmpty(data.date) ? data.date : '';
    data.date_of_issue = !isEmpty(data.date_of_issue) ? data.date_of_issue : '';

    if(Validator.isEmpty(data.tax)) {
        errors.error_code = '1001';
        errors.tax = 'Bruh, Bạn vui lòng nhập mã số thuế!';
    }

    if(Validator.isEmpty(data.name)) {
        errors.error_code = '1002';
        errors.name = 'Bruh, Bạn vui lòng nhập tên doanh nghiệp!';
    }

    if(!Validator.isEmpty(data.tel)) {
        const regex = /(\(028\))-[0-9]{8}/g;
        if(!data.tel.match(regex)) {
            errors.error_code = '1003';
            errors.tel = 'Bruh, Định dạng số điện thoại không hợp lệ!';
        }
    }

    if(Validator.isEmpty(data.line_of_business)) {
        errors.error_code = '1004';
        errors.line_of_business = 'Bruh, Bạn vui lòng nhập ngành nghề kinh doanh!';
    }

    if(Validator.isEmpty(data.mobile)) {
        errors.error_code = '1005';
        errors.mobile = 'Bruh, Bạn vui lòng nhập số di động!';
    }
    else {
        if(!Validator.isMobilePhone(data.mobile, 'vi-VN')) {
            errors.error_code = '1006';
            errors.mobile = 'Bruh, Định dạng số di động không hợp lệ!';
        }
    }

    if(Validator.isEmpty(data.email)) {
        errors.error_code = '1007';
        errors.email = 'Bruh, Bạn vui lòng nhập email!';
    }
    else {
        if(!Validator.isEmail(data.email)) {
            errors.error_code = '1008';
            errors.email = 'Bruh, Định dạng email không hợp lệ!';
        }
    }

    if(Validator.isEmpty(data.password)) {
        errors.error_code = '1009';
        errors.password = 'Bruh, Bạn vui lòng nhập mật khẩu!';
    }

    if(!Validator.isEmpty(data.date)) {
        const arr = data.date.split('-');
        data.date = `${arr[2]}-${arr[1]}-${arr[0]}`;

        if(!Validator.isISO8601(data.date)) {
            errors.error_code = '1010';
            errors.date = 'Bruh, Định dạng ngày sinh không hợp lệ!';
        }
    }

    if(!Validator.isEmpty(data.date_of_issue)) {
        const arr = data.date_of_issue.split('-');
        data.date_of_issue = `${arr[2]}-${arr[1]}-${arr[0]}`;

        if(!Validator.isDate(data.date_of_issue)) {
            errors.error_code = '1011';
            errors.date_of_issue = 'Bruh, Định dạng ngày cấp không hợp lệ!';
        }
    }

    return {
        errors, 
        is_valid: isEmpty(errors)
    };
}