"use strict";
const React = require('react');
const { expect } = require('chai');
const { shallow, mount, render } = require('enzyme');
const ChatboxContainer = require('../client/js/containers/ChatboxContainer');
const Chatbox = require('../client/js/components/Chatbox');
const SubmitMsg = require('../client/js/components/SubmitMsg');

describe('<ChatboxContainer/>', function() {
  it ('should have three children', function() {
    const wrapper = shallow(<ChatboxContainer/>);
    expect(wrapper.children().length).to.equal(3);
  });

  it('should contain a <Chatbox/> component', function() {
    const wrapper = shallow(<ChatboxContainer/>);
    expect(wrapper.find(Chatbox)).to.have.length(1);
  });

  it('should contain a <SubmitMsg/> component', function() {
    const wrapper = shallow(<ChatboxContainer/>);
    expect(wrapper.find(SubmitMsg)).to.have.length(1);
  });

  it('should set initial state of messages to empty array', function () {
    const wrapper = shallow(<ChatboxContainer/>);
    expect(wrapper.state().messages).to.be.an.instanceof(Array);
  });

  it('should set initial state of inputText to empty string', function () {
    const wrapper = shallow(<ChatboxContainer/>);
    expect(wrapper.state().inputText).to.be.a('string');
    expect(wrapper.state().inputText).to.be.empty;
  });
});