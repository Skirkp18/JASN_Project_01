

var cocktailEl = $(".drink")
var recipeEl = $("#recipes")
var historyEl = $("#historylist")
var searchEl = $("#search")
var searchinputEl = $("#searchinput")
var checkbox = $("#defaultCheck1")
var alcohol = '';
var dishhistory = []

searchEl.on("click", function () {
    var dishname = searchinputEl.val()

    console.log(dishname)

    alcohol = $(this).checkbox.val()

    console.log(alcohol);
  


    edamamRecipieAPICall(dishname)
    getCocktail();

})




// DRINK API CALL
// get drink 
function getCocktail() {
    
    var alQueryURL = "https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=" + alcohol;
    $.ajax({
        url: alQueryURL,
        method: "GET"
    }).then(function (r) {
        console.log(r);
        var number = Math.floor((Math.random() * r.drinks.length) + 1);
        var drinkID = r.drinks[number].idDrink;
        var inQueryURL = "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=" + drinkID;
        $.ajax({
            url: inQueryURL,
            method: "GET"
        }).then(function (re) {
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
            var drinkIns = $("<h6>").text(drink.strInstructions);
            drinkIngCard.append(drinkName, drinkIns);
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
            cocktailEl.append(drinkPicCard, drinkIngCard);
        });
        //always a max of 15, make an array of all 15 ing, then loop through the array, if null, skip, else create 

    });

};



function edamamRecipieAPICall(dishname) {

    var edamamID = "9d7a8164";
    var key = "4ce6ec1091b11815141f2432df876863";

    var queryURL = "https://api.edamam.com/search?q=" + dishname + "&app_id=" + edamamID + "&app_key=" + key;

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);

        var results = response.q;
        console.log(results)

        var p = $("<button>").text(results).attr("class", "btn btn-outline-secondary history");
        var list = $("#historylist")
        list.prepend(p)

        console.log(p)

        dishhistory.push(p)
        for (var i = 0; i < dishhistory.length; i++) {

            historyEl.prepend(dishhistory[i]);
        }
        $(".history").on("click", function (){
            var text = $(this).text();
            generateRecipe(text);
        })

        generateRecipe(dishname)
    });
};


function generateRecipe(dishname) {

    var edamamID = "9d7a8164";
    var key = "4ce6ec1091b11815141f2432df876863";

    var queryURL = "https://api.edamam.com/search?q=" + dishname + "&app_id=" + edamamID + "&app_key=" + key;

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {

        var results = response.hits[0].recipe.ingredients

        recipeEl.html("")
        var headline = $("<h1>").text("To make " + dishname + " you will need: ")
        recipeEl.append(headline)

        for (var i = 0; i < results.length; i++) {
            var p = $("<p>").text(results[i].text)
            recipeEl.append(p);

        }




    })




}


// click event for check boxes

$(document).ready(function(){
    $('input:checkbox').click(function() {
        $('input:checkbox').not(this).prop('checked', false);
    });
});


