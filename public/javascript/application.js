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

  var questionArr = function(levelWords, currentWord, questionCounter){
    var arrOne = []; 
    var randIndexOne = 0;
    var randIndexTwo = 0;
    var randWordOne = '';
    var randWordTwo = ''; 
    
    randIndexOne = Math.floor(Math.random() * levelWords.length);

    while(randIndexOne === questionCounter){
      randIndexOne = Math.floor(Math.random() * levelWords.length);
    }

    randWordOne = levelWords[randIndexOne].word;
    
    randIndexTwo = Math.floor(Math.random() * levelWords.length);

    while(randIndexTwo === questionCounter || randIndexOne === randIndexTwo){
      randIndexTwo = Math.floor(Math.random() * levelWords.length);
    }

    randWordTwo = levelWords[randIndexTwo].word;
    
    arrOne.push(currentWord, randWordOne, randWordTwo);
        
    return arrOne
  }

  var randomizeQuestion = function(arrOne){
    var arrTwo = [];
  
    for (var i=0; i < 3; i++){
      var randomIndex = Math.floor(Math.random() * 3);    
      while(arrTwo[randomIndex]){
        randomIndex = Math.floor(Math.random() * 3);
      } 
      arrTwo[randomIndex] = arrOne[i];
    }
    return arrTwo;
  }

  var handleLevelClick = function(categoryId, topicId, level){
    var categoryId = categoryId;
    var topicId = topicId;
    var levelId = $(level).attr("data");
    var levelWords = [];
    
    var questionCounter = 0;
    var currentImage = ''; 
    var currentWord = '' ;
    
    $.ajax({
      url: "/level/" + levelId,
      method: "GET",
      dataType: "json"
    }).done(function(questions){
      $.each(questions, function(i, question){
        levelWords.push({word: question.word, word_image: question.word_image});
      });
      
      currentImage = levelWords[questionCounter].word_image;
      currentWord = levelWords[questionCounter].word;

      var arrTwo = randomizeQuestion(questionArr(levelWords, currentWord, questionCounter));

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

      $("#choose-word").off("submit").on("submit", function(e){
        e.preventDefault();
        var checkedBox = $('input[type=radio]:checked', '#choose-word');
        var userAnswer = $('input[type=radio]:checked', '#choose-word').val();
            
      });
    });
  }

  var handleAnswerCheck = function(levelWords, currentImage, userAnswer){  
    $.each(levelWords, function(i, levelWord){
      if (levelWord.word_image === currentImage){
        if(userAnswer === levelWord.word){
          console.log("correct!");
        }else {
          console.log("wrong!");
        }
      }
    });        
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
