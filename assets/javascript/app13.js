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
  // $("#connected-viewers").text(snap.numChildren());
});


//-------------------------------------------------/

    // List the players
    var name = "";
    var gameTot = 10;
    var gameNo = 1;
    var gameNoo = "";
    var player1 = "";
    var player2 = "";
    var player1Turn = true;
    var player2Turn = false;

    // Creates an array that lists out all of the options (Rock, Paper, or Scissors).
    var choiceP1 = [""];
    var choiceP2 = [""];

    // Creating variables to hold the number of wins, losses, and ties. They start at 0.
    var winsP1 = 0;
    var lossesP1 = 0;
    var ties = 0;
    var winsP2 = 0;
    var lossesP2 = 0;
    var winner = "NOBODY";
    var winner2 = "Has Won Yet!"


// Additonal variables to be stored and recalled.

    var wait = "WAITING FOR YOU";
    var whosTurn = "IT'S YOUR TURN";
    var wait1 = "WAITING FOR PLAYER1";
    var wait2 = "WAITING FOR PLAYER2";
    var messageDisplay = "Die you sucking pig!"
    var message2 = "";
//---------------------------------------------------------/

function reset() {

    


    $(".gameNoo").html(gameNo+' out of '+gameTot);
    $(".wait").html("<h4>WAITING FOR YOU!</h4>");
    $(".whosTurn").html("<h4>ENTER NAME AND HIT START!</h4>");
    $(".wait1").html("<h4>WAITING FOR PLAYER1</h4>");
    $(".wait2").html("<h4>WAITING FOR PLAYER2</h4>");
    $(".choiceP1").html("<h5>RockPaperScissors</h5>");
    $(".winsP1").html("Wins:" + winsP1);
    $(".lossesP1").html("Losses:" + lossesP1);
    $(".winner").html("<h4>NOBODY</h4>");
    $(".winner2").html("<h4>HasWonYet!</h4>");
    $(".ties").html("Ties:" + ties);
    $(".choiceP2").html("<h5>RockPaperScissors</h5>");
    $(".winsP2").html("Wins:" + winsP2);
    $(".lossesP2").html("Losses:" + lossesP2);
    $("#messageDisplay").html("<h5>Choose Your Weapon!</h5>");



};
//---------------------------------------------------------/


reset();


//-------------------------------------------------------/

function dataUpdate(){

        database.ref().push({

        gameNo: gameNo,

        gameNoo: gameNoo,

        gameTot: gameTot,

        player1: player1,

        player2: player2,

        player1Turn: player1Turn,

        player2Turn: player2Turn,

        wait1: wait1,

        wait2: wait2,

        winner: winner,

        winner2: winner2,

        choiceP1: choiceP1,

        choiceP2: choiceP2,

        winsP1: winsP1,

        winsP2: winsP2,

        lossesP1: lossesP1,

        lossesP2: lossesP2,

        ties: ties,

        messageDisplay: messageDisplay,


        dateAdded: firebase.database.ServerValue.TIMESTAMP

        });
        };
//--------------------------------------------------------/

dataUpdate();

//---------------------------------------------------------/




//-------------------------------------------------------/

function snapshotIt(){

    database.ref().on("child_changed",function(snapshot) {


        console.log(snapshot.val());
        console.log(snapshot.val().gameNo);
        console.log(snapshot.val().gameTot);
        console.log(snapshot.val().whosTurn);
        console.log(snapshot.val().wait1);
        var x = snapshot.val().gameNo;
        var y = snapshot.val().gameTot;

        console.log("x="+x);
        console.log("y="+y);



    $(".gameNoo").html(x +' out of '+ y);
    $(".wait").html(snapshot.val().wait);
    $(".whosTurn").html(snapshot.val().whosTurn);
    $(".wait1").html(snapshot.val().wait1);
    $(".wait2").html(snapshot.val().wait2);
    $(".choiceP1").html(snapshot.val().choiceP1);
    $(".winsP1").html("Wins: " + snapshot.val().winsP1);
    $(".lossesP1").html("Losses: " + snapshot.val().lossesP1);
    $(".winner").html(snapshot.val().winner);
    $(".winner2").html(snapshot.val().winner2);
    $(".ties").html("Ties: "+ snapshot.val().ties);
    $(".choiceP2").html(snapshot.val().choiceP2);
    $(".winsP2").html("Wins: " + snapshot.val().winsP2);
    $(".lossesP2").html("Losses: " + (snapshot.val().lossesP2));
    $("#messageDisplay").html(snapshot.val().messageDisplay);

//Handle the errors

    }, function(errorObject) {
        console.log("Errors handled:"+errorObject.code);

    });


}

