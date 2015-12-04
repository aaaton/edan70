var loadingBook = "";
var menuOpen = true;

$().ready(function(){
  setupMenu();
  $(".literature li:first").click();
  $(".menu-title").click();
});

function setupMenu() {
  $(".literature li").on("click", function(){
    clickCharactersCalled = false;
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
  clickCharacters(".body");
}

function loadCharacters(filename) {
  $(".characterList").html("<img class='spinner' src='spinner.gif'>");
  $.get(filename, showCharacters, "text");
}

function showCharacters(data) {
  $(".characterList").html(data);
  clickCharacters(".characterList");
}


function clickCharacters(holder) {
  $(+holder" span").on('click',function(){
    if($(this).parent().is("span")){
      return;
    }
    if($(this).hasClass("highlight")) {
      $(".highlight").removeClass("highlight")
    } else {
      var classField = $(this).attr("class");
      var classes = classField.split(" ")
      $(".highlight").removeClass("highlight")
      for(var i = 0; i<classes.length;i++) {
        $("."+classes[i]).addClass("highlight")
      }
      scrollTo($(".body ."+classes[0]+":first"))
    }
  });
}

function marktag(span) {
  $(span).parentsUntil(".body").addClass("highlight")
}

function scrollTo(element) {
  console.log("scrolling")
  var value = element.offset().top+'px';
  $("body,html").animate({scrollTop:value})
}
