'use strict';

var browserifyExample = require('../lib/browserify-example');
var assert = require('should');

describe('browserifyExample', function () {

  it('should be awesome', function () {
    browserifyExample().should.equal('awesome');
  });

});
