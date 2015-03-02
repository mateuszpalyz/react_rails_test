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
        <h1>Book Store</h1>
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
      <div className="list-group">
        {booksNodes}
      </div>
    );
  }
});

var Book = React.createClass({
  render: function() {
    return (
      <div className="list-group-item">
        <h4 className="list-group-item-heading">{this.props.book.title}</h4>
        <p className="list-group-item-text">{this.props.book.author}<span className="glyphicon glyphicon-shopping-cart pull-right" aria-hidden="true"></span></p>
      </div>
    );
  }
});

$(document).on("page:change", function() {
  React.render(
    <BooksBox url="api/books.json" />,
    document.getElementById('content')
  );
})
