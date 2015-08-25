$(document).ready(function(){


  var handleCategoryClick = function(){
    console.log("aaaaa")
    var categoryId = $(this).attr("data");
    var categoryName = $(this).attr("name");
    var categoryDesc = $(this).attr("description");
    var color = $(this).attr("color");
    console.log(categoryId);

    $.ajax({
      url: "/categories/" + categoryId + "/topics",
      method: "GET",
      dataType: "json"
    }).done(function(topics){
      $("body").empty();
      $("body").append('<div class="topics-bar" style="background-color:'+color+'"> <div class="border-formatting"> <br> <br> <h2 class="topic-heading">'+ categoryName +'</h2> <small><p class="topic-description">'+categoryDesc+'</p></small> </div> </div> <div class="levels-bar"> <div class="border-formatting"><div class="mode-heading"><h2 style="color:'+color+'"> Select Topic </h2></div> </div> </div>');
      $(topics).each(function(index, topic){
        $(".levels-bar .border-formatting").append('<div class="level-div"><br><h4 class="topics-heading"color="'+color+'" style="color:'+color+'" data="'+parseInt(topic.id)+'" name="'+topic.name+'" description="'+topic.description+'">'+topic.name+'</h4></div>');
      });
      $(".topics-heading").on("click", function(e){
          handleTopicClick(categoryName, this);
      });
    });
  };

  var handleTopicClick = function(categoryName, self){
    topicId = $(self).attr("data");
    topicName = $(self).attr("name");
    topicDesc = $(self).attr("description");
    topicColor = $(self).attr("color");
    $(".topics-bar").addClass("levels-added");
    $(".levels-bar").addClass("questions-added");
    $(".topic-heading").text(topicName);
    $(".topic-description").text(topicDesc);
    $(".level-div").addClass("remove-extra").addClass("remove-visual");
    setTimeout(function(){
      $(".level-div").addClass("remove-complete");
      $("body").append('<br><br><div class="onoffswitch questions-added"> <input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox" id="myonoffswitch" checked> <label class="onoffswitch-label" for="myonoffswitch"> <span class="onoffswitch-inner"></span> <span class="onoffswitch-switch"></span> </label> </div>');
      $(".onoffswitch").fadeIn();
    }, 1000);


    var headings = document.getElementsByClassName("topics-heading");
    for (var i=0; i <= headings.length; i++){
      $(headings[i]).text("Level " + (i+1));
    }

    $(".topics-heading").addClass("level-heading");
    $(".level-heading").removeClass("topics-heading");
    $(".mode-heading").toggleClass("study");

    $(".toggleStudyTest").fadeIn();

    $(".level-heading").addClass("study");
    $(".mode-heading").addClass("study");

    // $(.onoffswitch).click()

    $("body").on("click", function(e){
      console.log(e);
    });



    $(".level-heading").off("click").on("click", function(e){
        console.log("clicked");
        //CODE TO LINK TO GAME
    });
  }

  var handleLevelClick = function(){
    var gameView = "<a href='#openModal'>Open Modal</a>" + "<div id='openModal' class='modalDialog'><div>" +
                    "<a href='#close' title='Close' class='close'>X</a>" +
                    "<div id='openModal' class='modalDialog'>" +
                    "</div>" +
                    "<div class='border-formatting'>" +
                      "<div class='modal-image-bar modal-border-formatting'>"+
                        "<img src='/dog_icon.png' class='modal-img'>" +
                      "</div>" +
                      "<div class='modal-questions-bar'>" +
                        "<div class='level-div'><h3 class='level-heading'><br> Un Chien </h3></div>" +
                        "<div class='level-div'><h3 class='level-heading'><br> Un chat </h3></div>" +
                        "<div class='level-div'> <h3 class='level-heading'><br> Une Souris </h3></div>" +
                      "</div>" +
                    "</div>"
    $("body").append(gameView);
  }

  //switch between login and sign up form

  $(".switch").click(function(){
    $(".login_form").toggleClass("hidden");
    $(".signup_form").toggleClass("hidden");
  });

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
