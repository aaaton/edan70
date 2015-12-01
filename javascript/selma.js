var loadingBook = "";
var menuOpen = true;

$().ready(function(){
  setupMenu();
  $(".literature li:first").click();
  $(".menu-title").click();
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
    $(".menu").animate({width:'250px'});
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
    if($(this).parent().is("span")){
      return;
    }
    if($(this).hasClass("highlight")) {
      $(".highlight").removeClass("highlight")
    } else {
      var classes = $(this).attr("class");
      $(".highlight").removeClass("highlight")
      $("."+classes).addClass("highlight")
      scrollTo($("."+classes+":first"))
    }
  });
}

function marktag(span) {
  $(span).parentsUntil(".body").addClass("highlight")
}

function scrollTo(element) {
  console.log("scrolling")
  $(window).scrollTop(
    element.offset().top - $(window).offset().top
  )
}
