var animals = ["dog", "cat"]




function displayanimalInfo() {

    var animal = $(this).attr("data-animal");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        animal + "&api_key=BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9&limit=10";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {

        var results = response.data;

        console.log(response);

        for (var i = 0; i < results.length; i++) {
            if (results[i].rating !== "pg-13") {
                var gifAnimal = $("<div>");
                var rating = results[i].rating;
                var p = $("<p>").text("Rating: " + rating);
                var animalImg = $("<img>");
                animalImg.attr("src", results[i].images.fixed_height.url);
                gifAnimal.prepend(p);
                $('#animal-view').prepend(animalImg)
            }
        }


    });
}


function renderButtons() {


    $("#buttons-view").empty();

    // Looping through the array  
    for (var i = 0; i < animals.length; i++) {


        var a = $("<button>");
        // Adding a class of 
        a.addClass("animal-btn");
        // Adding a data-attribute
        a.attr("data-animal", animals[i]);
        // Providing the initial button text
        a.text(animals[i]);
        // Adding the button to the buttons-view div
        $("#buttons-view").append(a);
    }
}

// This function handles events where 
$("#add-animal").on("click", function (event) {
    event.preventDefault();
    // This line grabs the input from the textbox
    var animal = $("#animal-input").val().trim();

    // Adding animal from the textbox to our array
    animals.push(animal);


    renderButtons();


    return false;

});

// Adding a click event listener to all elements 
$(document).on("click", ".animal-btn", displayanimalInfo);

// Calling the renderButtons function to display the intial buttons
renderButtons();