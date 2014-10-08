browserifyExample = require("../lib/browserify-example")
assert = require("should")

describe "browserifyExample", ->
  "use strict"
  it "should be awesome", ->
    browserifyExample().should.equal "awesome"

