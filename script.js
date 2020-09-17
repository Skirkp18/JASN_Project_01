





// DRINK API CALL
// get drink 
function getCocktail () {
    var alcohol = "gin"
    var alQueryURL = "https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=" + alcohol;
    $.ajax({
        url: alQueryURL,
        method: "GET"
    }).then(function(r) {
        var number = Math.floor((Math.random() * 50) + 1);
        var drinkID = r.drinks[number].idDrink;
        var inQueryURL = "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=" + drinkID;
        $.ajax({
            url: inQueryURL,
            method: "GET"
        }).then(function(re) {
            var drink = re.drinks[0];
            var drinkPicCard = $("<div>").attr("class", "col-md-3");
            var drinkPic = $("<img>").attr({
                src: drink.strDrinkThumb,
                width: "200px"
            });
            drinkPicCard.append(drinkPic);
            // append to page
            var drinkIngCard = $("<div>").attr("class", "col-md-4");
            var drinkName = $("<h3>").text(drink.strDrink);
            drinkIngCard.append(drinkName);
            for (var i = 1; i <= 15; i++) {
                var ingKey = "strIngredient" + i;
                var meaKey = "strMeasure" + i;
                console.log(drink[ingKey]);
                if (drink[ingKey] !== null) {
                    if (drink[meaKey] !== null) {
                    var ingredient = $("<p>").text(drink[meaKey] + " " + drink[ingKey]);
                    } else {
                    var ingredient = $("<p>").text(drink[ingKey]);
                    };
                    drinkIngCard.append(ingredient);
                }
            };
            $(".row").append(drinkPicCard, drinkIngCard);
        });
        //always a max of 15, make an array of all 15 ing, then loop through the array, if null, skip, else create 
    });  

};

getCocktail();


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
