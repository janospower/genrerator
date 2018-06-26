// from https://gist.github.com/terrywbrady/a03b25fe42959b304b1e:

var data = null;
var adjectives = [];
var genres = [];
var ends = [];
var buttons = [];
var countries = [];
var types = [];
var resultDiv,
    button,
    descriptionDiv;
function doData(json) {
    data = json.feed.entry;
}

String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

function readData() {
    for(var r=0; r<data.length; r++) {
        var cell = data[r]["gs$cell"];
        var val = cell["$t"];
        var col = parseInt(cell.col);
        switch (col) {
          case 1:
            adjectives.push(val);
            break;
          case 2:
            genres.push(val);
            break;
          case 3:
            ends.push(val);
            break;
          case 4:
            buttons.push(val);
            break;
          case 5:
            countries.push(val);
            break;
          case 6:
            types.push(val);
            break;
        }
    }
}
function randomFromArray (a) {
  return Math.floor(Math.random() * (a.length-1))+1;
}
function placeRandom(){
  var adj1num = randomFromArray(adjectives);
  var adj2num = randomFromArray(adjectives);
  do {
    adj1num = randomFromArray(adjectives);
  } while(adj1num === adj2num);
  var adj1 = adjectives[adj1num].capitalize();
  var adj2 = adjectives[adj2num];
  var genre = genres[randomFromArray(genres)];
  var end = ends[randomFromArray(ends)];
  var result = adj1 + " & " + adj2 + " " + genre + " " + end;
  resultDiv.innerHTML = result;
  button.innerHTML = buttons[randomFromArray(buttons)];
  var three = Math.floor(Math.random() * 500);
  if (three < 100) {three = '0' + three;}
  else if (three < 10) {three = '00' + three}
  threedigits.innerHTML = three;
  countrycode.innerHTML = countries[randomFromArray(countries)];
  type.innerHTML = types[randomFromArray(types)];
}
$(document).ready(function(){
    resultDiv = document.getElementById("result");
    button = document.getElementById("button");
    threedigits = document.getElementById("threedigits");
    countrycode = document.getElementById("countrycode");
    type = document.getElementById("type");
    readData();
    // placeRandom();
});
