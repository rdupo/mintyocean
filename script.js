//filter by id
function pp() {
  var input, filter, ul, li, a, i, txtValue;
  input = document.getElementById("id");
  filter = input.value;
  ul = document.getElementById("phunky-list");
  li = ul.getElementsByClassName("phunk-id");

  for (i = 0; i < li.length; i++) {
    txtValue = li[i].innerText;
    console.log(txtValue);
    if (txtValue.indexOf(filter) > -1) {
      li[i].parentNode.style.display = "";
      /*if (li[i].parentNode.classList.contains('hide-me')) {
        li[i].parentNode.classList.remove('hide-me');
      }*/
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
      /*if (p.classList.contains('hide-me')) {
        p.classList.remove('hide-me');
      }*/
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

//load next 1k phunks
function loadp(x) {
  var b = 'b' + x;
  console.log(b);
  var p = document.getElementsByClassName(b);
  [].forEach.call(p, function(el){
      el.classList.remove('hide-me');
  });
  var xn = x + 1
  document.getElementById('lmp').setAttribute('onclick',`loadp(${xn});`);
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
  var eye = d.getAttribute('data-eyes').replace(/-/g,' ');
  var sex = d.getAttribute('data-sex').replace(/-/g,' ');
  var lip = d.getAttribute('data-lips').replace(/-/g,' ');
  var hair = d.getAttribute('data-hair').replace(/-/g,' ');
  if(hair == 'Do rag') {var hair = 'Do-rag';};
  var ear = d.getAttribute('data-ears').replace(/-/g,' ');
  var emo = d.getAttribute('data-emo').replace(/-/g,' ');
  var bea = d.getAttribute('data-beard').replace(/-/g,' ');
  var face = d.getAttribute('data-face').replace(/-/g,' ');
  var mou = d.getAttribute('data-mouth').replace(/-/g,' ');
  var nec = d.getAttribute('data-neck').replace(/-/g,' ');
  var che = d.getAttribute('data-cheeks').replace(/-/g,' ');
  var nos = d.getAttribute('data-nose').replace(/-/g,' ');
  var tee = d.getAttribute('data-teeth').replace(/-/g,' ');
  document.getElementById('i-phunk-id').textContent=Content='PHUNK #' + x;
  document.getElementById('i-phunk-id').setAttribute('data-id',x);
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

  async function btns() {
    const a = await contract.phunksOfferedForSale(x).then(new Response);
    const b = await v3Contract.ownerOf(x).then(new Response);
    const c = await contract.phunkBids(x).then(new Response);

    if(b == signer._address && a.isForSale == 0){show('sellBtn')};    
    if(b == signer._address && a.isForSale == 1) {show('delist')};
    if(b == signer._address && c.hasBid == 1) {show('acceptBtn')};

    if(b != signer._address) {show('pBid')};
    if(b != signer._address && a.isForSale == 1) {show('buyBtn')};
    if(signer._address == c.bidder && c.hasBid == 1) {show('cBid')};

    const bid = ethers.utils.formatEther(parseInt(c.value._hex));
    const pri = ethers.utils.formatEther(parseInt(a.minValue._hex));
    if(c.hasBid){document.getElementById('bid').textContent='Top Bid: ' + bid + 'Ξ'}
    if (a.isForSale){document.getElementById('price').textContent='Price: ' + pri + 'Ξ'}

    document.getElementById('curOwner').textContent='Owner: ' + b;
    if (c.hasBid){
      document.getElementById('topBidder').textContent='High Bidder: ' + c.bidder;
      document.getElementById('topBidder').classList.remove('hide-me');
    }
  }; 
  btns();
}

function togl(x) {
  for (i = 0; i < x.length; i++) {
      document.getElementById(x[i]).classList.toggle('hide-me');;
  }
}

//sort phunks
function ar() {
  var s = document.getElementById('sort').value.substr(1,1);
  var t = document.getElementById('sort').value.substr(0,1);
  var mylist = document.getElementById('phunky-list');
  var divs = mylist.getElementsByClassName('phunk-wrapper');
  var listitems = [];
  for (i = 0; i < divs.length; i++) {
          listitems.push(divs.item(i));
  }
  listitems.sort(function(a, b) {
      if (t == 'i') {
        var compA = a.children[0].getAttribute('src');
        var compB = b.children[0].getAttribute('src');
      }
      else if (t == 't') {
        var compA = a.getAttribute('data-traits');
        var compB = b.getAttribute('data-traits');
      }
      else {
        var compA = Number(a.getAttribute('data-price'));
        var compB = Number(b.getAttribute('data-price'));
      }
      if(s == 'd') { return (compA > compB) ? -1 : (compA < compB) ? 1 : 0;}
      else {return (compA <  compB) ? -1 : (compA > compB) ? 1 : 0;}
  });
  for (i = 0; i < listitems.length; i++) {
      mylist.appendChild(listitems[i]);
  }
  is(); 
}

//init sort
function is(){
  var mylist = document.getElementById('phunky-list');
  var divs = mylist.getElementsByClassName('phunk-wrapper');
  var listitems = [];
  for (i = 0; i < divs.length; i++) {
          listitems.push(divs.item(i));
  }
  listitems.sort(function(a, b) {
      if (Number(a.getAttribute('data-price')) <= 0) { var compA = 0;}
      else {var compA = 1;}

      if (Number(b.getAttribute('data-price')) <= 0) {var compB = 0;}
      else {var compB = 1;}

      return (compA > compB) ? -1 : (compA < compB) ? 1 : 0;
  });
  for (i = 0; i < listitems.length; i++) {
      mylist.appendChild(listitems[i]);
  } 
}

//clear bid
function cbid() {
  document.getElementById('bid-amt').value = '';
  document.getElementById('sell-amt').value = '';
}

//show els
function show(q) {
  document.getElementById(q).classList.remove('hide-me');
}

//hide bid
function hbid() {
  x = ['bidding','bid-amt','bid-amt-l','listing','sell-amt','sell-amt-l','sellBtn', 'delist', 'acceptBtn', 'pBid', 'buyBtn','cBid','topBidder','curOwner'];
  for (i in x) {
      document.getElementById(x[i]).classList.add('hide-me');
  }
}

if (!document.URL.includes('ms-links') && !document.URL.includes('my-phunks')) {is();}