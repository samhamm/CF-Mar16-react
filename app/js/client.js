'use strict';

var React = require('react');

var celebsData = [{celebBody: 'hello world', _id: 1}, {celebBody: 'goodbye world', _id: 2}];

var Celeb = React.createClass({
  render: function() {
    return <li>{this.props.data.celebBody}</li>
  }
});

var CelebList = React.createClass({
  render: function() {
    var celebs = this.props.data.map(function(celeb) {
      return <Celeb data={celeb} key={celeb._id}/>
    });
    return (
      <section>
        <h1>Celebs:</h1>
        <ul>
          {celebs}
        </ul>
      </section>
    )
  }
});

var App = React.createClass({
  getInitialState: function() {
    return {celebsData: celebsData};
  },
  render: function() {
    return (
      <main>
        <CelebList data={this.state.celebsData} />
      </main>
    )
  }
});

React.render(<App />, document.body);
