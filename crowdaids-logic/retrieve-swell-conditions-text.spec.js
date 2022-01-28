require('dotenv').config()

const { expect } = require('chai')
const retrieveSwellConditionsText = require('./retrieve-swell-conditions-text')
const { mongoose } = require('crowdaids-data')
const { NotFoundError, FormatError } = require('crowdaids-errors')

const { env: { MONGO_URL } } = process

describe('retrieveSwellConditionsText', () => {

    before(() => mongoose.connect(MONGO_URL))

    it("Should succed with correct id", async () => {

        const id = "5842041f4e65fad6a7708819"

        const forecastDay = new Date

        const day = forecastDay.toISOString().split('T')[0]

        const swell = await retrieveSwellConditionsText(id)

        expect(swell).to.exist
        expect(swell.data.conditions[0].forecastDay).to.equal(day)
    })

    it("Should fail when id is incorrect", async () => {

        const id = "111111111111111111111111"

        try {
            await retrieveSwellConditionsText(id)

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
                expect(() => retrieveSwellConditionsText(true, () => { })).to.throw(TypeError, 'id is not a string')

                expect(() => retrieveSwellConditionsText(123, () => { })).to.throw(TypeError, 'id is not a string')

                expect(() => retrieveSwellConditionsText([], () => { })).to.throw(TypeError, 'id is not a string')

                expect(() => retrieveSwellConditionsText(() => { }, () => { })).to.throw(TypeError, 'id is not a string')

                expect(() => retrieveSwellConditionsText({}, () => { })).to.throw(TypeError, 'id is not a string')
            })

            it('Should fail when id is empty', () => {
                expect(() => retrieveSwellConditionsText('', () => { })).to.throw(FormatError, 'id is empty or blank')

                expect(() => retrieveSwellConditionsText('   ', () => { })).to.throw(FormatError, 'id is empty or blank')
            })

            it('Should fail when id has spaces around', () => {
                expect(() => retrieveSwellConditionsText(' 111111111111111111111111 ', () => { })).to.throw(FormatError, 'blank spaces around id')
            })

            it('Should fail when id length is less than 24 characters', () => {
                expect(() => retrieveSwellConditionsText('1111111111111', () => { })).to.throw(FormatError, 'id has less than 24 characters')
            })
        })
    })

    after(async () => {
        await mongoose.disconnect()
    })
})