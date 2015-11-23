var loadingBook = "";
var menuOpen = true;
$().ready(function(){
  setupMenu();
  clickCharacters();
});

function setupMenu() {
  $(".literature li").on("click", function(){
    var filename = "literature/"+$(this).attr("value")+".txt";
    loadBook(filename);
    loadingBook = $(this).html();
  })
  $(".menu-title").on("click", toggleMenu);
}

function toggleMenu() {
  if(menuOpen) {
    $(".menu").animate({width:'100px'});
    $(".menu").addClass("hidden");
  } else {
    $(".menu").animate({width:'300px'});
    $(".menu").removeClass("hidden");
  }
  menuOpen = !menuOpen;
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
  clickCharacters();
}


function clickCharacters() {
  $(".body span").on('click',function(){
    var classes = $(this).attr("class");
    if($(this).hasClass("highlight")) {
      console.log("removing class")
      $(".highlight").removeClass("highlight")
    } else {
      console.log("adding class")
      $(this).addClass("highlight")
      $("."+classes).addClass("highlight")
    }
  });
}

function marktag(span) {
  $(span).parentsUntil(".body").addClass("highlight")
}
