require('dotenv').config()

const { expect } = require('chai')
const retrieveFavBeaches = require('./retrieve-fav-beaches')
const { mongoose, models: { User } } = require('crowdaids-data')
const { NotFoundError, FormatError } = require('crowdaids-errors')
const { Types: { ObjectId } } = mongoose

const { env: { MONGO_URL } } = process

describe('retrieveFavBeaches', () => {

    before(() => mongoose.connect(MONGO_URL))

    beforeEach(() => User.deleteMany())

    let user, userId

    beforeEach(async () => {
        user = {
            name: 'Wendy Pan',
            username: 'wendypan',
            email: 'wendy@pan.com',
            password: '123123123',
            favorites: '590927576a2e4300134fbed8'
        }

        const user2 = await User.create(user)

        userId = user2.id
    })

    it('Should succeed with correct id for an already existing user', async () => {
        const { favorites } = user

        const res = await retrieveFavBeaches(userId)

        expect(res).to.exist
        expect(res).to.have.deep.members([favorites])
    })

    it('Should fail when user id does not correspond to any user', async () => {
        const userId = ObjectId().toString()

        try {
            await retrieveFavBeaches(userId)

            throw new Error('should not reach this point')
        } catch (error) {
            expect(error).to.exist
            expect(error).to.be.instanceOf(NotFoundError)
            expect(error.message).to.equal(`user with id ${userId} not found`)
        }
    })

    describe('When parameters are not valid', () => {
        describe('When user id is not valid', () => {
            it('Should fail when id is not a string', () => {
                expect(() => retrieveFavBeaches(true, '61bcb41451bd1ac2246f74da')).to.throw(TypeError, 'id is not a string')

                expect(() => retrieveFavBeaches(123, '61bcb41451bd1ac2246f74da')).to.throw(TypeError, 'id is not a string')

                expect(() => retrieveFavBeaches([], '61bcb41451bd1ac2246f74da')).to.throw(TypeError, 'id is not a string')

                expect(() => retrieveFavBeaches(() => { }, '61bcb41451bd1ac2246f74da')).to.throw(TypeError, 'id is not a string')

                expect(() => retrieveFavBeaches({}, '61bcb41451bd1ac2246f74da')).to.throw(TypeError, 'id is not a string')
            })

            it('Should fail when id is empty', () => {
                expect(() => retrieveFavBeaches('', '61bcb41451bd1ac2246f74da')).to.throw(FormatError, 'id is empty or blank')

                expect(() => retrieveFavBeaches('   ', '61bcb41451bd1ac2246f74da')).to.throw(FormatError, 'id is empty or blank')
            })

            it('Should fail when id has spaces around', () => {
                expect(() => retrieveFavBeaches(' 111111111111111111111111 ', '61bcb41451bd1ac2246f74da')).to.throw(FormatError, 'blank spaces around id')
            })

            it('Should fail when id length is less than 24 characters', () => {
                expect(() => retrieveFavBeaches('1111111111111', '61bcb41451bd1ac2246f74da')).to.throw(FormatError, 'id has less than 24 characters')
            })
        })
    })

    after(async () => {
        await User.deleteMany()

        await mongoose.disconnect()
    })
})