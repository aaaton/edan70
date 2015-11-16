var loadingBook = "";
$().ready(function(){
  setupMenu();

});

function setupMenu() {
  $(".literature li").on("click", function(){
    var filename = "literature/"+$(this).attr("value")+".txt";
    loadBook(filename);
    loadingBook = $(this).html();
  })
}

function loadBook(filename) {
  console.log(filename);
  $(".body").html("<img class='spinner' src='spinner.gif'>");
  $.get(filename, showBook, "text");
}

function showBook(data){
  $(".header h1").html(loadingBook);
  $(".header h2").html("av Selma Lagerlöf");
  $(".body").html(data);
}
