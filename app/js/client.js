'use strict';

var React = require('react');

var notesData = [{noteBody: 'hello world', _id: 1}, {noteBody: 'goodbye world', _id: 2}];

var Note = React.createClass({
  render: function() {
    return <li>{this.props.data.noteBody}</li>
  }
});

var NoteList = React.createClass({
  render: function() {
    var notes = this.props.data.map(function(note) {
      return <Note data={note} key={note._id}/>
    });
    return (
      <section>
        <h1>Notes:</h1>
        <ul>
          {notes}
        </ul>
      </section>
    )
  }
});

var App = React.createClass({
  getInitialState: function() {
    return {notesData: notesData};
  },
  render: function() {
    return (
      <main>
        <NoteList data={this.state.notesData} />
      </main>
    )
  }
});

React.render(<App />, document.body);
