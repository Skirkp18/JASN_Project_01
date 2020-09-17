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

<<<<<<< HEAD
=======
<<<<<<< HEAD





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

>>>>>>> a116d7be252f08f0d6ebd3329bec0a01a266d662




    });  

};

<<<<<<< HEAD

// RECIPE API CALL
// get recipes
=======
getCocktail();
=======
>>>>>>> a116d7be252f08f0d6ebd3329bec0a01a266d662
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
<<<<<<< HEAD

getCocktail();
edamamRecipieAPICall();

=======
>>>>>>> master
>>>>>>> a116d7be252f08f0d6ebd3329bec0a01a266d662
