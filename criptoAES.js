var password = [];
function $(id){
   return document.getElementById(id);
}
function expandPass(){
   $('pass').value.split('').forEach(element => {
      password.push(element.charCodeAt(0));
   });
}
function encrypt(){
   var text = $('text').value;
   expandPass();
   var counter;
   if($('counter').value.length == 0){
      counter = 1;
   }else{
      counter = parseInt($('counter').value, 10);
   }
   var textBytes = aesjs.utils.utf8.toBytes(text);
   var aesCtr = new aesjs.ModeOfOperation.ctr(password, new aesjs.Counter(counter));
   var encryptedBytes = aesCtr.encrypt(textBytes);
   $('hex').value = `${aesjs.utils.hex.fromBytes(encryptedBytes)}${('000000' + counter).slice(-6)}`;
}
function decrypt(){
   expandPass();
   var encryptedHex = $('hex').value;
   var counter = parseInt(encryptedHex.substring(encryptedHex.length - 6, encryptedHex.length), 10);
   var encryptedBytes = aesjs.utils.hex.toBytes(encryptedHex.substring(0, encryptedHex.length - 6));
   var aesCtr = new aesjs.ModeOfOperation.ctr(password, new aesjs.Counter(counter));
   var decryptedBytes = aesCtr.decrypt(encryptedBytes);
   $('text').value =  aesjs.utils.utf8.fromBytes(decryptedBytes);
}
