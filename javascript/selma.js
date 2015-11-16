$().ready(function(){
  setupMenu();

});

function setupMenu() {
  $(".literature li").on("click", function(){
    var filename = "literature/"+$(this).attr("value")+".txt";
    loadBook(filename);
  })
}

function loadBook(filename) {
  //TODO
  console.log(filename);

  $.get(filename, showBook, "text");
}

function showBook(data){
  console.log(data);
}
