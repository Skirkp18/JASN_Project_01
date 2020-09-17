
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





    });  

};

getCocktail();
=======
function edamamRecipieAPICall() {

var edamamID = "9d7a8164";
var key = "4ce6ec1091b11815141f2432df876863";	

var queryURL = "https://api.edamam.com/search?q=spaghetti&app_id=9320ecc7&app_key=68c58b49df411be74f1ba681a92f0501";

$.ajax({
  url: queryURL,
  method: "GET"
}).then(function(response) {
  console.log(response);
});
};
>>>>>>> master
