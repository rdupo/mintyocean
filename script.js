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
$('select').on('change', function() {
  var d = $(this).attr('id');
  var c = `${d}hide`
  var v = (this.value);
  var ul = document.getElementById("phunky-list");
  var li = ul.getElementsByClassName("phunk-wrapper");

  for (i = 0; i < li.length; i++) {
    var txtValue = li[i].getAttribute(d);
    var p = li[i]

    if (txtValue == v) {
      $(p).removeClass(c)

    } else {
      $(p).addClass(c); 
    }
  }
});

//clear trait filtering
function clr(x) {
  var f = $(x).parent().parent().children().first().attr('id');
  $('.phunk-wrapper').removeClass(`${f}hide`);
} 

//show details
function deets(x) {
  $('.attr').text('');
  $('#interact,#overlay').removeClass('hide-me');
  var d = "#" + x;
  var s = $(d).children(0).attr('src');
  var eye = $(d).attr('data-eyes');
  var sex = $(d).attr('data-sex');
  var lip = $(d).attr('data-lips');
  var hair = $(d).attr('data-hair');
  var ear = $(d).attr('data-ears');
  var emo = $(d).attr('data-emo');
  var bea = $(d).attr('data-beard');
  var face = $(d).attr('data-face');
  var mou = $(d).attr('data-mouth');
  var nec = $(d).attr('data-neck');
  var che = $(d).attr('data-cheeks');
  var nos = $(d).attr('data-nose');
  var tee = $(d).attr('data-teeth');
  
  $('.i-phunk-id').text('PHUNK ' + x);
  $('.i-phunk-img').attr('src',s);
  $('.i-sex').text('Sex: ' + sex);
  if (eye != 'None') {$('.i-eyes').text('Eyes: ' + eye)};
  if (lip != 'None') {$('.i-lips').text('Lips: ' + lip)};
  if (hair != 'None') {$('.i-hair').text('Hair: ' + hair)};
  if (ear != 'None') {$('.i-ears').text('Ears: ' + ear)};
  if (emo != 'None') {$('.i-emo').text('Emotion: ' + emo)};
  if (bea != 'None') {$('.i-beard').text('Beard: ' + bea)};
  if (face != 'None') {$('.i-face').text('Face: ' + face)};
  if (mou != 'None') {$('.i-mouth').text('Mouth: ' + mou)};
  if (nec != 'None') {$('.i-neck').text('Neck: ' + nec)};
  if (che != 'None') {$('.i-cheeks').text('Cheeks: ' + che)};
  if (nos != 'None') {$('.i-nose').text('Nose: ' + nos)};
  if (tee != 'None') {$('.i-teeth').text('Teeth: ' + tee)};
}
