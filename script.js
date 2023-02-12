//filter by id
function pp() {
  var input, filter, ul, li, a, i, txtValue;
  input = document.getElementById("id");
  filter = input.value;
  ul = document.getElementById("phunky-list");
  li = ul.getElementsByTagName("p");

  for (i = 0; i < li.length; i++) {
    txtValue = li[i].innerText;
    if (txtValue.indexOf(filter) > -1) {
      li[i].parentNode.style.display = "";
    } else {
      li[i].parentNode.style.display = "none";
    }
  }
}

//reset trait filer selection
function reset(x) {
      var selectElement = document.getElementById(x)
        selectElement.selectedIndex = 0;
}

//trait filtering 
function af(d) {
  var c = d.concat('hide');
  var v = document.getElementById(d).value;
  var ul = document.getElementById("phunky-list");
  var li = ul.getElementsByClassName("phunk-wrapper");

  for (i = 0; i < li.length; i++) {
    var txtValue = li[i].getAttribute(d);
    var p = li[i]

    if (txtValue == v) {
      p.classList.remove(c);

    } else {
      p.classList.add(c); 
    }
  }
};

//clear trait filtering
function clr(x) {
  var i = document.getElementById(x);
  var f = i.parentElement.parentElement.firstElementChild.getAttribute('id');
  var elems = document.getElementsByClassName('phunk-wrapper');
  [].forEach.call(elems, function(el) {
      el.classList.remove(f.concat('hide'));
  });
} 

//show details
function deets(x) {
  var elems = document.getElementsByClassName('attr');
  [].forEach.call(elems, function(el) {
      el.textContent=Content='';
  });
  document.getElementById('interact').classList.remove('hide-me');
  document.getElementById('overlay').classList.remove('hide-me');
  var d = document.getElementById(x);
  var s = d.firstElementChild.getAttribute('src');
  var eye = d.getAttribute('data-eyes');
  var sex = d.getAttribute('data-sex');
  var lip = d.getAttribute('data-lips');
  var hair = d.getAttribute('data-hair');
  var ear = d.getAttribute('data-ears');
  var emo = d.getAttribute('data-emo');
  var bea = d.getAttribute('data-beard');
  var face = d.getAttribute('data-face');
  var mou = d.getAttribute('data-mouth');
  var nec = d.getAttribute('data-neck');
  var che = d.getAttribute('data-cheeks');
  var nos = d.getAttribute('data-nose');
  var tee = d.getAttribute('data-teeth');
  document.getElementById('i-phunk-id').textContent=Content='PHUNK ' + x;
  document.getElementById('i-phunk-img').setAttribute('src',s);
  document.getElementById('i-sex').textContent=Content = 'Sex: ' + sex;
  if (eye != 'None') {document.getElementById('i-eyes').textContent='Eyes: ' + eye};
  if (lip != 'None') {document.getElementById('i-lips').textContent='Lips: ' + lip};
  if (hair != 'None') {document.getElementById('i-hair').textContent='Hair: ' + hair};
  if (ear != 'None') {document.getElementById('i-ears').textContent='Ears: ' + ear};
  if (emo != 'None') {document.getElementById('i-emo').textContent='Emotion: ' + emo};
  if (bea != 'None') {document.getElementById('i-beard').textContent='Beard: ' + bea};
  if (face != 'None') {document.getElementById('i-face').textContent='Face: ' + face};
  if (mou != 'None') {document.getElementById('i-mouth').textContent='Mouth: ' + mou};
  if (nec != 'None') {document.getElementById('i-neck').textContent='Neck: ' + nec};
  if (che != 'None') {document.getElementById('i-cheeks').textContent='Cheeks: ' + che};
  if (nos != 'None') {document.getElementById('i-nose').textContent='Nose: ' + nos};
  if (tee != 'None') {document.getElementById('i-teeth').textContent='Teeth: ' + tee};
}

function hide() {
document.getElementById('interact').classList.add('hide-me'); 
document.getElementById('overlay').classList.add('hide-me');
}

function togs() {
  document.getElementById('view').classList.toggle('hide-me');
  document.getElementById('hide').classList.toggle('hide-me');
  document.getElementById('filters').classList.toggle('hide-me');
}