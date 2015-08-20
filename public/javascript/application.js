$(document).ready(function(){ 
  var handleTopicClick = function(categoryName){
    console.log(categoryName);
  }

  var handleCategoryClick = function(){
    var categoryId = $(this).attr("data");
    var categoryName = $(this).attr("name");

    $.ajax({  
      url: "/categories/" + categoryId + "/topics",
      method: "GET",
      dataType: "json"
    }).done(function(topics){
      $("body").empty();
      $(topics).each(function(index, topic){
        $("body").append("<div id='cat" + topic.id + "'class='category'>" + "<h5 class='category-name'>" + topic.name + "</h5>" +  "</div>");
      });
      $(".category").on("click", function(e){
        handleTopicClick(e, categoryName);
      });
    });
  }

//on load bind click events to handle click on category
  $.ajax({  
    url: "/categories",
    method: "GET",
    dataType: "json"
  }).done(function(categories){
    $("body").append("<div class='categories twelve columns'></div>");
    $(categories).each(function(index, category){
      $(".categories").append("<div id='cat" + category.id + "'class='category' data='" + category.id + "'name='" + category.name + "'> <div class='content'><h5 class='category-name'>" + category.name + "</h5></div></div>");
    });
    $(".category").on("click", handleCategoryClick);
  });

});

// var showView = function(view){
//   document.body.empty;
//   React.render(
//     view, document.body
//   );
// }

// var Nav = React.createClass({
//   render: function(){
//     return(
//       <header>
//         <nav className="nav">
//           <div id="title-babble-bear">
//             <img src="/Babble1.png"/> 
//             <div id="bear-div">
//               <img src="https://s-media-cache-ak0.pinimg.com/236x/63/c8/58/63c858955ea82aa8b1fa7d3382af4b49.jpg" id="bear"/>
//             </div>
//           </div>
//         </nav>
//       </header>
//     );
//   }
// });

// var Topics = React.createClass({
//   componentDidMount: function(){
//     $.ajax({
//       url: this.props.url, 
//       dataType: 'json'
//     }).done(function(data){
//       this.setState({data: data});
//     }.bind(this));
//   },
//   render: function(){
//     return (
//       <div>
//         <div className="categories"> 
//           {this.state.data} 
//         </div>
//       </div>
//     );
//   }
// });

// var TopicList = React.createClass({
//   render: function(){
//     category = this.props.data
//     return (
//       <Topics url="/category/topics" /> 
//     );
//   }
// });

// var Category = React.createClass({
//   handleClick: function(event){
//     var category;
//     category = this.props.data;
    
//     // showView(<TopicList data={category}/>);
//     return; 
//   },
//   render: function(){
//     var category;
//     category = this.props.data;
    
//     return(
//       <div id={"cat" + category.id} className="category" onClick={this.handleClick}>
//         <div className="content"> 
//           <h5 className="category-name"> {category.name} </h5>
//         </div> 
//       </div>
//     );
//   }
// });
 
// var CategoryList = React.createClass({
//   render: function(){
//     var categoryNodes = this.props.data.map(function (category){
//       return (
//         <Category data={category} /> 
//       );
//     });

//     return (
//       <div > 
//         {categoryNodes};
//       </div>
//     );
//   }
// });

// var CategoryBox = React.createClass({
//   getInitialState: function(){
//     return {data: []};
//   },
//   componentDidMount: function(){
//     $.ajax({
//       url: this.props.url, 
//       dataType: 'json'
//     }).done(function(data){
//       this.setState({data: data});
//     }.bind(this));
//   },
//   render: function(){
//     return (
//       <div>
//         <Nav />
//         <div className="categories"> 
//           <CategoryList data={this.state.data} /> 
//         </div>
//       </div>
//     );
//   }
// });

// showView(<CategoryBox url="/categories" />)
