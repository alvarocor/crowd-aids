require('dotenv').config()

const { expect } = require('chai')
const retrieveTides = require('./retrieve-tides')
const { mongoose } = require('crowdaids-data')
const { NotFoundError, FormatError } = require('crowdaids-errors')

const { env: { MONGO_URL } } = process

describe('retrieveWeatherConditions', () => {

    before(() => mongoose.connect(MONGO_URL))

    it("Should succed with correct id", async () => {

        const id = "5842041f4e65fad6a7708819"

        const name = "Santa Monica, Municipal Pier, California (2)"

        const tides = await retrieveTides(id)

        expect(tides).to.exist
        expect(tides.associated.tideLocation.name).to.equal(name)
    })

    it("Should fail when id is incorrect", async () => {

        const id = "111111111111111111111111"

        try {
            await retrieveTides(id)

            throw new Error('Should not reach this point')
        } catch (error) {
            expect(error).to.exist
            expect(error).to.be.instanceOf(NotFoundError)
            expect(error.message).to.equal('Wrong ID')
        }
    })

    describe("When parameters are not valid", () => {
        describe("When id is not valid", () => {
            it('Should fail when id is not a string', () => {
                expect(() => retrieveTides(true, () => { })).to.throw(TypeError, 'id is not a string')

                expect(() => retrieveTides(123, () => { })).to.throw(TypeError, 'id is not a string')

                expect(() => retrieveTides([], () => { })).to.throw(TypeError, 'id is not a string')

                expect(() => retrieveTides(() => { }, () => { })).to.throw(TypeError, 'id is not a string')

                expect(() => retrieveTides({}, () => { })).to.throw(TypeError, 'id is not a string')
            })

            it('Should fail when id is empty', () => {
                expect(() => retrieveTides('', () => { })).to.throw(FormatError, 'id is empty or blank')

                expect(() => retrieveTides('   ', () => { })).to.throw(FormatError, 'id is empty or blank')
            })

            it('Should fail when id has spaces around', () => {
                expect(() => retrieveTides(' 111111111111111111111111 ', () => { })).to.throw(FormatError, 'blank spaces around id')
            })

            it('Should fail when id length is less than 24 characters', () => {
                expect(() => retrieveTides('1111111111111', () => { })).to.throw(FormatError, 'id has less than 24 characters')
            })
        })
    })


    after(async () => {
        await mongoose.disconnect()
    })
})