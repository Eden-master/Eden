import React from 'react';
import ReactDOM from 'react-dom';
import request from 'browser-request';
import rd3 from 'react-d3-library';
import ChatboxContainer from './containers/ChatboxContainer';

const RD3Component = rd3.Component;

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      renderGUI: false,
      branchID: 'main',
      listOfBranches: [],
      d3: '',
      btnText: 'Open my mind',
      showGoogle: true
    }

    this.handleVisualizeClick = this.handleVisualizeClick.bind(this);
    this.handleGUIClick = this.handleGUIClick.bind(this);
    this.makeCircles = this.makeCircles.bind(this);
    this.showGUI = this.showGUI.bind(this);
    this.handleGoogleRequest = this.handleGoogleRequest.bind(this);
  }

  handleVisualizeClick() {
    console.log('visualize clicked');
    this.setState({
      renderGUI: true,
      show: false,
      name: 'Michael'
    });
  }

  handleGUIClick(e) {
    console.log('e.target from handleGUIClick', e.target.textContent);
    this.setState({
      renderGUI: false,
      show: true,
      branchID: e.target.textContent
    });
  }

  makeCircles(arrayOfBranches) {
    let node = document.createElement('div');

    let svg = d3.select(node).append('svg')
      .attr('width', 1000);

    let circle = svg.selectAll("circle")
      .data(arrayOfBranches, function(d) { return d; });

    circle.enter().append("circle")
      .style('fill', 'orange')
      .attr("cy", 60)
      .attr("cx", function(d, i) { return i * 100 + 30; })
      .attr("r", function(d) { return 20; })
      .on('mouseover', function() {
         d3.select(this).style('fill', 'steelblue');
      })
    return node;
  }

  componentDidMount() {
    let arrayOfBranches;

    request("http://localhost:3000/everything", (err, res, body) => {
      if (err) throw new Error(err);

      arrayOfBranches = JSON.parse(body);

      this.setState({
        listOfBranches: arrayOfBranches,
        d3: this.makeCircles(arrayOfBranches)
      });
    });
  }

  showGUI() {
    this.setState({
      renderGUI: true,
      btnText: 'blow it'
    });
  }

  handleGoogleRequest() {
    request('/oauth2', (err, res, body) => {
      if (err) throw new Error(err);

      localStorage.setItem('signedIn', 1);
      window.location.replace(body);
    });
  }

  render() {
    let signupChecker = localStorage.getItem('signedIn');

    if (this.state.showGoogle && !signupChecker && signupChecker !== 1) {
      return (
        <img onClick={this.handleGoogleRequest} src="http://3.bp.blogspot.com/-vRtr0HwWUxM/VXqTT_uO51I/AAAAAAAAfQU/9KQiFP_5rgw/s1600/Red-signin_Google_base_44dp.png"/>
      );
    }
    return (
      <div>
        {
          this.state.renderGUI
          ?
          <RD3Component data={this.state.d3} />
          :
          <div className='container'>
            <ChatboxContainer
              url="http://localhost:3000"
              branchID={this.state.branchID}
              handleVisualizeClick={this.handleVisualizeClick} />
          </div>
        }

        <button onClick={this.showGUI}>{this.state.btnText}</button>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('content'));
