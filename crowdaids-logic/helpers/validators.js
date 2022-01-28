const { FormatError, ConflictError } = require('crowdaids-errors')

function validateId(id) {
    if (typeof id !== 'string') throw new TypeError('id is not a string')
    if (!id.trim().length) throw new FormatError('id is empty or blank')
    if (/\r?\n|\r|\t| /g.test(id)) throw new FormatError('blank spaces around id')
    if (id.length < 24) throw new FormatError('id has less than 24 characters')
}

function validateToken(token) {
    if (typeof token !== 'string') throw new TypeError('token is not a string')
    if (!/[a-zA-Z0-9\-_]+?\.[a-zA-Z0-9\-_]+?\.([a-zA-Z0-9\-_]+)$/.test(token)) throw new Error('invalid token')
}

function validateUsername(username) {
    if (typeof username !== 'string') throw new TypeError('username is not a string')
    if (!username.trim().length) throw new FormatError('username is empty or blank')
    if (/\r?\n|\r|\t| /g.test(username)) throw new FormatError('username has blank spaces')
    if (username.length < 4) throw new FormatError('username has less than 4 characters')

}

function validatePassword(password) {
    if (typeof password !== 'string') throw new TypeError('password is not a string')
    if (!password.trim().length) throw new FormatError('password is empty or blank')
    if (/\r?\n|\r|\t| /g.test(password)) throw new FormatError('password has blank spaces')
    if (password.length < 8) throw new FormatError('password has less than 8 characters')
}

function validateOldPassword(oldPassword) {
    if (typeof oldPassword !== 'string') throw new TypeError('old password is not a string')
    if (!oldPassword.trim().length) throw new FormatError('old password is empty or blank')
    if (/\r?\n|\r|\t| /g.test(oldPassword)) throw new FormatError('old password has blank spaces')
    if (oldPassword.length < 8) throw new FormatError('old password has less than 8 characters')
}

function validateName(name) {
    if (typeof name !== 'string') throw new TypeError('name is not a string')
    if (!name.trim().length) throw new FormatError('name is empty or blank')
    if (name.trim() !== name) throw new FormatError('blank spaces around name')
}

function validateEmail(email) {
    if (typeof email !== "string") throw new TypeError("email is not a string")
    if (!email.trim().length) throw new FormatError("email is empty or blank")
    if (!/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)) throw new FormatError("is not an e-mail")
}

function validateData(data) {
    if (typeof data !== 'object' || data.constructor.name !== 'Object') throw new TypeError('data is not an object')

    const { name, username, email, password, oldPassword } = data

    if (typeof name !== 'undefined') {
        validateName(name)
    }

    if (typeof username !== 'undefined') {
        validateUsername(username)
    }

    if (typeof email !== 'undefined') {
        validateEmail(email)
    }

    if (typeof oldPassword === 'undefined' && typeof password !== 'undefined') throw new ConflictError('old password is not defined')
    if (typeof password === 'undefined' && typeof oldPassword !== 'undefined') throw new ConflictError('password is not defined')

    if (typeof password !== 'undefined') {
        validatePassword(password)
    }

    if (typeof oldPassword !== 'undefined') {
        validateOldPassword(oldPassword)
    }
}

function validateCallback(callback) {
    if (typeof callback !== 'function') throw new TypeError('callback is not a function')
}

function validateCreditCardNumber(number) {
    if (typeof number !== 'string') throw new TypeError('credit card number is not a string')
    if (!number.trim().length) throw new FormatError('credit card number is empty or blank')
    if (/\r?\n|\r|\t| /g.test(number)) throw new FormatError('credit card number has blank spaces')
    if (number.length !== 16) throw new FormatError('credit card number doesn\'t have 16 digits')
    if (isNaN(number)) throw new FormatError('credit card number is not numeric')
}

function validateDate(date) {
    if (!(date instanceof Date)) throw new TypeError('date is not a date')
}

function validateCreditCardCVV(cvv) {
    if (typeof cvv !== 'string') throw new TypeError('cvv is not a string')
    if (!cvv.trim().length) throw new FormatError('cvv is empty or blank')
    if (/\r?\n|\r|\t| /g.test(cvv)) throw new FormatError('cvv has blank spaces')
    if (cvv.length > 4 || cvv.length < 3) throw new FormatError('cvv doesn\'t have 3 or 4 digits')
    if (isNaN(cvv)) throw new FormatError('cvv is not numeric')
}

module.exports = {
    validateId,
    validateToken,
    validateUsername,
    validatePassword,
    validateOldPassword,
    validateData,
    validateName,
    validateCallback,
    validateCreditCardNumber,
    validateDate,
    validateCreditCardCVV,
    validateEmail
}