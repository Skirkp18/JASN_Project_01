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


// RECIPE API CALL
// get recipes
function edamamRecipieAPICall() {

var edamamID = "9d7a8164";
var key = "4ce6ec1091b11815141f2432df876863";	

var queryURL = "https://api.edamam.com/search?q=burger&app_id=" + edamamID + "&app_key=" + key;

$.ajax({
  url: queryURL,
  method: "GET"
}).then(function(response) {
  console.log(response);
});
};

getCocktail();
edamamRecipieAPICall();

