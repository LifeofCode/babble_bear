$(document).ready(function(){ 

  var handleCategoryClick = function(){
    var categoryId = $(this).attr("data");
    var categoryName = $(this).attr("name");
    var categoryDesc = $(this).attr("description");
    var color = $(this).attr("color");

    $.ajax({
      url: "/categories/" + categoryId + "/topics",
      method: "GET",
      dataType: "json"
    }).done(function(topics){
      $("body").empty();
      $("body").append('<div class="topics-bar" style="background-color:'+color+'"> <div class="border-formatting"> <br> <br> <h2 class="topic-heading">'+ categoryName +'</h2> <small><p>'+categoryDesc+'</p></small> </div> </div> <div class="levels-bar"> <div class="border-formatting"> </div> </div>')
      $(topics).each(function(index, topic){
        $(".levels-bar .border-formatting").append('<div class="level-div"><h4 class="level-heading" style="color:'+color+'"><br>'+topic.name+'</h4></div>')
      });
      $(".level-heading").on("click", function(e){
          handleTopicClick(categoryName)
      });
    });
  }

  var handleTopicClick = function(categoryName){  
    handleLevelClick();
  }

  var handleLevelClick = function(){
    var gameView = "<a href='#openModal'>Open Modal</a>" + "<div id='openModal' class='modalDialog'><div>" +
                    "<div id='openModal' class='modalDialog'>" +
                    "</div>" +
                    "<div class='border-formatting'>" +
                      "<div class='modal-image-bar modal-border-formatting'>"+ 
                        "<img src='/dog_icon.png' class='modal-img'>" + 
                      "</div>" +
                      "<div class='modal-questions-bar'>" +
                        "<a href='#close' title='Close' class='close'>X</a>" +
                        "<form id='choose-word'>" + 
                          "<h3 class='level-heading level-div'><input type='checkbox'> Un Chien </h3><br>" +
                          "<h3 class='level-heading level-div'><input type='checkbox'> Un chat </h3><br>" +
                          "<h3 class='level-heading level-div'><input type='checkbox'> Une Souris </h3><br>" +
                          "<button type='submit class='check-answer'>Check Answer </button>" +
                        "</form>" +
                      "</div>" +
                    "</div>"
    if ($("#openModal").length === 0){
      $(".levels-bar").prepend(gameView);
    }
  }

  // var handleAnswerCheck = function(){
  //   $.ajax({
  //     url: "/"
  //     method: "GET"
  //   })
  // }

  //switch between login and sign up form  

  $(".switch").click(function(){
    $(".login_form").toggleClass("hidden");
    $(".signup_form").toggleClass("hidden");
  })

  $(".category").on("click", handleCategoryClick);


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
