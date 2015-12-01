var loadingBook = "";
var menuOpen = true;
$().ready(function(){
  setupMenu();
  clickCharacters();
});

function setupMenu() {
  $(".literature li").on("click", function(){
    var story = $(this).attr("value");
    var filename = "literature/"+story+".html";
    var characterList = "literature/characters/"+story+".html"
    loadBook(filename);
    loadCharacters(characterList)
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
  $(".body").html("<img class='spinner' src='spinner.gif'>");
  $.get(filename, showBook, "text");
}

function showBook(data){
  $(".header h1").html(loadingBook);
  $(".header h2").html("av Selma Lagerlöf");
  $(".body").html(data);
  clickCharacters();
}

function loadCharacters(filename) {
  $(".characterList").html("<img class='spinner' src='spinner.gif'>");
  $.get(filename, showCharacters, "text");
}

function showCharacters(data) {
  $(".characterList").html(data);
}


function clickCharacters() {
  $(".body span, .characterList span").on('click',function(){
    var classes = $(this).attr("class");
    if($(this).hasClass("highlight")) {
      console.log("removing class")
      $(".highlight").removeClass("highlight")
    } else {
      console.log("adding class")
      $(".body ."+classes).addClass("highlight")
    }
  });
}

function marktag(span) {
  $(span).parentsUntil(".body").addClass("highlight")
}
