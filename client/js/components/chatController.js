const React = require('react');
const Message = require('./message');
const ChatForm = require('./chatForm');
const Banner = require('./banner')
const MainButton = require('./mainbutton')


const Display = React.createClass ({
  getInitialState: function() {
    return {
      messages: [],
      branch:'1',
    }
  },

  getData: function(){
    let that = this;
    $.get(this.props.url + 'messages?branch_id=' + this.state.branch).done(function(data){
      console.log('data from get request: ', data);
      that.dataParsing(data);
    });
    //sampling without server example below
    // let data = "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.".split(' ')
    // this.dataParsing(data)
  },

  dataParsing: function(data){
    let messageList = data.slice(-10);
    this.setState({messages: messageList})
  },


  componentWillMount: function(){
    this.getData();
  },

  addTheLatestMessage: function(data) {
    let messageList = this.state.messages;
    this.setState({ messages: messageList.concat(data) });
    console.log('state is ', this.state.messages);
  },

  clickHandler:function(index){
    this.setState({
      messages: [this.state.messages[index]],
      branch: this.state.messages[index].message,
    })
  },

  buttonHandler:function(){
    this.replaceState(this.getInitialState());
    this.getData();
  },

  render: function() {
    let messageNodes = this.state.messages.map((message, index)=>{
      return <Message data={message} key={index} onClicky = {this.clickHandler} index={index} />
    });
    
    return (
      <ul className="chatList">
        <MainButton buttonton={this.buttonHandler}/>
        <Banner branch={this.state.branch} />
        {messageNodes}
        <ChatForm url={this.props.url} update={this.addTheLatestMessage} currentBranch={this.state.branch} />
      </ul>
    );
  }
});

module.exports = Display;
