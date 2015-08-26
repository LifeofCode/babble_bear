$(document).ready(function(){

  var flag = false;

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
      $("body").append('<div class="topics-bar" style="background-color:'+color+'"> <div class="border-formatting"> <br> <br> <h2 class="topic-heading">'+ categoryName +'</h2> <small><p class="topic-description">'+categoryDesc+'</p></small> </div> </div> <div class="levels-bar"> <div class="border-formatting"><div class="mode-heading"><h2 style="color:'+color+'"> Select Topic </h2></div> </div> </div>');
      $(topics).each(function(index, topic){
        $(".levels-bar .border-formatting").append('<div class="level-div"><br><h4 class="topics-heading"color="'+color+'" style="color:'+color+'" data="'+parseInt(topic.id)+'" name="'+topic.name+'" description="'+topic.description+'">'+topic.name+'</h4></div>');
      });
      $(".topics-heading").off("click").on("click", function(e){
        handleTopicClick(categoryId, this);
      });
    });
  };

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
      $("body").append('<br><br><div class="onoffswitch questions-added"> <input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox" id="myonoffswitch" checked> <label class="onoffswitch-label" for="myonoffswitch"> <span class="onoffswitch-inner"></span> <span class="onoffswitch-switch"></span> </label> </div>');
      $(".onoffswitch").fadeIn();
    }, 1000);


    var headings = document.getElementsByClassName("topics-heading");

    for (var i=0; i <= headings.length; i++){
      $(headings[i]).text("Level " + (i+1));
    }

    $(".topics-heading").addClass("level-heading");

    $(".level-heading").removeClass("topics-heading");

    $(".toggleStudyTest").fadeIn();

    $(".level-heading").addClass("study");
    $(".mode-heading").addClass("study");
    $(".mode-heading h2").text("Study");

    $("body").on("click", ".onoffswitch-inner", function(){
      $(".level-heading").toggleClass("study")
      $(".mode-heading").toggleClass("study");
      $(".level-heading").toggleClass("play")
      $(".mode-heading").toggleClass("play");

      if($(".mode-heading").hasClass("study")){
        $(".mode-heading h2").text("Study");
      }else {
        $(".mode-heading h2").text("Play");
      }
    });

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

  var openModal = function(gameView, studyView){

    if($(".level-heading").hasClass("play")){
      $(".levels-bar").append(gameView);

      setTimeout(function(){
        $(".modalDialog").addClass("showModal");
      },0);

      $(".modalDialog .close").off("click").on("click", function(){
        $(".modalDialog").remove();
      });

      flag = false;
    }else{

      $(".levels-bar").append(studyView);

      setTimeout(function(){
        $(".modalDialog").addClass("showModal");
      },1);

      $(".modalDialog .close").off("click").on("click", function(){
        $(".modalDialog").remove();
      });

      flag = false;

    }
  }

  var displayQuestion = function(levelWords, currentWord, questionCounter, currentImage, currentEnglishWord){
    var arrTwo = randomizeQuestion(questionArr(levelWords, currentWord, questionCounter));

    var gameView = "<div class='modalDialog'>" +
                    "<div class='border-formatting'>" +
                      "<div class='modal-image-bar modal-border-formatting'>"+
                        "<img src='" + currentImage + "' class='modal-img'>" +
                      "</div>" +
                      "<div class='modal-questions-bar'>" +
                        "<a href='#close' title='Close' class='close'>X</a>" +
                        "<form class='choose-word' id='" + questionCounter + "'>" +
                          "<h3 class='level-heading level-div nohover'><input id='word-one' name='question-word' type='radio' value='" + arrTwo[0] + "'>" + arrTwo[0] + "</h3><br>" +
                          "<h3 class='level-heading level-div nohover'><input id='word-one' name='question-word' type='radio' value='" + arrTwo[1] + "'>" + arrTwo[1] + "</h3><br>" +
                          "<h3 class='level-heading level-div nohover'><input id='word-one' name='question-word' type='radio' value='" + arrTwo[2] + "'>" + arrTwo[2] + "</h3><br>" +
                          "<button type='submit class='check-answer'>Check Answer </button>" +
                          "<button type='button' class='next-question'>Next Question</button>" +
                        "</form>" +
                      "</div>" +
                    "</div>" +
                  "</div>"

    var studyView ="<div class='modalDialog'>" +
                      "<div class='border-formatting'>" +
                        "<div class='modal-image-bar modal-border-formatting'>"+
                          "<img src='" + currentImage + "' class='modal-img'>" +
                        "</div>" +
                        "<div class='modal-questions-bar'>" +
                          "<a href='#close' title='Close' class='close'>X</a>" +
                            "<h3><small> English: </small></h3>" +
                            "<h3 class='english_word level-div nohover' value='" + currentEnglishWord + "'>" + currentEnglishWord + "</h3><br></br></br>" +
                            "<h3><small> French: </small></h3>" +
                            "<h3 class='english_word level-div nohover' value='" + currentWord + "'>" + currentWord + "</h3><br>" +
                            // "<button type='submit class='check-answer'>Check Answer </button>" +
                            "<button type='button' class='next-question show-button'>Next Question</button>" +
                            "<button type='button' class='previous-question'>Previous Question</button>" +
                        "</div>" +
                      "</div>" +
                    "</div>"


      openModal(gameView, studyView);
  }

  var executeGame = function(levelWords, questionCounter){
    currentWord = levelWords[questionCounter].word;
    currentImage = levelWords[questionCounter].word_image;
    currentEnglishWord = levelWords[questionCounter].english_word;

    $("body").off("submit").on("submit","#" + questionCounter + ".choose-word", function(e){
      e.preventDefault();
      var checkedBox = $('input[type=radio]:checked', '#' + questionCounter + '.choose-word');
      var userAnswer = $('input[type=radio]:checked', '#' + questionCounter + '.choose-word').val();

      handleAnswerCheck(levelWords, currentImage, userAnswer);
      $(".next-question").addClass("show-button");
    });

    displayQuestion(levelWords, currentWord, questionCounter, currentImage, currentEnglishWord);
  }

  var handleLevelClick = function(categoryId, topicId, level){
    if (flag){
      return false;
    }

    flag = true;

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
        levelWords.push({word: question.word, word_image: question.word_image, english_word: question.english_word});
      });
      $("body").data("level-words", levelWords);
      $("body").data("question-counter", questionCounter);

      executeGame(levelWords, questionCounter);
    });
  }

  var handleAnswerCheck = function(levelWords, currentImage, userAnswer){
    $.each(levelWords, function(i, levelWord){
      if (levelWord.word_image === currentImage){
        console.log("currentImage", currentImage)
        console.log("levelWord.word, userAnswer", levelWord.word, userAnswer)
        if(userAnswer === levelWord.word){
          console.log("correct!");
        }else {
          console.log("wrong!");
        }
      }
    });
  }

  $("body").on("click", ".show-button", function(e){
    var levelWords = $("body").data("level-words");
    var questionCounter = $("body").data("question-counter");

    questionCounter += 1;
    $("body").data("question-counter", questionCounter);

    console.log(questionCounter);
    executeGame(levelWords, questionCounter);
  });

  $("body").on("click", ".previous-question", function(e){
    var levelWords = $("body").data("level-words");
    var questionCounter = $("body").data("question-counter");

    questionCounter -= 1;
    $("body").data("question-counter", questionCounter);

    console.log(questionCounter);
    executeGame(levelWords, questionCounter);
  });


  //switch between login and sign up form

  $(".switch").click(function(){
    $(".login_form").toggleClass("hidden");
    $(".signup_form").toggleClass("hidden");
  });

  $(".category").off("click").on("click", handleCategoryClick);

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
