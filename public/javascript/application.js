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
      $("body").append('<div class="topics-bar" style="background-color:'+color+'"> <div class="border-formatting"> <br> <br> <h2 class="topic-heading">'+ categoryName +'</h2> <small><p class="topic-description">'+categoryDesc+'</p></small> </div> </div> <div class="levels-bar"> <div class="border-formatting"><div class="mode-heading"><br><h2 style="color:'+color+'"> Select Topic </h2></div> </div> </div>');
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

  var openModal = function(view){
      $(".levels-bar").append(view);

      setTimeout(function(){
        $(".modalDialog").addClass("showModal");
      },0);

      $(".modalDialog .close").off("click").on("click", function(){
        $(".modalDialog").remove();
      });

      if($(".level-heading").hasClass("study")){
        if(view === studyView){
          $("<button type='button' class='previous-question'>Last question</button>").insertBefore(".next-question")
        }
        if(view === gameConclusion){
          $("<button type='button' class='previous-question'>Last question</button>").insertBefore(".back-to-levels")
        }
      }
     
      flag = false;
  }
  var gameView = '';
  var studyView = '';

  var displayQuestion = function(levelWords, currentWord, questionCounter, currentImage, currentEnglishWord){
    var arrTwo = randomizeQuestion(questionArr(levelWords, currentWord, questionCounter));

    gameView = "<div class='modalDialog'>" +
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
                          "<button type='submit' class='check-answer'>Check Answer </button>" +
                        "</form>" +
                      "</div>" +
                    "</div>" +
                  "</div>"

    studyView ="<div class='modalDialog'>" +
                      "<div class='border-formatting'>" +
                        "<div class='modal-image-bar modal-border-formatting'>"+
                          "<img src='" + currentImage + "' class='modal-img'>" +
                        "</div>" +
                        "<div class='modal-questions-bar' id='"+ questionCounter + "'>" +
                          "<a href='#close' title='Close' class='close'>X</a>" +
                            "<h3><small> English: </small></h3>" +
                            "<h3 class='english_word level-div nohover' value='" + currentEnglishWord + "'>" + currentEnglishWord + "</h3><br>" +
                            "<h3><small> French: </small></h3>" +
                            "<h3 class='english_word level-div nohover' value='" + currentWord + "'>" + currentWord + "</h3><br>" +
                        "</div>" +
                            "<div class='study-buttons-div'>"+
                              // "<button type='button' class='previous-question'>Last Question</button>" +
                              "<button type='button' class='next-question'>Continue</button>" +
                            "</div>"+
                      "</div>" +
                    "</div>"

    if($(".level-heading").hasClass("play")){
      openModal(gameView);
    }else{
      openModal(studyView);
    }
  }

  var executeGame = function(levelWords, questionCounter){
    currentWord = levelWords[questionCounter].word;
    currentImage = levelWords[questionCounter].word_image;
    currentEnglishWord = levelWords[questionCounter].english_word;

    displayQuestion(levelWords, currentWord, questionCounter, currentImage, currentEnglishWord);
    
    if($(".level-heading").hasClass("play")){
      $("body").off("submit").on("submit","#" + questionCounter + ".choose-word", function(e){
        e.preventDefault();
        var checkedBox = $('input[type=radio]:checked', '#' + questionCounter + '.choose-word');
        var userAnswer = $('input[type=radio]:checked', '#' + questionCounter + '.choose-word').val();

        var rightAnswer = handleAnswerCheck(levelWords, currentImage, userAnswer);

        if (questionCounter < levelWords.length - 1){
         
          $(".check-answer").fadeOut("slow", function(){
            $(this).replaceWith("<button type='button' class='next-question'>Continue</button>")
            setTimeout(function(){
             $(".next-question").addClass("show-button"); 
            }, 0);
          })
        }else{
          $(".check-answer").fadeOut("slow", function(){
            $(this).replaceWith("<button type='button' class='next-question'>Done</button>")
            setTimeout(function(){
             $(".next-question").addClass("show-button"); 
            }, 0);
          })
        }
      });
    }
    
    
    if($(".level-heading").hasClass("study")){  
      setTimeout(function(){
        // display next question button until last question in study mode, then change text to done and display
        if (questionCounter < levelWords.length - 1){
          $(".next-question").addClass("show-button");
        }else{
          $(".next-question").text("Done").addClass("show-button");
        }
      },0);
    }
  }
  

  var handleLevelClick = function(categoryId, topicId, level){
    if (flag){
      return false;
    }

    flag = true;

    var categoryId = categoryId;
    var topicId = topicId;
    var levelWords = [];
    var levelId = $(level).attr("data");
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
        if(userAnswer === levelWord.word){
          $(".choose-word").append("<div class='green-background'><img class='smiley-div' src='happy_icon.png'/><span class='right-answer'>You're Right! Good Job! Correct! Bien Fait!</span></div>");
        }else {
          $(".choose-word").append("<div class='pink-background'><img class='sad-smiley-div' src='sad_icon.png'/><span class='wrong-answer'>Sorry! The correct answer is: " + levelWord.word + ". <br> Désolé! La bonne réponse est: " + levelWord.word + ".</span></div>");
        }
      }
    });
  }

  var gameConclusion = "<div class='modalDialog gameConclusion'>" +
                      "<div class='border-formatting'>" +
                        "<div class='modal-image-bar modal-border-formatting'>"+
                            "<img src='congrats.gif' class='modal-img'>" +
                        "</div>" +
                        "<div class='modal-questions-bar'>" +
                          "<a href='#close' title='Close' class='close'>X</a>" +
                          "<div class='modal-congrats-content'>" +
                            "<h3>Congratulations!</h3>" +
                            "<h3> <small> You've reached the end! </small></h3>" +
                            "<button type='button' class='back-to-levels'>Back to Levels</button>" +
                          "</div>" +
                        "</div>" +
                      "</div>" +
                    "</div>"

  $("body").on("click", ".show-button", function(e){
    var levelWords = $("body").data("level-words");
    var questionCounter = $("body").data("question-counter");

    if (questionCounter < levelWords.length - 1){
      questionCounter += 1;
      console.log(questionCounter)
      $("body").data("question-counter", questionCounter);
      executeGame(levelWords, questionCounter);
    } else {
      console.log(questionCounter)
      openModal(gameConclusion)
    }
  });

  $("body").on("click", ".previous-question", function(e){
    var levelWords = $("body").data("level-words");
    var questionCounter = $("body").data("question-counter");
    //debugger
    console.log(questionCounter, "outside if");
    console.log(levelWords)

    if (questionCounter <= levelWords.length - 1  && questionCounter >= 0){
      executeGame(levelWords, questionCounter);
      questionCounter -= 1;
      $("body").data("question-counter", questionCounter);
      console.log(questionCounter)
    }else{
      questionCounter = levelWords.length - 1
      $("body").data("question-counter", questionCounter);
      openModal(gameConclusion);
    }
  });

  $("body").on("click", ".back-to-levels", function(){
    $(".modalDialog").remove();
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
