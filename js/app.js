// from https://gist.github.com/terrywbrady/a03b25fe42959b304b1e:

var data = null;
var adjectives = [];
var genres = [];
var ends = [];
function doData(json) {
    data = json.feed.entry;
}

function readData(parent) {
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
function placeRandom(){
  var adj1num = Math.floor(Math.random() * adjectives.length);
  var adj2num = Math.floor(Math.random() * adjectives.length);
  do {
    adj1num = Math.floor(Math.random() * adjectives.length);
  } while(adj1num === adj2num);
  var adj1 = adjectives[adj1num];
  var adj2 = adjectives[adj2num];
  var genre = genres[Math.floor(Math.random() * genres.length)]
  var end = ends[Math.floor(Math.random() * ends.length)]
  alert(adj1 + " and " + adj2 + " " + genre + " " + end)
}
$(document).ready(function(){
    readData($("#data"));
    placeRandom();

});
