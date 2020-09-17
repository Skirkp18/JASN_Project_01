





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
