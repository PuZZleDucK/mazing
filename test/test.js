var expect = require('chai').expect

describe("Test set 1:", () => {
  it("Tautology", () => {
    expect("true").to.be.a("string")
    // done()
  })
  it("Numbers", () => {
    expect(1).to.equal(1)
    expect(1).to.be.greaterThan(0)
    expect(1).to.be.lessThan(5)
  })
})
