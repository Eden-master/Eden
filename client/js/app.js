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
    let drag = d3.behavior.drag().on('drag', dragmove);

    function dragmove(d) {
      let x = d3.event.x;
      let y = d3.event.y;
      d3.select(this).attr("transform", "translate(" + x + "," + y + ")")
    }
    
    let node = document.createElement('div');

    let svg = d3.select(node).append('svg')
      .attr('width', 2000).attr('height', 2000);

    let dataForCircles = svg.selectAll('g')
      .data(arrayOfBranches);

    let wrapperDiv = dataForCircles.enter()
      .append('g')
      .attr('transform', function(d, i) {
        return `translate(${i*130 + 400}, 80)`
      }).call(drag);

    // appends circles to g html tag (binds together svg elements)
    let circle = wrapperDiv.append('circle')
      .attr('fill', 'white')
      .attr('stroke', 'black')
      .attr('r', function(d) { return 55; })
      .attr('class', function(d) { return d.oldBranchID + " " + d.newBranchID; })
      .on('mouseover', function(event) {
         d3.selectAll(`.${event.newBranchID}`).style('fill', 'orange').attr("r", 65);
      }).on('mouseout', function(event) {
         d3.selectAll(`.${event.newBranchID}`).style('fill', 'white').attr("r", 55);
      }).on('click', drag)

    // appends text to g html tag
    wrapperDiv.append('text')
      .attr('dx', function(d) { return -35; })
      .attr('class', 'circleText')
      .text(function(d) {
        // if length of branchID string is greater than 12 characters, slice it
        if (d.length > 12) {
          d = d.newBranchID.substr(0, 10) + '...';
        }
        return d.newBranchID;

      // GUI click listener that will guide user back to selected chat branch
      }).on('click', function(event) {
        this.setState({renderGUI: false, branchID: event.newBranchID});
      }.bind(this));
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
        <img onClick={this.handleGoogleRequest} src="https://developers.google.com/accounts/images/sign-in-with-google.png"/>
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
