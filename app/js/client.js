'use strict';

var React = require('react');
var ajax = require('jquery').ajax;

var celebsData = [{celebBody: 'hello world', _id: 1}, {celebBody: 'goodbye world', _id: 2}];

var Celeb = React.createClass({
  render: function() {
    return <li>{this.props.data.celebBody}</li>
  }
});

var CelebForm = React.createClass({
  getInitialState: function() {
    return {newCeleb: {celebBody: ''}};
  },
  handleChange: function(event) {
    this.setState({newCeleb: {celebBody: event.target.value}});
  },
  handleSubmit: function(event) {
    event.preventDefault();
    console.log(this.state.newCeleb);
    var newCeleb = this.state.newCeleb;
    ajax({
      url: this.props.url,
      contentType: 'application/json',
      type: 'POST',
      data: JSON.stringify(newCeleb),
      success: function(data) {
        this.props.onNewCelebSubmit(data);
        this.setState({newCeleb: {celebBody: ''}});
      }.bind(this),
      error: function(xhr, status, err) {
        console.log(err);
      }
    });
  },
  render: function() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label htmlFor="newceleb">New Celeb</label>
        <input id="newceleb" type="text" value={this.state.newCeleb.celebBody} onChange={this.handleChange}/>
        <button type="submit">Create New Celeb</button>
      </form>
    )
  }
});

var CelebsApp = React.createClass({
  getInitialState: function() {
    return {celebsData: []};
  },
  onNewCeleb: function(celeb) {
    celeb._id = this.state.celebsData.length + 1;
    var stateCopy = this.state;
    stateCopy.celebsData.push(celeb);
    this.setState(stateCopy);
  },
  componentDidMount: function() {
    ajax({
      url: this.props.celebsBaseUrl,
      dataType: 'json',
      success: function(data) {
        var state = this.state;
        state.celebsData = data;
        this.setState(state);
      }.bind(this),
      error: function(xhr, status) {
        console.log(xhr, status);
      }
    });
  },
  render: function() {
    return (
      <main>
        <CelebForm onNewCelebSubmit={this.onNewCeleb} url={this.props.celebsBaseUrl}/>
        <CelebList data={this.state.celebsData} />
      </main>
    )
  }
});

React.render(<CelebsApp celebsBaseUrl={'/api/v1/celebs'}/>, document.body);
