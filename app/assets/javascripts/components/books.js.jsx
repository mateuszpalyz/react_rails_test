/** @jsx React.DOM */

var BooksBox = React.createClass({
  loadBooksFromServer: function() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  getInitialState: function() {
    return {data: []};
  },
  componentDidMount: function() {
    this.loadBooksFromServer();
  },
  render: function() {
    return (
      <div>
        <h1>Books</h1>
        <BooksList data={this.state.data} />
      </div>
    );
  }
});

var BooksList = React.createClass({
  render: function() {
    var booksNodes = this.props.data.map(function(book, index) {
      return (
        <Book book={book} key={index} />
      );
    });
    return (
      <div>
        {booksNodes}
      </div>
    );
  }
});

var Book = React.createClass({
  render: function() {
    return (
      <ul>
        <li>{this.props.book.title}</li>
        <li>{this.props.book.author}</li>
      </ul>
    );
  }
});

$(document).on("page:change", function() {
  React.render(
    <BooksBox url="api/books.json" />,
    document.getElementById('content')
  );
})
