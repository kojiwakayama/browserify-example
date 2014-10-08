'use strict';

var browserifyExample = require('../');
var assert = require('should');

describe('browserifyExample', function () {

  it('should be awesome', function () {
    browserifyExample().should.equal('awesome');
  });

});
