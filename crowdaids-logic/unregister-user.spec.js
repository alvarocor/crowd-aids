require('dotenv').config()

const { expect } = require('chai')
const unregisterUser = require('./unregister-user')
const { mongoose, models: { User } } = require('crowdaids-data')
const { Types: { ObjectId } } = mongoose
const { CredentialsError, FormatError, NotFoundError } = require('crowdaids-errors')
const bcrypt = require('bcryptjs')

const { env: { MONGO_URL } } = process

describe('unregisterUser', () => {

    before(() => mongoose.connect(MONGO_URL))

    beforeEach(() => User.deleteMany())

    let user, userId

    beforeEach(async () => {
        user = {
            name: 'Wendy Pan',
            username: 'wendypan',
            email: 'wendy@pan.com',
            password: '123123123'
        }

        const user2 = await User.create({ ...user, password: bcrypt.hashSync(user.password) })

        userId = user2.id
    })

    it('Should succeed when user is deleted from data base', async () => {
        const { password } = user

        try {
            const response = await unregisterUser(userId, password)

            expect(response).to.equal('User deleted successfully')
        } catch (error) {
            throw new CredentialsError('Wrong password')
        }
    })

    it('Should fail with wrong password', async () => {

        try {
            await unregisterUser(userId, '11111111')

            throw new Error('Should not reach this point.')
        } catch (error) {
            expect(error).to.exist
            expect(error).to.be.instanceOf(CredentialsError)
            expect(error.message).to.equal('Wrong password')
        }
    })

    it('Should fail when user id does not correspond to any user', async () => {
        const userId = ObjectId().toString()

        const { password } = user

        try {
            await unregisterUser(userId, password)

            throw new Error('Should not reach this point.')
        } catch (error) {
            expect(error).to.exist
            expect(error).to.be.instanceOf(NotFoundError)
            expect(error.message).to.equal(`user with id ${userId} not found`)
        }
    })

    describe('When parameters are note valid', () => {
        describe('When id is not valid', () => {
            it('should fail when id is not a string', () => {
                expect(() => unregisterUser(true, {}, () => { })).to.throw(TypeError, 'id is not a string')

                expect(() => unregisterUser(123, {}, () => { })).to.throw(TypeError, 'id is not a string')

                expect(() => unregisterUser({}, {}, () => { })).to.throw(TypeError, 'id is not a string')

                expect(() => unregisterUser(() => { }, {}, () => { })).to.throw(TypeError, 'id is not a string')

                expect(() => unregisterUser([], {}, () => { })).to.throw(TypeError, 'id is not a string')
            })

            it('should fail when id is empty or blank', () => {
                expect(() => unregisterUser('', {}, () => { })).to.throw(FormatError, 'id is empty or blank')

                expect(() => unregisterUser('   ', {}, () => { })).to.throw(FormatError, 'id is empty or blank')
            })

            it('should fail when id has spaces', () => {
                expect(() => unregisterUser(' abcd1234abcd1234abcd1234 ', {}, () => { })).to.throw(FormatError, 'blank spaces around id')

                expect(() => unregisterUser('abcd 1234abc d1234abc d1234', {}, () => { })).to.throw(FormatError, 'blank spaces around id')
            })

            it('should fail when id length is different from 24 characters', () => {
                expect(() => unregisterUser('abc', {}, () => { })).to.throw(FormatError, 'id has less than 24 characters')
            })
        })

        describe('When password is not valid', () => {
            it('Should fail when password is not a string', () => {
                expect(() => unregisterUser(userId, true, () => { })).to.throw(TypeError, 'password is not a string')

                expect(() => unregisterUser(userId, 123, () => { })).to.throw(TypeError, 'password is not a string')

                expect(() => unregisterUser(userId, {}, () => { })).to.throw(TypeError, 'password is not a string')

                expect(() => unregisterUser(userId, () => { }, () => { })).to.throw(TypeError, 'password is not a string')

                expect(() => unregisterUser(userId, [], () => { })).to.throw(TypeError, 'password is not a string')
            })

            it('Should fail when password is empty', () => {
                expect(() => unregisterUser(userId, '', () => { })).to.throw(FormatError, 'password is empty or blank')

                expect(() => unregisterUser(userId, '   ', () => { })).to.throw(FormatError, 'password is empty or blank')
            })

            it('Should fail when password has spaces around', () => {
                expect(() => unregisterUser(userId, ' 123123123 ', () => { })).to.throw(FormatError, 'password has blank spaces')

                expect(() => unregisterUser(userId, '1231 23123', () => { })).to.throw(FormatError, 'password has blank spaces')
            })

            it('Should fail when password length is less than 8 characters', () => {
                expect(() => unregisterUser(userId, '1231', () => { })).to.throw(FormatError, 'password has less than 8 characters')
            })
        })
    })

    after(async () => {
        await User.deleteMany()

        await mongoose.disconnect()
    })
})