import React from 'react';
import rd3 from 'react-d3-library';
import node from './../d3/circle';
const RD3Component = rd3.Component;

class Branch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {d3: ''}
  }

  // componentDidMount() {
  //   this.setState({d3: node});
  // }

  render() {
    console.log('branchID', this.props.branchID);
    return (
      <div>
        <div onClick={this.props.handleGUIClick}>
          {this.props.branchID}
        </div>
      </div>
    )
  }
}

module.exports = Branch;
