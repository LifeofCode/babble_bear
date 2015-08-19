// $(document).ready(function() {
//   $(".category").on("click", function(){
//     $.ajax({
//       url: "/topics",
//       method: "GET",
//       dataType: "json"
//     }).done(function(topics){
//       console.log(topics)
//       $(".categories").empty();
//       $(topics).each(function(index, topic){
//         $(".categories").append(topic.name);
//       })
//     });
//   });
  
//   // See: http://docs.jquery.com/Tutorials:Introducing_$(document).ready()
// });

var CategoryList = React.createClass({
  render: function(){
    var categoryNodes = this.props.data.map(function (category){
      return (
        <div id="{category.id}" className="category four columns">
          <h5 className="category-name"> {category.name} </h5>
        </div>
      );
    });
    return (
      <div> 
        {categoryNodes}
      </div>
    );
  }
});

var Container = React.createClass({
  getInitialState: function(){
    return {data: []};
  },
  componentDidMount: function(){
    $.ajax({
      url: this.props.url, 
      dataType: 'json'
    }).done(function(data){
      console.log(this)
      this.setState({data: data});
    }.bind(this));
  },
  render: function(){
    return (
      <div className="categories twelve columns"> 
        <CategoryList data={this.state.data} /> 
      </div>
    );
  }
});

React.render(
  <Container url="/categories" />,
  document.body
);
