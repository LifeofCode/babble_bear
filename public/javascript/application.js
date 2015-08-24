$(document).ready(function(){

  var handleCategoryClick = function(){
    var categoryId = $(this).attr("data");
    var categoryName = $(this).attr("name");
    var categoryDesc = $(this).attr("description");
    var color = $(this).attr("color");

    $.ajax({
      url: "/category/" + categoryId + "/topics",
      method: "GET",
      dataType: "json"
    }).done(function(topics){
      $("body").empty();
      $("body").append('<div class="topics-bar" style="background-color:'+color+'"> <div class="border-formatting"> <br> <br> <h2 class="topic-heading">'+ categoryName +'</h2> <small><p class="topic-description">'+categoryDesc+'</p></small> </div> </div> <div class="levels-bar"> <div class="border-formatting"> </div> </div>')
      $(topics).each(function(index, topic){
        $(".levels-bar .border-formatting").append('<div class="level-div"><br><h4 class="topics-heading"color="'+color+'" style="color:'+color+'" data="'+parseInt(topic.id)+'" name="'+topic.name+'" description="'+topic.description+'">'+topic.name+'</h4></div>')
      });
      $(".topics-heading").on("click", function(e){
        handleTopicClick(categoryId, this);
      });
    });
  }

  var handleTopicClick = function(categoryId, topic){
    var categoryId = categoryId;
    var topicId = $(topic).attr("data");
    var topicName = $(topic).attr("name");
    var topicDesc = $(topic).attr("description");
    var topicColor = $(topic).attr("color");
    
    $(".topics-bar").addClass("levels-added");
    $(".levels-bar").addClass("questions-added");
    
    $(".topic-heading").text(topicName);
    $(".topic-description").text(topicDesc);
    
    $(".level-div").addClass("remove-extra").addClass("remove-visual");
    
    setTimeout(function(){
      $(".level-div").addClass("remove-complete");
    }, 1000);

    var headings = document.getElementsByClassName("topics-heading");
    
    for (var i=0; i < headings.length; i++){
      $(headings[i]).text("Level " + (i+1));
    }

    $(".topics-heading").addClass("level-heading");
    $(".level-heading").removeClass("topics-heading").wrap("<a href='#openModal'></a>");
    
    $(".level-heading").off("click").on("click", function(e){
      handleLevelClick(categoryId, topicId, this);
    });

  }

  var handleLevelClick = function(categoryId, topicId, level){
    var categoryId = categoryId;
    var topicId = topicId;
    var levelId = $(level).attr("data");
    var arrOne = [];
    var arrTwo = [];
    var levelFrenchWords = [];
    var questionCounter = 0;

    $.ajax({
      url: "/level/" + levelId,
      method: "GET",
      dataType: "json"
    }).done(function(questions){
      //generate questions using arrays? 
      $.each(questions, function(i, question){
        levelFrenchWords.push({word: question.word, word_image: question.word_image});
      });
      
      var currentImage = levelFrenchWords[questionCounter].word_image;
      var currentWord = levelFrenchWords[questionCounter].word;
      var arr = []
      // while(arr.length < 2){
      var randOne = levelFrenchWords[Math.floor(Math.random() * levelFrenchWords.length)].word;
      //   var found=false;
      //   for(var i=0;i<arr.length;i++){
      //     if(arr[i]==randomnumber){found=true;break}
      //   }
        
      //   if(!found)arr[arr.length]=randomnumber;
      // } 
      var randTwo = levelFrenchWords[Math.floor(Math.random() * levelFrenchWords.length)].word;

      var gameView = "<div id='openModal' class='modalDialog'>" +
                      "<div class='border-formatting'>" +
                        "<div class='modal-image-bar modal-border-formatting'>"+
                          "<img src='" + currentImage + "' class='modal-img'>" +
                        "</div>" +
                        "<div class='modal-questions-bar'>" +
                          "<a href='#close' title='Close' class='close'>X</a>" +
                          "<form id='choose-word'>" + 
                            "<h3 class='level-heading level-div nohover'><input id='word-one' name='question-word' type='radio' value='" + arrTwo[0] + "'>" + arrTwo[0] + "</h3><br>" +
                            "<h3 class='level-heading level-div nohover'><input id='word-one' name='question-word' type='radio' value='" + arrTwo[1] + "'>" + arrTwo[1] + "</h3><br>" +
                            "<h3 class='level-heading level-div nohover'><input id='word-one' name='question-word' type='radio' value='" + arrTwo[2] + "'>" + arrTwo[2] + "</h3><br>" +
                            "<button type='submit class='check-answer'>Check Answer </button>" +
                          "</form>" +
                        "</div>" +
                      "</div>" +
                    "</div>" 
      $(".levels-bar").append(gameView);

      $("#choose-word").on("submit", function(e){
        e.preventDefault();
        
        var checkedBox = $('input[type=radio]:checked', '#choose-word')
        var userAnswer = $('input[type=radio]:checked', '#choose-word').val();
            
        handleAnswerCheck(levelId, userAnswer, checkedBox);
      });
    });

  }

  var handleAnswerCheck = function(levelId, userAnswer, checkedBox){
      // $.ajax({
      //   url: "/level/" + levelId,
      //   method: "GET",
      //   dataType: "json"
      // }).done(function(questions){
      //   $.each(questions, function(i, question){
      //     if (question.word_image === '/dog_icon.png'){
      //       if(userAnswer === question.word){
      //         // make box green? show green checkmark? $(checkedBox).css('border', 'green')
      //         console.log("correct!");
      //       }else {
      //         console.log("wrong!");
      //       }
      //       //check input text against question.word.downcase();
      //     }
      //   });
      // });
    
  }

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
