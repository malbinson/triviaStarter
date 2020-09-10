//todo: 
// - shuffle answers choices 
// - give feedback on answers to user
// - make prettier

var QUESTION_SET = {}; 

$(document).ready(() => {
  $("#go").click(run)
  $("#check").click(checkAnswers)
})

function run() {
    $("#output").empty();
    var difficulty = $("#difficulty").val();

    $.ajax({
        url: 'https://opentdb.com/api.php?amount=10&difficulty=' + difficulty,
        dataType: "json",
        success: process
    });
}

function process(data) {
    console.log(data)
    QUESTION_SET = data;

    var q = data.results;
    var table = $("#output");
    console.log(table)

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
        row.appendChild(cell);
        $("#output").append(row);
    }
}

function createRadio(qNum, answer) {
  var radio = document.createElement("input");
  radio.type = "radio"
  radio.name = qNum;
  radio.value = answer;
  return radio;
}

function checkAnswers() {
  var qs = QUESTION_SET.results;
  var total = 0;

  for(var i = 0; i<qs.length;i++) {
    var a = $('input[name=' + i + ']:checked').val()
    var corrA = qs[i].correct_answer;

    if(a == corrA) {
      total++;
    } 
  }

  $("#total").text(total);

}