"use strict";
const React = require('react');
const { expect } = require('chai');
const { shallow, mount, render } = require('enzyme');
const ChatboxContainer = require('../client/js/containers/ChatboxContainer');

describe('<ChatboxContainer/>', function() {
  it ('should have three children', function() {
    const wrapper = shallow(<ChatboxContainer/>);
    expect(wrapper.children().length).to.equal(3);
  });
});