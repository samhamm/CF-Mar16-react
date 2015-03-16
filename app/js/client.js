'use strict';

var React = require('react');
var ajax = require('jquery').ajax;

var celebsData = [{handle: 'John F. Kennedy', category: 'politician', deathDate: 19631122, _id: 1}, {handle: 'hello world', _id: 2}];

var Celeb = React.createClass({
  render: function() {
    return <li>{this.props.data.handle, this.props.data.category, this.props.data.deathDate}</li>
  }
});

var CelebForm = React.createClass({
  getInitialState: function() {
    return {newCeleb: {handle: '', category: '', deathDate: ''}};
  },
  profileChange: function(event) {
    this.setState({newCeleb: {handle: event.target.value, category: event.target.value, deathDate: event.target.value}});
  },
  profileSubmit: function(event) {
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
        this.setState({newCeleb: {handle: '', category: '', deathDate: ''}});
      }.bind(this),
      error: function(xhr, status, err) {
        console.log(err);
      }
    });
  },
  render: function() {
    return (
      // <h1>CelebriDeath Data Entry Form</h1>

      <form onSubmit={this.profileSubmit}>

        <p><label htmlFor="newceleb">Handle: </label>
        <input id="newceleb" type="text" value={this.state.newCeleb.handle} onChange={this.profileChange}/></p>

        <p><label htmlFor="newceleb">Category: </label>
        <input id="newceleb" type="text" value={this.state.newCeleb.category} onChange={this.profileChange}/></p>

        <p><label htmlFor="newceleb">Death: </label>
        <input id="newceleb" type="text" value={this.state.newCeleb.deathDate} onChange={this.profileChange}/></p>

        <button type="submit">Create New Celebrity</button>
      </form>
    )
  }
});

var CelebList = React.createClass({
  render: function() {
    var celebs = this.props.data.map(function(celeb) {
      return <Celeb data={celeb} key={celeb._id}/>;
    });
    return (
      <section>
        <h1>Dead Celebrities Already Entered:</h1>
        <ul>
          {celebs}
        </ul>
      </section>
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
