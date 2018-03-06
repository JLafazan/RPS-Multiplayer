
$(document).ready(function(){
  

// Initialize Firebase
    var config = {
    apiKey: "AIzaSyBKYCHvQfGY3PxPEg16_tUpt_sXRF0p86A",
    authDomain: "rps-on-fire.firebaseapp.com",
    databaseURL: "https://rps-on-fire.firebaseio.com",
    projectId: "rps-on-fire",
    storageBucket: "",
    messagingSenderId: "195309397353"
  };
  firebase.initializeApp(config);

    // Create a variable to reference the database
    var database = firebase.database();

// -----------------------------

// connectionsRef references a specific location in our database.
// All of our connections will be stored in this directory.
var connectionsRef = database.ref("/connections");

// '.info/connected' is a special location provided by Firebase that is updated
// every time the client's connection state changes.
// '.info/connected' is a boolean value, true if the client is connected and false if they are not.
var connectedRef = database.ref(".info/connected");

// When the client's connection state changes...
connectedRef.on("value", function(snap) {

  // If they are connected..
  if (snap.val()) {

    // Add user to the connections list.
    var con = connectionsRef.push(true);
    // Remove user from the connection list when they disconnect.
    con.onDisconnect().remove();
  }
});

// When first loaded or when the connections list changes...
connectionsRef.on("value", function(snap) {

  // Display the viewer count in the html.
  // The number of online users is the number of children in the connections list.
  $("#connected-viewers").text(snap.numChildren());
});

//-------------------------------------------------/

    // List the players
    var gameTot = 10;
    var gameNo = 1;
    var player1 = "";
    var player2 = "";
    var player1Turn = true;
    var player2Turn = false;

    // Creates an array that lists out all of the options (Rock, Paper, or Scissors).
    var player1Choices = [""];
    var player2Choices = [""];

    // Creating variables to hold the number of wins, losses, and ties. They start at 0.
    var winsP1 = 0;
    var lossesP1 = 0;
    var ties = 0;
    var winsP2 = 0;
    var lossesP2 = 0;

$(".gameNo").html("<h4>"+gameNo+" out of "+gameTot+"</h4>");

// --------------------------------------------------------------------//

//Play the Game


    //Get Players Names
     $(document).on("click", "#start", function() {
        $(".choiceP1").empty();
        $(".choiceP2").empty();
        $("#message-display").empty();

    if (snapshot.val().Player1 === "") {
        Player1 = $("#name").val();
        $(".wait1").empty();
        $(".wait1").append(player1);
        database.ref().push({
        Player1: Player1,
        });

     }
      
     else if ((player1 !== "") && (player2 === "")) {
         player2 = $("#name").val();
        $(".wait2").empty();
        $(".wait2").append(player2);
      }
      console.log("Player1 =" + player1);
      console.log("Player2 =" +player2);
     

   


//-----------------------------------------------------------------

function dataUpdate(){

        database.ref().push({

        GameNo: GameNo,

        Player1: Player1,

        Player2: Player2,

        choiceP1: choiceP1,

        choiceP2: choiceP2,

        winP1: winP1,

        winP2: winP2,

        lossesP1: lossesP1,

        lossesP2: lossesP2,

        ties: ties,

        message: message,


        dateAdded: firebase.database.ServerValue.TIMESTAMP


        };

     // });

 database.ref().on("child_added", function(snapshot) {

      // Log everything that's coming out of snapshot

      

      // Change the HTML to reflect

      $("#name-display").text(snapshot.val().GameNo);

      $("#email-display").text(snapshot.val().Player1);

      $("#email-display").text(snapshot.val().Player2);

      $("#vineyard-display").text(snapshot.val().vineyard);

      $("#vineyardAddr-display").text(snapshot.val().vineyardAddr);

      $("#comment-display").text(snapshot.val().comment);

    // Handle the errors

    }, function(errorObject) {

      console.log("Errors handled: " + errorObject.code);

    });
    });
//------------------------------------------------------------


    // // This function is run whenever the user presses a key.
    // // document.onkeyup = function(event) {

    //   // Determines which key was pressed.
    //   var userGuess = event.key;

    //   // Randomly chooses a choice from the options array. This is the Computer's guess.
    //   var computerGuess = computerChoices[Math.floor(Math.random() * computerChoices.length)];

    //   // Reworked our code from last step to use "else if" instead of lots of if statements.

    //   // This logic determines the outcome of the game (win/loss/tie), and increments the appropriate number
    //   if ((userGuess === "r") || (userGuess === "p") || (userGuess === "s")) {

    //     if ((userGuess === "r") && (computerGuess === "s")) {
    //       wins++;
    //     } else if ((userGuess === "r") && (computerGuess === "p")) {
    //       losses++;
    //     } else if ((userGuess === "s") && (computerGuess === "r")) {
    //       losses++;
    //     } else if ((userGuess === "s") && (computerGuess === "p")) {
    //       wins++;
    //     } else if ((userGuess === "p") && (computerGuess === "r")) {
    //       wins++;
    //     } else if ((userGuess === "p") && (computerGuess === "s")) {
    //       losses++;
    //     } else if (userGuess === computerGuess) {
    //       ties++;
    //     }

    //     // Creating a variable to hold our new HTML. Our HTML now keeps track of the user and computer guesses, and wins/losses/ties.
    //     var html =
    //       "<p>You chose: " + userGuess + "</p>" +
    //       "<p>The computer chose: " + computerGuess + "</p>" +
    //       "<p>wins: " + wins + "</p>" +
    //       "<p>losses: " + losses + "</p>" +
    //       "<p>ties: " + ties + "</p>";

    //     // Set the inner HTML contents of the #game div to our html string
    //     document.querySelector("#game").innerHTML = html;
    //   }
    // };

//---------------------------------------------------

// At the page load and subsequent value changes, get a snapshot of the local data.
// This callback allows the page to stay updated with the values in firebase node "clicks"
// database.ref("/player1").on("value", function(snapshot) {

//   // Print the local data to the console.
//   console.log(snapshot.val());


//   // Change the HTML to reflect the local value in firebase.
//   player1 = snapshot.val().player1;

//   // Log the value of the clickCounter
//   console.log(player1);

//   // Change the HTML to reflect the local value in firebase.
//   $(".wait1").text(snapshot.val().player1);

//   // Change the HTML Value using a variable (similar to the above)
//   $(".wait1").text(player1);

// // If any errors are experienced, log them to console.
// }, function(errorObject) {
//   console.log("The read failed: " + errorObject.code);

//----------------------------------------------------


// });





});
