//todo: 
// - shuffle answers choices 
// - give feedback on answers to user
// - make prettier

//global var of our data set from the API
var QUESTION_SET = {}; 

//document ready sets up our on click actions
$(document).ready(() => {
  $("#go").click(run)
  $("#check").click(checkAnswers)
})

//go get the data from the API based on difficulty selection
function run() {
    $("#output").empty();
    var difficulty = $("#difficulty").val();

    $.ajax({
        url: 'https://opentdb.com/api.php?amount=10&difficulty=' + difficulty,
        dataType: "json",
        success: process
    });
}

// process the response from the API
function process(data) {
    console.log(data)
    QUESTION_SET = data;

    var q = data.results;
    var table = $("#output");

    for(var p=0;p<q.length;p++) {
        var row =  document.createElement("tr");
        var cell = document.createElement("td");
        cell.id = "q" + p;
        cell.innerHTML = q[p].question + "<br>";

        var radio = createRadio(p,q[p].correct_answer);

        cell.appendChild(radio);
        cell.innerHTML  += q[p].correct_answer + "<br>";

        for(var a=0;a<q[p].incorrect_answers.length;a++) {
          radio = createRadio(p,q[p].incorrect_answers[a]);
          cell.appendChild(radio)
          cell.innerHTML  += q[p].incorrect_answers[a] + "<br>";
        }
        // DOM variable (plain js) so appendChild()
        row.appendChild(cell);
        // jQuery variable so append()
        table.append(row);
    }
}

// helper method to build & return the radio button elements
function createRadio(qNum, answer) {
  var radio = document.createElement("input");
  radio.type = "radio"
  radio.name = qNum;
  radio.value = answer;
  return radio;
}

// checks the users answers vs the correct answers
function checkAnswers() {
  var qs = QUESTION_SET.results;
  var total = 0;

  for(var i = 0; i<qs.length;i++) {
    //this is some jQuery sorcery that I had to look up
    //to get the value of the selected radio button
    var a = $('input[name=' + i + ']:checked').val()
    var corrA = qs[i].correct_answer;

    if(a == corrA) {
      total++;
    } 
  }

  $("#total").text(total);

}