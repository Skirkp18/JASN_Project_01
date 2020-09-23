// VARIABLES
var cocktailEl = $(".drinkdish")
var recipeEl = $(".recipe")
var historyEl = $("#historylist")
var searchEl = $("#search")
var searchinputEl = $("#searchinput")
var list = $("#historylist")
var checkboxs = $(".form-check-input")
var alcohol = 'gin';
var dishhistory = ["Burger", "Spaghetti", "Salom", "Pancakes"]

// event listners
searchEl.on("click", function () {
    var dishname = searchinputEl.val()
    alcohol = $("input[class ='form-check-input']:checked").val();
  
    edamamRecipieAPICall(dishname)
    getCocktail();

});

// if enter is pressed when typing in dish
$(searchinputEl).keypress(function(event){
    var keycode = (event.keyCode ? event.keyCode : event.which);
    if(keycode == '13'){
        var dishname = searchinputEl.val()
        alcohol = $("input[class ='form-check-input']:checked").val();
      
        edamamRecipieAPICall(dishname)
        getCocktail();
    }
});

// if enter is pressed when choosing drink
$(checkboxs).keypress(function(event){
    var keycode = (event.keyCode ? event.keyCode : event.which);
    if(keycode == '13'){
        var dishname = searchinputEl.val()
        alcohol = $("input[class ='form-check-input']:checked").val();
      
        edamamRecipieAPICall(dishname)
        getCocktail();
    }
});



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
            var drinkCard = $("<div>").attr("class", "col-lg-6 drink");
            var drinkPic = $("<img>").attr({
                src: drink.strDrinkThumb,
            }).attr("class", "floatleft");
            drinkCard.append(drinkPic);
            // append to page
            var drinkName = $("<h4>").text(drink.strDrink);
            var drinkIns = $("<h6>").text("Instructions: " + drink.strInstructions);
            drinkCard.append(drinkName, drinkIns);
            for (var i = 1; i <= 15; i++) {
                var ingKey = "strIngredient" + i;
                var meaKey = "strMeasure" + i;
                if (drink[ingKey] !== null) {
                    if (drink[meaKey] !== null) {
                        var ingredient = $("<p>").text(drink[meaKey] + " " + drink[ingKey]);
                    } else {
                        var ingredient = $("<p>").text(drink[ingKey]);
                    };
                    drinkCard.append(ingredient);
                }
            };
            cocktailEl.append(drinkCard);
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
        var dishCard = $("<div>").attr("class", "col-lg-6 recipe");
        var dishimg = $("<img>").attr("src", response.hits[0].recipe.image).attr("class", "floatleft");
        var headline = $("<h4>").text(response.hits[0].recipe.label);
        dishCard.append(dishimg, headline);

        for (var i = 0; i < results.length; i++) {
            var p = $("<p>").text(results[i].text)
            var img = dishimg[i]
            dishCard.append(p);
        }

        var dishFullRecipe = $("<a>").text("Click to see full recipe!").attr("href", response.hits[0].recipe.url);
        dishCard.append(dishFullRecipe);

        cocktailEl.prepend(dishCard);




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
localStorage.setItem("drink", alcohol);


}

// click event for check boxes

$(document).ready(function(){
    $('input:checkbox').click(function() {
        $('input:checkbox').not(this).prop('checked', false);
    });
});


loadSearchHistory()
getCocktail();
edamamRecipieAPICall();