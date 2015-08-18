$(document).ready(function() {
  $(".category").on("click", function(){
    $.ajax({
      url: "/topics",
      method: "GET",
      dataType: "json"
    }).done(function(topics){
      console.log(topics)
      $(".categories").empty();
      $(topics).each(function(index, topic){
        $(".categories").append(topic.name);
      })
    });
  });
  
  // See: http://docs.jquery.com/Tutorials:Introducing_$(document).ready()
});
