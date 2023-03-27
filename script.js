//Setup
/*import { Network, Alchemy } from 'alchemy-sdk';

const settings = {
    apiKey: "Xq9-5SRgOVU_UxK6uHdIk-oNvvO_n1iZ",
    network: Network.ETH_GOERLI,
};

const alchemy = new Alchemy(settings);*/

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
  var da = ['data-eyes','data-sex','data-lips','data-hair','data-ears','data-nose','data-emo','data-beard','data-face','data-mouth','data-neck','data-cheeks','data-teeth'];
  
  for(i = 0; i < da.length; i++) {
    if(!!d.getAttribute(da[i])) {
      console.log(da[i]); //delete me
      var at = da[i].substr(5);
      var dav = d.getAttribute(da[i]).replace(/-/g,' ');
      if(dav == 'Do rag') {var dav = 'Do-rag';};
      var dadiv = 'i-'+at;
      console.log(at, dav, dadiv.toLowerCase()); //delete me
      document.getElementById(dadiv.toLowerCase()).textContent = at+': ' + dav;
    }
  };
  document.getElementById('i-phunk-id').textContent=Content='PHUNK #' + x;
  document.getElementById('i-phunk-id').setAttribute('data-id',x);
  document.getElementById('i-phunk-img').setAttribute('src',s); 

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

//clear bid
function cbid() {
  document.getElementById('bid-amt').value = '';
  document.getElementById('sell-amt').value = '';
  document.getElementById('curOwner').innerText = '';  
}

//show els
function show(q) {
  document.getElementById(q).classList.remove('hide-me');
}

//hide bid
function hbid() {
  x = ['bidding','bid-amt','bid-amt-l','listing','sell-amt','sell-amt-l','sellBtn', 'delist', 'acceptBtn', 'pBid', 'buyBtn','cBid','topBidder'];
  for (i in x) {
      document.getElementById(x[i]).classList.add('hide-me');
  }
}
