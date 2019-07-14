var animals = ["dog", "cat"]




function displayanimalInfo() {

    var animal = $(this).attr("data-animal");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        animal + "&api_key=BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9&limit=10";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        // Step 1: Run this file, click a button, and see what the response object looks like in the browser's console.
        // Open up the data key, then open up the 0th, element. Study the keys and how the JSON is structured.
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

    // Looping through the array of movies
    for (var i = 0; i < animals.length; i++) {


        var a = $("<button>");
        // Adding a class of movie-btn to our button
        a.addClass("animal-btn");
        // Adding a data-attribute
        a.attr("data-animal", animals[i]);
        // Providing the initial button text
        a.text(animals[i]);
        // Adding the button to the buttons-view div
        $("#buttons-view").append(a);
    }
}

// This function handles events where a movie button is clicked
$("#add-animal").on("click", function (event) {
    event.preventDefault();
    // This line grabs the input from the textbox
    var animal = $("#animal-input").val().trim();

    // Adding movie from the textbox to our array
    animals.push(animal);

    // Calling renderButtons which handles the processing of our movie array
    renderButtons();


    return false;

});

// Adding a click event listener to all elements with a class of "movie-btn"
$(document).on("click", ".animal-btn", displayanimalInfo);

// Calling the renderButtons function to display the intial buttons
renderButtons();