//------------------------------------------------------/


snapshotIt();


//------------------------------------------------------/

    


  $(document).on("click","#reset", function(event){
    reset();
      
    });


  $("#message3").on("click", function(event){
    event.preventDefault();
    var message = $("#message2").val();
    $("#messageDisplay").html(message);
      
    });
//--------------------------------------------------------/



//--------------------------------------------------------/

$("#rock").on("click", function(event){
    rock();
});

$("#paper").on("click", function(event){
    paper();
});

$("#scissors").on("click", function(event){
    scissors();

});

function rock(){
    
        if (player1Turn === true) {
            choiceP1 = "ROCK";  
            $(".choiceP1").text("ROCK");
            }
        else choiceP1 = ""
            $(".choiceP2").text("");


        if (player2Turn === true) {
            choiceP2 = "ROCK";  
            $(".choiceP1").text("ROCK");
            }
        else choiceP1 = ""
            $(".choiceP2").text("");

snapshotIt ();

}

function paper(){

        if (player1Turn === true) {
            choiceP1 = "PAPER";  
            $(".choiceP1").text("PAPER");
            }
        else choiceP1 = ""
            $(".choiceP2").text("");


        if (player2Turn === true) {
            choiceP2 = "PAPER";  
            $(".choiceP1").text("PAPER");
            }
        else choiceP1 = ""
            $(".choiceP2").text("");
    
 snapshotIt ();       
        
    
}


function scissors(){
    
        if (player1Turn === true) {
            choiceP1 = "SCISSORS";  
            $(".choiceP1").text("SCISSORS");
            }
        else choiceP1 = ""
            $(".choiceP2").text("");


        if (player2Turn === true) {
            choiceP2 = "SCISSORS";  
            $(".choiceP1").text("SCISSORS");
            }
        else choiceP1 = ""
            $(".choiceP2").text("");

snapshotIt ();        
    
}    



//---------------------------------------------------------/    
   function playerName() { 

     //Get Players Names
     $(document).on("click", "#start", function() {
        $(".choiceP1").empty();
        $(".choiceP2").empty();
        $("#message-display").empty();

        


    if (player1 === "") {
        player1 = $("#name").val();
        $(".wait1").empty();
        $(".wait1").append(player1);

    

      }
      
     else if ((player1 !== "") && (player2 === "")) {
         player2 = $("#name").val();
        $(".wait2").empty();
        $(".wait2").append(player2);
       }
      console.log("Player1 =" + player1);
      console.log("Player2 =" + player2);
    });  
        
snapshotIt ();
 
};

//---------------------------------------------------------/

playerName();

//--------------------------------------------------------/




function playGame() {

for (var i = 0; i < (gameTot+1); i--) {
    

// This logic determines the outcome of the game (win/loss/tie), and increments the appropriate number
      if ((choiceP1 === "ROCK") || (choiceP1 === "PAPER") || (choiceP1 === "SCISSORS")) {

        if ((choiceP1 === "ROCK") && (choiceP2 === "SCISSORS")) {
          winsP1++;
          lossesP2++;
        } else if ((choiceP1 === "ROCK") && (choiceP2 === "PAPER")) {
          lossesP1++;
          winsP2++;
        } else if ((choiceP1 === "SCISSORS") && (choiceP2 === "ROCK")) {
          lossesP1++;
          winsP2++;
        } else if ((choiceP1 === "SCISSORS") && (choiceP2 === "PAPER")) {
          winsP1++;
          lossesP2++;
        } else if ((choiceP1 === "PAPER") && (choiceP2 === "ROCK")) {
          winsP1++;
          lossesP1++;
        } else if ((choiceP1 === "PAPER") && (choiceP2 === "SCISSORS")) {
          lossesP1++;
          winsP2++;
        } else if (choiceP1 === choiceP2) {
          ties++;
        }

     }  


}
snapshotIt ();

}


// playGame();


});


