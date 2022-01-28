const createErrorType = require('./create-error-types')

module.exports = {
    CredentialsError: createErrorType('CredentialsError'),
    NotFoundError: createErrorType('NotFoundError'),
    ConflictError: createErrorType('ConflictError'),
    FormatError: createErrorType('FormatError')
}