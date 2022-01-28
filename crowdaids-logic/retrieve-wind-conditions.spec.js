require('dotenv').config()

const { expect } = require('chai')
const retrieveWindConditions = require('./retrieve-wind-conditions')
const { mongoose } = require('crowdaids-data')
const { NotFoundError, FormatError } = require('crowdaids-errors')

const { env: { MONGO_URL } } = process

describe('retrieveWeatherConditions', () => {

    before(() => mongoose.connect(MONGO_URL))

    it("Should succed with correct id", async () => {

        const id = "5842041f4e65fad6a7708819"

        const location = {
            lon: -118.47381591796875,
            lat: 33.984079047970035
        }

        const wind = await retrieveWindConditions(id)

        expect(wind).to.exist
        expect(wind.associated.location.lon).to.equal(location.lon)
        expect(wind.associated.location.lat).to.equal(location.lat)
    })

    it("Shodul fail when id is incorrect", async () => {

        const id = "111111111111111111111111"

        try {
            await retrieveWindConditions(id)

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
                expect(() => retrieveWindConditions(true, () => { })).to.throw(TypeError, 'id is not a string')

                expect(() => retrieveWindConditions(123, () => { })).to.throw(TypeError, 'id is not a string')

                expect(() => retrieveWindConditions([], () => { })).to.throw(TypeError, 'id is not a string')

                expect(() => retrieveWindConditions(() => { }, () => { })).to.throw(TypeError, 'id is not a string')

                expect(() => retrieveWindConditions({}, () => { })).to.throw(TypeError, 'id is not a string')
            })

            it('Should fail when id is empty', () => {
                expect(() => retrieveWindConditions('', () => { })).to.throw(FormatError, 'id is empty or blank')

                expect(() => retrieveWindConditions('   ', () => { })).to.throw(FormatError, 'id is empty or blank')
            })

            it('Should fail when id has spaces around', () => {
                expect(() => retrieveWindConditions(' 111111111111111111111111 ', () => { })).to.throw(FormatError, 'blank spaces around id')
            })

            it('Should fail when id length is less than 24 characters', () => {
                expect(() => retrieveWindConditions('1111111111111', () => { })).to.throw(FormatError, 'id has less than 24 characters')
            })
        })
    })

    after(async () => {
        await mongoose.disconnect()
    })
})