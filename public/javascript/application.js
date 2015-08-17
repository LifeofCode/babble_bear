$(document).ready(function() {
  // $(".category-name").on("click", function(){
  //   $.ajax({
  //     url: "/topics",
  //     method: "GET",
  //     dataType: "json"
  //   }).done(function(topics){
  //     console.log(topics)
  //     $("body").empty();
  //     $(topics).each(function(index, topic){
  //       $("body").append(topic.name);
  //     })
  //   });
  // });

  $(".category").on("click", function(){
    $(this).addClass("move-left");
  });
  // See: http://docs.jquery.com/Tutorials:Introducing_$(document).ready()
});
