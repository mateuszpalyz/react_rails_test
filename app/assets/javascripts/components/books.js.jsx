var App = React.createClass({
  render: function() {
    return (
      <h1>ble ble</h1>
    );
  }
});

$(function(){
  React.render(
    <App />,
    document.getElementById('content')
  );
})
