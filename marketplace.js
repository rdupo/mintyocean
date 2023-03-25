//init v3
const v3ContractAddress = "0x169b1CE420F585d8cB02f3b23240a5b90BA54C92";
const v3ContractAbi = [
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "owner",
        "type": "address"
      }
    ],
    "name": "balanceOf",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs":[
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "ownerOf",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
    {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "Transfer",
    "type": "event"
  },
  {"inputs": [
      {
        "internalType": "address",
        "name": "operator",
        "type": "address"
      },
      {
        "internalType": "bool",
        "name": "approved",
        "type": "bool"
      }
    ],
    "name": "setApprovalForAll",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];

//init marketplace
const contractAddress = "0x101F2256ba4db70F2659DC9989e0eAFb4Fd53829";
const contractAbi = [
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "initialPhunksAddress",
        "type": "address"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "previousOwner",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "newOwner",
        "type": "address"
      }
    ],
    "name": "OwnershipTransferred",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "address",
        "name": "account",
        "type": "address"
      }
    ],
    "name": "Paused",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "phunkIndex",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "value",
        "type": "uint256"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "fromAddress",
        "type": "address"
      }
    ],
    "name": "PhunkBidEntered",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "phunkIndex",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "value",
        "type": "uint256"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "fromAddress",
        "type": "address"
      }
    ],
    "name": "PhunkBidWithdrawn",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "phunkIndex",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "value",
        "type": "uint256"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "fromAddress",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "toAddress",
        "type": "address"
      }
    ],
    "name": "PhunkBought",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "phunkIndex",
        "type": "uint256"
      }
    ],
    "name": "PhunkNoLongerForSale",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "phunkIndex",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "minValue",
        "type": "uint256"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "toAddress",
        "type": "address"
      }
    ],
    "name": "PhunkOffered",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "address",
        "name": "account",
        "type": "address"
      }
    ],
    "name": "Unpaused",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "phunkIndex",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "minPrice",
        "type": "uint256"
      }
    ],
    "name": "acceptBidForPhunk",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "phunkIndex",
        "type": "uint256"
      }
    ],
    "name": "buyPhunk",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "phunkIndex",
        "type": "uint256"
      }
    ],
    "name": "enterBidForPhunk",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "phunkIndex",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "minSalePriceInWei",
        "type": "uint256"
      }
    ],
    "name": "offerPhunkForSale",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "phunkIndex",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "minSalePriceInWei",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "toAddress",
        "type": "address"
      }
    ],
    "name": "offerPhunkForSaleToAddress",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "owner",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "pause",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "paused",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "pendingWithdrawals",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "phunkBids",
    "outputs": [
      {
        "internalType": "bool",
        "name": "hasBid",
        "type": "bool"
      },
      {
        "internalType": "uint256",
        "name": "phunkIndex",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "bidder",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "value",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "phunkIndex",
        "type": "uint256"
      }
    ],
    "name": "phunkNoLongerForSale",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "phunksAddress",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "phunksOfferedForSale",
    "outputs": [
      {
        "internalType": "bool",
        "name": "isForSale",
        "type": "bool"
      },
      {
        "internalType": "uint256",
        "name": "phunkIndex",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "seller",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "minValue",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "onlySellTo",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "renounceOwnership",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "newPhunksAddress",
        "type": "address"
      }
    ],
    "name": "setPhunksContract",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "newOwner",
        "type": "address"
      }
    ],
    "name": "transferOwnership",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "unpause",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "withdraw",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "phunkIndex",
        "type": "uint256"
      }
    ],
    "name": "withdrawBidForPhunk",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];
let contract;
let signer; 
const provider = new ethers.providers.Web3Provider(window.ethereum, "goerli");

function connectWallet() {
  provider.send("eth_requestAccounts", []).then(() => {
    provider.listAccounts().then((accounts) => {
      signer = provider.getSigner(accounts[0]);
      contract = new ethers.Contract(
        contractAddress,
        contractAbi,
        signer
      );
      v3Contract = new ethers.Contract(
        v3ContractAddress,
        v3ContractAbi,
        signer
      );
    });
  }); 
  console.log('wallet connect attempted'); 
}

connectWallet();

// list
async function offerPhunkForSale() {
  /*need to update to if/else
  if (marketplace approved) {next}
  else {setApproval} */

  const setApproval = await v3Contract.setApprovalForAll(contractAddress, true);
  await setApproval.wait();

  const ethPrice = ethers.utils.parseEther(document.getElementById("sell-amt").value);
  const listPrice = parseInt(ethPrice._hex);
  const phunkId = document.getElementById("i-phunk-id").getAttribute("data-id");
  const listPromise = contract.offerPhunkForSale(phunkId, listPrice);
  await listPromise;
}

// delist
async function delistPhunk() {
  const phunkId = document.getElementById("i-phunk-id").getAttribute("data-id");
  const delistPromise = contract.phunkNoLongerForSale(phunkId);
  await delistPromise;
}

// accept bid
async function acceptBidForPhunk() {
  const setApproval = await v3Contract.setApprovalForAll(contractAddress, true);
  await setApproval.wait();
  const phunkId = document.getElementById("i-phunk-id").getAttribute("data-id");
  const c = await contract.phunkBids(phunkId).then(new Response);
  const bidPrice = c.value._hex;
  const acceptBidPromise = contract.acceptBidForPhunk(phunkId, bidPrice);
  await acceptBidPromise;
}

// buy
async function buyPhunk() {
  const phunkId = document.getElementById("i-phunk-id").getAttribute("data-id");
  const res = await contract.phunksOfferedForSale(phunkId).then(function(response) {
      return response;
    });
  const minVal = res['minValue']._hex
  const buyPhunkPromise = contract.buyPhunk(phunkId, {value: minVal});
  console.log(phunkId, ":", minVal);
  await buyPhunkPromise;
}

// place bid
async function bidOnPhunk() {
  const phunkId = document.getElementById("i-phunk-id").getAttribute("data-id");
  const ethBid = ethers.utils.parseEther(document.getElementById("bid-amt").value);
  const bidVal = parseInt(ethBid._hex);
  const enterBidPromise = contract.enterBidForPhunk(phunkId, {value: bidVal});
  await enterBidPromise;  
}


// cancel bid
async function cancelPhunkBid() {
  const phunkId = document.getElementById("i-phunk-id").getAttribute("data-id");
  const withdrawBidPromise = contract.withdrawBidForPhunk(phunkId);
  await withdrawBidPromise;
}

// withdraw eth
async function withdrawEth() {
  const withdrawEthPromise = contract.withdraw();
  await withdrawEthPromise;
}

// console log connected wallet balance
function logBal() {
  const network = 'goerli'
  const p = ethers.getDefaultProvider(network)
  const address = signer._address
  p.getBalance(address).then((balance) => {
   console.log(`balance: ${balance} WEI`)
  })  
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

is();