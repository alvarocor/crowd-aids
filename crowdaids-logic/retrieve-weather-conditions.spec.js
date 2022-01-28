require('dotenv').config()

const { expect } = require('chai')
const retrieveWeatherConditions = require('./retrieve-weather-conditions')
const { mongoose } = require('crowdaids-data')
const { NotFoundError, FormatError } = require('crowdaids-errors')

const { env: { MONGO_URL } } = process

describe('retrieveWeatherConditions', () => {

    before(() => mongoose.connect(MONGO_URL))

    it("Should succed with correct id", async () => {

        const id = "5842041f4e65fad6a7708819"

        const units = {
            temperature: "C",
            tideHeight: "M",
            swellHeight: "M",
            waveHeight: "M",
            windSpeed: "KPH"
        }

        const weather = await retrieveWeatherConditions(id)

        expect(weather).to.exist
        expect(weather.associated.units.temperature).to.equal(units.temperature)
        expect(weather.associated.units.tideHeight).to.equal(units.tideHeight)
        expect(weather.associated.units.swellHeight).to.equal(units.swellHeight)
        expect(weather.associated.units.waveHeight).to.equal(units.waveHeight)
        expect(weather.associated.units.windSpeed).to.equal(units.windSpeed)
    })

    it("Should fail when id is incorrect", async () => {

        const id = "111111111111111111111111"

        try {
            await retrieveWeatherConditions(id)

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
                expect(() => retrieveWeatherConditions(true, () => { })).to.throw(TypeError, 'id is not a string')

                expect(() => retrieveWeatherConditions(123, () => { })).to.throw(TypeError, 'id is not a string')

                expect(() => retrieveWeatherConditions([], () => { })).to.throw(TypeError, 'id is not a string')

                expect(() => retrieveWeatherConditions(() => { }, () => { })).to.throw(TypeError, 'id is not a string')

                expect(() => retrieveWeatherConditions({}, () => { })).to.throw(TypeError, 'id is not a string')
            })

            it('Should fail when id is empty', () => {
                expect(() => retrieveWeatherConditions('', () => { })).to.throw(FormatError, 'id is empty or blank')

                expect(() => retrieveWeatherConditions('   ', () => { })).to.throw(FormatError, 'id is empty or blank')
            })

            it('Should fail when id has spaces around', () => {
                expect(() => retrieveWeatherConditions(' 111111111111111111111111 ', () => { })).to.throw(FormatError, 'blank spaces around id')
            })

            it('Should fail when id length is less than 24 characters', () => {
                expect(() => retrieveWeatherConditions('1111111111111', () => { })).to.throw(FormatError, 'id has less than 24 characters')
            })
        })
    })

    after(async () => {
        await mongoose.disconnect()
    })
})