// from https://gist.github.com/terrywbrady/a03b25fe42959b304b1e:

var data = null;
var adjectives = [];
var genres = [];
var ends = [];
var p;
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
        }
    }
}
function randomFromArray (a) {
  return Math.floor(Math.random() * a.length-1)+1;
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
  p.innerHTML = result;
}
$(document).ready(function(){
    p = document.getElementById("result");
    readData();
    placeRandom();
});
