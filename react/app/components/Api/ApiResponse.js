import React from 'react'


export default class ApiResponse extends React.Component {
  state = {
    apiResponse: ""
  }

  callAPI() {
    fetch("http://localhost:9000/api/ticket")
      .then(res => res.text())
      // .then(res => res.JSON())
      .then(res => this.setState({ apiResponse: res }))
      .catch(err => err);
  }

  componentDidMount() {
    this.callAPI();
  }

  render() {
    return (
      <div>
        <p>{this.state.apiResponse}</p>
      </div>
    )
  }
}