

var cocktailEl = $("#cocktail")
var frecipeEl = $("#recipe")
var historyEl = $("#historylist")
var searchEl = $("#search")
var searchinputEl = $("#searchinput")

var dishhistory = []


searchEl.on("click", function(){
    var dishname = searchinputEl.val()

    edamamRecipieAPICall(dishname)
    getCocktail(dishname)
})




// DRINK API CALL
// get drink 
function getCocktail () {
    var alcohol = "vodka"
    var alQueryURL = "https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=" + alcohol;
    $.ajax({
        url: alQueryURL,
        method: "GET"
    }).then(function(r) {
        console.log(r);

    });  

};



function edamamRecipieAPICall() {

var edamamID = "9d7a8164";
var key = "4ce6ec1091b11815141f2432df876863";	

var queryURL = "https://api.edamam.com/search?q=burger&app_id=" + edamamID + "&app_key=" + key;

$.ajax({
  url: queryURL,
  method: "GET"
}).then(function(response) {
  console.log(response);

  var results = response.q;
        console.log(results)
        
            var p = $("<button>").text(results);
            var list = $("<ul>")
            list.prepend(p)

            console.log(p)

            dishhistory.push(list)
            for (var i=0; i<dishhistory.length; i++){

                historyEl.prepend(dishhistory[i]);
            }
});
};


getCocktail();
edamamRecipieAPICall();

