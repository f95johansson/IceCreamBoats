var numbers = '0123456789';
var letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';


function generate(length) {
  if (length === undefined) {length = 32;}
  randomChars = numbers + letters;

  var string = '';
  var rn;
  for (i = 1; i <= length; i++) {
    string += randomChars.substring(rn = Math.floor(Math.random() * randomChars.length), rn + 1);
  }
}