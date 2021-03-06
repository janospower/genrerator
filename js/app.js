// from https://gist.github.com/terrywbrady/a03b25fe42959b304b1e:

var data = null;
var adjectives = [];
var genres = [];
var ends = [];
var buttons = [];
var countries = [];
var types = [];
var colors = [];
var firstCall = true;
var resultDiv,
    button,
    descriptionDiv,
    code,
    rating,
    twitterlink,
    sleeve,
    sticker;

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
          case 7:
            colors.push(val);
            break;
        }
    }
}

function randomFromArray (a) {
  return Math.floor(Math.random() * (a.length-1))+1;
}

function placeRandom(){
  // Result phrase:
  var adj1num = randomFromArray(adjectives);
  var adj2num = randomFromArray(adjectives);
  do {
    adj1num = randomFromArray(adjectives);
  } while(adj1num === adj2num);
  var adj1 = adjectives[adj1num].capitalize();
  var adj2 = adjectives[adj2num];
  adj2 = adj2.charAt(0).toLowerCase() + adj2.slice(1);
  var genre = genres[randomFromArray(genres)];
  var end = ends[randomFromArray(ends)];
  var result = adj1 + ", " + adj2 + ", " + genre + " " + end + ".";
  resultDiv.innerHTML = result;

  // Other random elements:
  if (!firstCall) {
    button.innerHTML = buttons[randomFromArray(buttons)];
  }
  var three = Math.floor(Math.random() * 500);
  if (three < 100) {three = '0' + three;}
  else if (three < 10) {three = '00' + three}
  threedigits.innerHTML = three;
  countrycode.innerHTML = countries[randomFromArray(countries)];
  type.innerHTML = types[randomFromArray(types)];
  rating.innerHTML = Math.floor(Math.random() * 10) + "." + Math.floor(Math.random() * 10);

  // Tweet:
  var url = 'http://janospauer.com/genrerator/'
  var message = '%E2%80%9C' + result + '%E2%80%9D %0A%E2%80%94 @JanosPauer %0A' + url;
  var t = 'http://twitter.com/intent/tweet?text=';
  // 'http://twitter.com/home?status='
  var tweet = t + message.replace(/ /g, "%20").replace("&", "and");

  // QR code:
  while (code.firstChild) {
    code.removeChild(code.firstChild);
  }
  new QRCode(code, {
  	text: tweet,
  	width: 160,
  	height: 160,
    correctLevel : QRCode.CorrectLevel.L
  });

  // Link:
  twitterlink.href=tweet;

  // Color:
  sleeve.style.backgroundColor = "hsl(" + colors[randomFromArray(colors)] + ", 89%, 71%)";

  // Sticker:
  sticker.style.transform = "rotate("+ ((Math.random()-0.5) * 1.5) +"deg) translate(-"+(Math.random() * 20)+"px,-"+(Math.random() * 20)+"px)";

  firstCall = false;
}

function toggler(onoff) {
    var element = document.getElementById("highlightMenu");
    if (onoff == 'on') {
      var resY = resultDiv.getBoundingClientRect().top;
      element.style.top = (resY-50)+'px';
      element.classList.add("highlightMenuActive");
      document.execCommand('copy');
    }
    else {
      element.classList.remove("highlightMenuActive");
      element.blur();
    }
}

$(document).ready(function(){
    resultDiv = document.getElementById("result");
    button = document.getElementById("button");
    threedigits = document.getElementById("threedigits");
    countrycode = document.getElementById("countrycode");
    type = document.getElementById("type");
    code = document.getElementById("qrcode");
    twitterlink = document.getElementById("twitterlink");
    rating = document.getElementById("rating");
    sleeve = document.getElementById("sleeve");
    sticker = document.getElementById("sticker");
    readData();
    placeRandom();
});
