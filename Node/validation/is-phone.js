const isPhone = (value) => {
    const regex = /^\d{10}$/;
    return regex.test(value);
}

module.exports = isPhone;