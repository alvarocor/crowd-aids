require('dotenv').config()

const { expect } = require('chai')
const registerUser = require('./register-user')
const { mongoose, models: { User } } = require('crowdaids-data')
const { ConflictError, FormatError } = require('crowdaids-errors')
const bcrypt = require('bcryptjs')

const { env: { MONGO_URL } } = process

describe('registerUser', () => {

    before(() => mongoose.connect(MONGO_URL))

    beforeEach(() => User.deleteMany())

    it('Should succeed with new user', async () => {
        const name = 'Wendy Pan'
        const username = 'wendypan'
        const email = 'wendy@pan.com'
        const password = '123123123'

        const res = await registerUser(name, username, email, password)

        expect(res).to.be.undefined

        const user = await User.findOne({ username })

        expect(user).to.exist
        expect(user.name).to.equal(name)
        expect(user.username).to.equal(username)
        expect(user.email).to.equal(email)

        expect(bcrypt.compareSync(password, user.password)).to.be.true

    })

    describe('When user already exists', () => {
        let user;

        beforeEach(() => {
            user = {
                name: 'Wendy Pan',
                username: 'wendypan',
                email: 'wendy@pan.com',
                password: '123123123'
            }

            return User.create(user)
        })

        it('Should fail when user already exists', async () => {
            const { name, username, email, password } = user

            try {
                await registerUser(name, username, email, password)

                throw new Error('Should not reach this point')
            } catch (error) {
                expect(error).to.exist
                expect(error).to.be.instanceOf(ConflictError)
                expect(error.message).to.equal(`user with username ${username} already exists`)
            }
        })
    })

    describe('When parameters are not valid.', () => {
        describe('When name is not valid.', () => {
            it('Should fail when name is not a string.', () => {
                expect(() => registerUser(true, 'wendypan', 'wendy@pan.com', '123123123', () => { })).to.throw(TypeError, 'name is not a string')

                expect(() => registerUser(123, 'wendypan', 'wendy@pan.com', '123123123', () => { })).to.throw(TypeError, 'name is not a string')

                expect(() => registerUser({}, 'wendypan', 'wendy@pan.com', '123123123', () => { })).to.throw(TypeError, 'name is not a string')

                expect(() => registerUser(() => { }, 'wendypan', 'wendy@pan.com', '123123123', () => { })).to.throw(TypeError, 'name is not a string')

                expect(() => registerUser([], 'wendypan', 'wendy@pan.com', '123123123', () => { })).to.throw(TypeError, 'name is not a string')
            })

            it('Should fail when name is empty', () => {
                expect(() => registerUser('', 'wendypan', 'wendy@pan.com', '123123123', () => { })).to.throw(FormatError, 'name is empty or blank')

                expect(() => registerUser('   ', 'wendypan', 'wendy@pan.com', '123123123', () => { })).to.throw(FormatError, 'name is empty or blank')
            })

            it('Should fail when name has spaces around', () => {
                expect(() => registerUser(' Wendy Pan ', 'wendypan', 'wendy@pan.com', '123123123', () => { })).to.throw(FormatError, 'blank spaces around name')
            })
        })

        describe('When username is not valid', () => {
            it('Should fail when username is not a string', () => {
                expect(() => registerUser('Wendy Pan', true, 'wendy@pan.com', '123123123', () => { })).to.throw(TypeError, 'username is not a string')

                expect(() => registerUser('Wendy Pan', 123, 'wendy@pan.com', '123123123', () => { })).to.throw(TypeError, 'username is not a string')

                expect(() => registerUser('Wendy Pan', {}, 'wendy@pan.com', '123123123', () => { })).to.throw(TypeError, 'username is not a string')

                expect(() => registerUser('Wendy Pan', () => { }, 'wendy@pan.com', '123123123', () => { })).to.throw(TypeError, 'username is not a string')

                expect(() => registerUser('Wendy Pan', [], 'wendy@pan.com', '123123123', () => { })).to.throw(TypeError, 'username is not a string')

            })

            it('Should fail when username is empty', () => {
                expect(() => registerUser('Wendy Pan', '', 'wendy@pan.com', '123123123', () => { })).to.throw(FormatError, 'username is empty or blank')

                expect(() => registerUser('Wendy Pan', '  ', 'wendy@pan.com', '123123123', () => { })).to.throw(FormatError, 'username is empty or blank')
            })

            it('Should fail when username has spaces around', () => {
                expect(() => registerUser('Wendy Pan', ' wendypan ', 'wendy@pan.com', '123123123', () => { })).to.throw(FormatError, 'username has blank spaces')

                expect(() => registerUser('Wendy Pan', 'wendy pan', 'wendy@pan.com', '123123123', () => { })).to.throw(FormatError, 'username has blank spaces')
            })
        })

        describe('When email is not valid', () => {
            it('Should fail when email is not a string', () => {
                expect(() => registerUser('Wendy Pan', 'wendypan', true, '123123123', () => { })).to.throw(TypeError, 'email is not a string')

                expect(() => registerUser('Wendy Pan', 'wendypan', 123, '123123123', () => { })).to.throw(TypeError, 'email is not a string')

                expect(() => registerUser('Wendy Pan', 'wendypan', {}, '123123123', () => { })).to.throw(TypeError, 'email is not a string')

                expect(() => registerUser('Wendy Pan', 'wendypan', () => { }, '123123123', () => { })).to.throw(TypeError, 'email is not a string')

                expect(() => registerUser('Wendy Pan', 'wendypan', [], '123123123', () => { })).to.throw(TypeError, 'email is not a string')
            })

            it('Should fail when email is empty', () => {
                expect(() => registerUser('Wendy Pan', 'wendypan', '', '123123123', () => { })).to.throw(FormatError, 'email is empty or blank')

                expect(() => registerUser('Wendy Pan', 'wendypan', '   ', '123123123', () => { })).to.throw(FormatError, 'email is empty or blank')
            })

        })

        describe('When password is not valid', () => {
            it('Should fail when password is not a string', () => {
                expect(() => registerUser('Wendy Pan', 'wendypan', 'wendy@pan.com', true, () => { })).to.throw(TypeError, 'password is not a string')

                expect(() => registerUser('Wendy Pan', 'wendypan', 'wendy@pan.com', 123, () => { })).to.throw(TypeError, 'password is not a string')

                expect(() => registerUser('Wendy Pan', 'wendypan', 'wendy@pan.com', {}, () => { })).to.throw(TypeError, 'password is not a string')

                expect(() => registerUser('Wendy Pan', 'wendypan', 'wendy@pan.com', () => { }, () => { })).to.throw(TypeError, 'password is not a string')

                expect(() => registerUser('Wendy Pan', 'wendypan', 'wendy@pan.com', [], () => { })).to.throw(TypeError, 'password is not a string')
            })

            it('Should fail when password is empty', () => {
                expect(() => registerUser('Wendy Pan', 'wendypan', 'wendy@pan.com', '', () => { })).to.throw(FormatError, 'password is empty or blank')

                expect(() => registerUser('Wendy Pan', 'wendypan', 'wendy@pan.com', '   ', () => { })).to.throw(FormatError, 'password is empty or blank')
            })

            it('Should fail when password has spaces around', () => {
                expect(() => registerUser('Wendy Pan', 'wendypan', 'wendy@pan.com', ' 123123123 ', () => { })).to.throw(FormatError, 'password has blank spaces')

                expect(() => registerUser('Wendy Pan', 'wendypan', 'wendy@pan.com', '1231 23123', () => { })).to.throw(FormatError, 'password has blank spaces')
            })

            it('Should fail when password length is less than 8 characters', () => {
                expect(() => registerUser('Wendy Pan', 'wendypan', 'wendy@pan.com', '1231', () => { })).to.throw(FormatError, 'password has less than 8 characters')
            })
        })
    })

    after(async () => {
        await User.deleteMany()

        await mongoose.disconnect()
    })
})