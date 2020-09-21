// VARIABLES
var cocktailEl = $(".drink")
var recipeEl = $(".recipe")
var historyEl = $("#historylist")
var searchEl = $("#search")
var searchinputEl = $("#searchinput")
var list = $("#historylist")
var alcohol = '';
var dishhistory = []


searchEl.on("click", function () {
    var dishname = searchinputEl.val()
    alcohol = $("input[class ='form-check-input']:checked").val();
  
    edamamRecipieAPICall(dishname)
    getCocktail();

})




// DRINK API CALL
// get drink 
function getCocktail() {
    cocktailEl.empty();
    var alQueryURL = "https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=" + alcohol;
    $.ajax({
        url: alQueryURL,
        method: "GET"
    }).then(function (r) {
        var number = Math.floor((Math.random() * r.drinks.length) + 1);
        var drinkID = r.drinks[number].idDrink;
        var inQueryURL = "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=" + drinkID;
        $.ajax({
            url: inQueryURL,
            method: "GET"
        }).then(function (re) {
            var drink = re.drinks[0];
            var drinkPicCard = $("<div>").attr("class", "col-sm-2");
            var drinkPic = $("<img>").attr({
                src: drink.strDrinkThumb,
            });
            drinkPicCard.append(drinkPic);
            // append to page
            var drinkIngCard = $("<div>").attr("class", "col-sm-9 ins");
            var drinkName = $("<h4>").text(drink.strDrink);
            var drinkIns = $("<h6>").text("Instructions: " + drink.strInstructions)
            drinkIngCard.append(drinkName, drinkIns);
            for (var i = 1; i <= 15; i++) {
                var ingKey = "strIngredient" + i;
                var meaKey = "strMeasure" + i;
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
        var results = response.q;
        if (dishname !== ""){
        dishhistory.unshift(dishname)
        }

        savetoLocalStorage();
        loadSearchHistory()
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
        recipeEl.empty();
        var results = response.hits[0].recipe.ingredients
        var dishIngCard = $("<div>").attr("class", "col-sm-9 ins");
        var dishPicCard = $("<div>").attr("class", "col-sm-2");
        var dishimg = $("<img>").attr("src", response.hits[0].recipe.image);
        var headline = $("<h4>").text(response.hits[0].recipe.label);
        dishPicCard.append(dishimg);
        dishIngCard.append(headline);

        for (var i = 0; i < results.length; i++) {
            var p = $("<p>").text(results[i].text)
            var img = dishimg[i]
            dishIngCard.append(p);
        }

        recipeEl.append(dishPicCard, dishIngCard);




    })




}

function loadSearchHistory() {
    list.empty()
    var parsedHistory = JSON.parse(localStorage.getItem("history"));
    console.log(parsedHistory)
    if (parsedHistory !== null){
    dishhistory = parsedHistory;
    }
    for (var i = 0; i < dishhistory.length; i++) {
        if (i < 4) {
        var p = $("<button>").text(dishhistory[i]).attr("class", "history");
        list.append(p)
        }
      }
      $(".history").on("click", function (){
        var text = $(this).text();
        console.log("click");
        generateRecipe(text);
    })


}

function savetoLocalStorage() {

var stringifieddishhistory = JSON.stringify(dishhistory);
localStorage.setItem("history", stringifieddishhistory)

}

// click event for check boxes

$(document).ready(function(){
    $('input:checkbox').click(function() {
        $('input:checkbox').not(this).prop('checked', false);
    });
});


loadSearchHistory()

