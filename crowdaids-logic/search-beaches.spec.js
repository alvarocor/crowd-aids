require('dotenv').config()

const { expect } = require('chai')
const { mongoose } = require('crowdaids-data')
const searchBeaches = require('./search-beaches')

const { env: { MONGO_URL } } = process

describe('searchBeaches', () => {

    before(() => mongoose.connect(MONGO_URL))

    it("Should succed with correct site name beach", async () => {

        const query = "venice"

        const beaches = await searchBeaches(query)

        const arrayBeaches = beaches[0].hits.hits

        expect(arrayBeaches).to.exist
        expect(arrayBeaches[0]._source.name.toLowerCase()).to.include(query)
        expect(arrayBeaches[1]._source.name.toLowerCase()).to.include(query)
        expect(arrayBeaches[2]._source.name.toLowerCase()).to.include(query)
        expect(arrayBeaches[3]._source.name.toLowerCase()).to.include(query)
        expect(arrayBeaches[4]._source.name.toLowerCase()).to.include(query)
    })

    it("Should fail when site is not found", async () => {

        const query = "aaaa"

        const beaches = await searchBeaches(query)

        const arrayBeaches = beaches[0].hits.hits

        expect(arrayBeaches).to.exist
        expect(arrayBeaches[0]).to.equal(undefined)
        expect(arrayBeaches[1]).to.equal(undefined)
        expect(arrayBeaches[2]).to.equal(undefined)
        expect(arrayBeaches[3]).to.equal(undefined)
        expect(arrayBeaches[4]).to.equal(undefined)
    })

    describe("When parameters are not valid", () => {
        describe("When query is not valid", () => {
            it("Should fail when query is not a string", () => {
                expect(() => searchBeaches(true, () => { })).to.throw(TypeError, 'query is not a string')

                expect(() => searchBeaches(123, () => { })).to.throw(TypeError, 'query is not a string')
                
                expect(() => searchBeaches([], () => { })).to.throw(TypeError, 'query is not a string')
                
                expect(() => searchBeaches({}, () => { })).to.throw(TypeError, 'query is not a string')
                
                expect(() => searchBeaches(() => { }, () => { })).to.throw(TypeError, 'query is not a string')
            })
        })
    })

    after(async () => {
        await mongoose.disconnect()
    })
})