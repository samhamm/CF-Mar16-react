'use strict';

var React = require('react');
var ajax = require('jquery').ajax;

var celebsData = [{moniker: 'John F. Kennedy', category: 'politician', deathDate: 19631122, _id: 1}];

var Celeb = React.createClass({

  render: function() {
    return <li><span>{this.props.data.moniker + ' • '}</span><span>{this.props.data.category + ' • '}</span>{this.props.data.deathDate}</li>
  }
});

var CelebForm = React.createClass({

  getInitialState: function() {
    return {newCeleb: {moniker: '', category: '', deathDate: ''}};
  },

  profileChange: function(event) {
    var stateCopy = this.state;
    if (event.target.name === 'new-moniker')
      stateCopy.newCeleb.moniker = event.target.value;
    if (event.target.name === 'new-category')
      stateCopy.newCeleb.category = event.target.value;
    if (event.target.name === 'new-deathDate')
      stateCopy.newCeleb.deathDate = event.target.value;
    this.setState(stateCopy);
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
        // the next line clears the form after hitting submit button
        this.setState({newCeleb: {moniker: '', category: '', deathDate: ''}});
      }.bind(this),
      error: function(xhr, status, err) {
        console.log(err);
      }
    });
  },

  render: function() {
    return (

      <form onSubmit={this.profileSubmit}>
        <p><label htmlFor="new-moniker">Moniker: </label>
        <input id="new-moniker" type="text" value={this.state.newCeleb.moniker} onChange={this.profileChange} name="new-moniker" /></p>

        <p><label htmlFor="new-category">Category: </label>
        <input id="new-category" type="text" value={this.state.newCeleb.category} onChange={this.profileChange} name="new-category" /></p>

        <p><label htmlFor="new-deathDate">Death: </label>
        <input id="new-deathDate" type="text" value={this.state.newCeleb.deathDate} onChange={this.profileChange} name="new-deathDate" /></p>

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
