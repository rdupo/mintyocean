var Cryptopunks = {};

Cryptopunks.NULL_ADDRESS = "0x0000000000000000000000000000000000000000";
Cryptopunks.AGREE_TO_TERMS = "_Cryptopunks_Agree_To_Terms";
Cryptopunks.TX_HASHES = "_Cryptopunks_Hashes";
Cryptopunks.TX_DIV_ID = "#pendingTransactions";
Cryptopunks.EVENT_START_BLOCK = 3914490;
Cryptopunks.ETHER_CONVERSION = {USD: 230.999999};

Cryptopunks.INFURA_ID = "418824fdf3d7419cba09b86bbdf059af"

Cryptopunks.currentPunkIndex = -1;

Cryptopunks.PunkState = {
    agreedToTermsStatus: 0, // 0 = not yet agreed, 1 = agreed, 2 = denied
    web3Queried: false,
    web3ready: false,
    web3UsingInfura: false,
    web3NotPresent: false,
    web3Modal: undefined,
    accountQueried: false,
    accountUnlocked: false,
    account: null,
    accountHasBalance: false,
    accountBalanceInWei: 0,
    accountBalanceInEther: 0,
    transactions: [],
    isOwned: true,
    isOwner: false,
    canBuy: false,
    forSale: false,
    hasBid: false,
    ownsBid: false,
    punkData: {
        loadComplete: false,
        punkIndex: -1,
        owner: Cryptopunks.NULL_ADDRESS,
        offerValue: 0,
        onlySellTo: Cryptopunks.NULL_ADDRESS,
        bidder: Cryptopunks.NULL_ADDRESS,
        bidValue: 0,
    },
    events: {
        allSorted: [],
        transfers: [],
        bids: [],
        bidsWithdrawn: [],
        bought: [],
        offeredForSale: [],
        claimed: []
    },
    loadingDone: {
        owner: false,
        bid: false,
        offer: false,
        eventsClaimed: false
    }
};

Cryptopunks.ABI = [{ "constant": true, "inputs": [], "name": "name", "outputs": [{"name": "", "type": "string", "value": "CRYPTOPUNKS"}], "payable": false, "type": "function"}, { "constant": true, "inputs": [{"name": "", "type": "uint256"}], "name": "punksOfferedForSale", "outputs": [{"name": "isForSale", "type": "bool", "value": false}, { "name": "punkIndex", "type": "uint256", "value": "0"}, { "name": "seller", "type": "address", "value": "0x0000000000000000000000000000000000000000"}, {"name": "minValue", "type": "uint256", "value": "0"}, { "name": "onlySellTo", "type": "address", "value": "0x0000000000000000000000000000000000000000"}], "payable": false, "type": "function"}, { "constant": false, "inputs": [{"name": "punkIndex", "type": "uint256"}], "name": "enterBidForPunk", "outputs": [], "payable": true, "type": "function"}, { "constant": true, "inputs": [], "name": "totalSupply", "outputs": [{"name": "", "type": "uint256", "value": "10000"}], "payable": false, "type": "function"}, { "constant": false, "inputs": [{"name": "punkIndex", "type": "uint256"}, {"name": "minPrice", "type": "uint256"}], "name": "acceptBidForPunk", "outputs": [], "payable": false, "type": "function"}, { "constant": true, "inputs": [], "name": "decimals", "outputs": [{"name": "", "type": "uint8", "value": "0"}], "payable": false, "type": "function"}, { "constant": false, "inputs": [{"name": "addresses", "type": "address[]"}, {"name": "indices", "type": "uint256[]"}], "name": "setInitialOwners", "outputs": [], "payable": false, "type": "function"}, { "constant": false, "inputs": [], "name": "withdraw", "outputs": [], "payable": false, "type": "function"}, { "constant": true, "inputs": [], "name": "imageHash", "outputs": [{ "name": "", "type": "string", "value": "ac39af4793119ee46bbff351d8cb6b5f23da60222126add4268e261199a2921b"}], "payable": false, "type": "function"}, { "constant": true, "inputs": [], "name": "nextPunkIndexToAssign", "outputs": [{"name": "", "type": "uint256", "value": "0"}], "payable": false, "type": "function"}, { "constant": true, "inputs": [{"name": "", "type": "uint256"}], "name": "punkIndexToAddress", "outputs": [{"name": "", "type": "address", "value": "0xc352b534e8b987e036a93539fd6897f53488e56a"}], "payable": false, "type": "function"}, { "constant": true, "inputs": [], "name": "standard", "outputs": [{"name": "", "type": "string", "value": "CryptoPunks"}], "payable": false, "type": "function"}, { "constant": true, "inputs": [{"name": "", "type": "uint256"}], "name": "punkBids", "outputs": [{"name": "hasBid", "type": "bool", "value": false}, { "name": "punkIndex", "type": "uint256", "value": "0"}, { "name": "bidder", "type": "address", "value": "0x0000000000000000000000000000000000000000"}, {"name": "value", "type": "uint256", "value": "0"}], "payable": false, "type": "function"}, { "constant": true, "inputs": [{"name": "", "type": "address"}], "name": "balanceOf", "outputs": [{"name": "", "type": "uint256", "value": "0"}], "payable": false, "type": "function"}, { "constant": false, "inputs": [], "name": "allInitialOwnersAssigned", "outputs": [], "payable": false, "type": "function"}, { "constant": true, "inputs": [], "name": "allPunksAssigned", "outputs": [{"name": "", "type": "bool", "value": true}], "payable": false, "type": "function"}, { "constant": false, "inputs": [{"name": "punkIndex", "type": "uint256"}], "name": "buyPunk", "outputs": [], "payable": true, "type": "function"}, { "constant": false, "inputs": [{"name": "to", "type": "address"}, {"name": "punkIndex", "type": "uint256"}], "name": "transferPunk", "outputs": [], "payable": false, "type": "function"}, { "constant": true, "inputs": [], "name": "symbol", "outputs": [{"name": "", "type": "string", "value": "Ï¾"}], "payable": false, "type": "function"}, { "constant": false, "inputs": [{"name": "punkIndex", "type": "uint256"}], "name": "withdrawBidForPunk", "outputs": [], "payable": false, "type": "function"}, { "constant": false, "inputs": [{"name": "to", "type": "address"}, {"name": "punkIndex", "type": "uint256"}], "name": "setInitialOwner", "outputs": [], "payable": false, "type": "function"}, { "constant": false, "inputs": [{"name": "punkIndex", "type": "uint256"}, { "name": "minSalePriceInWei", "type": "uint256"}, {"name": "toAddress", "type": "address"}], "name": "offerPunkForSaleToAddress", "outputs": [], "payable": false, "type": "function"}, { "constant": true, "inputs": [], "name": "punksRemainingToAssign", "outputs": [{"name": "", "type": "uint256", "value": "0"}], "payable": false, "type": "function"}, { "constant": false, "inputs": [{"name": "punkIndex", "type": "uint256"}, {"name": "minSalePriceInWei", "type": "uint256"}], "name": "offerPunkForSale", "outputs": [], "payable": false, "type": "function"}, { "constant": false, "inputs": [{"name": "punkIndex", "type": "uint256"}], "name": "getPunk", "outputs": [], "payable": false, "type": "function"}, { "constant": true, "inputs": [{"name": "", "type": "address"}], "name": "pendingWithdrawals", "outputs": [{"name": "", "type": "uint256", "value": "0"}], "payable": false, "type": "function"}, { "constant": false, "inputs": [{"name": "punkIndex", "type": "uint256"}], "name": "punkNoLongerForSale", "outputs": [], "payable": false, "type": "function"}, {"inputs": [], "payable": true, "type": "constructor"}, { "anonymous": false, "inputs": [{"indexed": true, "name": "to", "type": "address"}, { "indexed": false, "name": "punkIndex", "type": "uint256"}], "name": "Assign", "type": "event"}, { "anonymous": false, "inputs": [{"indexed": true, "name": "from", "type": "address"}, { "indexed": true, "name": "to", "type": "address"}, {"indexed": false, "name": "value", "type": "uint256"}], "name": "Transfer", "type": "event"}, { "anonymous": false, "inputs": [{"indexed": true, "name": "from", "type": "address"}, { "indexed": true, "name": "to", "type": "address"}, {"indexed": false, "name": "punkIndex", "type": "uint256"}], "name": "PunkTransfer", "type": "event"}, { "anonymous": false, "inputs": [{"indexed": true, "name": "punkIndex", "type": "uint256"}, { "indexed": false, "name": "minValue", "type": "uint256"}, {"indexed": true, "name": "toAddress", "type": "address"}], "name": "PunkOffered", "type": "event"}, { "anonymous": false, "inputs": [{"indexed": true, "name": "punkIndex", "type": "uint256"}, { "indexed": false, "name": "value", "type": "uint256"}, {"indexed": true, "name": "fromAddress", "type": "address"}], "name": "PunkBidEntered", "type": "event"}, { "anonymous": false, "inputs": [{"indexed": true, "name": "punkIndex", "type": "uint256"}, { "indexed": false, "name": "value", "type": "uint256"}, {"indexed": true, "name": "fromAddress", "type": "address"}], "name": "PunkBidWithdrawn", "type": "event"}, { "anonymous": false, "inputs": [{"indexed": true, "name": "punkIndex", "type": "uint256"}, { "indexed": false, "name": "value", "type": "uint256"}, {"indexed": true, "name": "fromAddress", "type": "address"}, { "indexed": true, "name": "toAddress", "type": "address"}], "name": "PunkBought", "type": "event"}, { "anonymous": false, "inputs": [{"indexed": true, "name": "punkIndex", "type": "uint256"}], "name": "PunkNoLongerForSale", "type": "event"}];

Vue.component('account-link', {
    props: ['account'],
    template: '<a v-bind:href="\'/cryptopunks/accountInfo?account=\'+account">{{ account.substring(0,8) }}</a>'
});

Vue.component('transaction-link', {
    props: ['hash'],
    template: '<a v-bind:href="\'https://etherscan.io/tx/\'+hash">{{hash.substring(0,8)}}</a>'
});

Vue.component('value-display', {
    data: function() {
        return {
            etherConversion: Cryptopunks.ETHER_CONVERSION
        };
    },
    props: ['amount', 'short'],
    computed: {
        valueStr: function() {
            var ether = web3.fromWei(this.amount, 'ether').toNumber();
            var usdVal = (ether * this.etherConversion.USD);
            var usdValStr = '$'+usdVal.toFixed(2);

            var fractionDigits = 2;
            if (this.short) fractionDigits = 0;

            var formatter = new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
                minimumFractionDigits: fractionDigits,
                maximumFractionDigits: fractionDigits,
            });
            if (formatter) {
                usdValStr = formatter.format(usdVal);
            }

            // The divide by 1 here removes trailing zeros
            if (this.short) {
                return '' + (ether.toPrecision(4) / 1) + ' (' + usdValStr + ')';
            } else {
                return '' + (ether.toPrecision(4) / 1) + ' ETH (' + usdValStr + ' USD)';
            }
        }
    },
    template: '<span>{{valueStr}}</span>'
});

$('.cryptopunks-vue').each(function () {
    var $el = $(this)

    new Vue({
        el: this,
        data: {
            state: Cryptopunks.PunkState
        },
    })
});

var panel1 = new Vue({
    el: '#ethereum_panels',
    data: {
        state: Cryptopunks.PunkState,
        agreeToTerms: "no",
        connectPanelHidden: false,
    },
    mounted() {
        if (localStorage.agreeToTerms) {
            this.agreeToTerms = localStorage.agreeToTerms;
        }
    },
    watch: {
        agreeToTerms(newVal) {
            localStorage.agreeToTerms = newVal;
        }
    },
    computed: {
        accountShort: function() {
            if (this.state.accountUnlocked) {
                return this.state.account.substring(0,10);
            } else {
                return "none";
            }
        },
        showFullPanel: function() {
            return !this.connectPanelHidden && this.state.accountUnlocked && this.agreeToTerms === 'yes';
        },
        showUnlockPanel: function() {
            return !this.state.accountUnlocked && this.agreeToTerms === 'yes';
        },
        showTermsPanel: function() {
            return this.agreeToTerms === 'no';
        },
        showNoMetamask: function() {
            return this.state.web3UsingInfura;
        }
    },
    methods: {
        userAgreeToTerms: function (event) {
            this.agreeToTerms = "yes";
            // localStorage.setItem(Cryptopunks.AGREE_TO_TERMS, "yes");
        },
        userRejectTerms: function (event) {
            this.agreeToTerms = "deny";
            // this.state.agreedToTermsStatus = 2;
            // localStorage.setItem(Cryptopunks.AGREE_TO_TERMS, "deny");
        },
        showConnectPanel: function () {
            this.connectPanelHidden = false;
        },
        hideConnectPanel: function () {
            this.connectPanelHidden = true;
        },
        clearTransactions: function(event) {
            event.preventDefault()
            event.stopPropagation()
            localStorage.setItem(Cryptopunks.TX_HASHES, JSON.stringify([]));
            Cryptopunks.PunkState.transactions = [];
        },
        navigateToAccount: function (event) {
            event.preventDefault()
            event.stopPropagation()
            window.location.href = '/cryptopunks/accountInfo?account=' + this.state.account
        }
    }
});

/*
var panel2 = new Vue({
    el: '#ethereum_no_account',
    data: {
        state: Cryptopunks.PunkState
    }
});

var panel3 = new Vue({
    el: '#ethereum_no_web3',
    data: {
        state: Cryptopunks.PunkState
    }
});
*/

window.addEventListener('DOMContentLoaded', async function() {

    const Web3Modal = window.Web3Modal.default
    const providerOptions = {
        walletconnect: {
            package: WalletConnectProvider.default, // required
            options: {
                infuraId: Cryptopunks.INFURA_ID,
                qrcodeModal: WalletConnectQRCodeModal.default,
            }
        }
    };

    const web3Modal = new Web3Modal({
        network: "mainnet", // optional
        cacheProvider: true, // optional
        providerOptions // required
    });

    Cryptopunks.web3Modal = web3Modal;
    if (!!web3Modal.cachedProvider) {
        console.log('connecting to cached provider => ', web3Modal.cachedProvider)
        const provider = await web3Modal.connectTo(web3Modal.cachedProvider)
        Cryptopunks.updateProvider(provider);
    }
    // Modern dapp browsers...
    else if (window.ethereum) {
        Cryptopunks.updateProvider(window.ethereum);
    }
    // Checking if Web3 has been injected by the browser (Mist/MetaMask)
    else if (typeof web3 !== 'undefined') {
        // Use MetaMask's provider
        Cryptopunks.updateProvider(web3.currentProvider)
    } else {
        console.log("No web3 present.");
        web3 = null;
        Cryptopunks.PunkState.web3NotPresent = true;
        // Cryptopunks.PunkState.web3UsingInfura = true;
    }
    Cryptopunks.PunkState.web3Queried = true;

    startApp();

    $(function () {
        $('[data-toggle="tooltip"]').tooltip()
    })
});

var startApp = function () {

    if (web3) {
        Cryptopunks.PunkState.web3ready = true;

        if (typeof cryptopunksContractLoadedCallback !== 'undefined' && Cryptopunks.PunkState.web3UsingInfura) {
            cryptopunksContractLoadedCallback();
        }

        Cryptopunks.restoreTransactions();
        setInterval(Cryptopunks.checkTransactions, 1000);

        $.get('https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD', function(data) {
            Cryptopunks.ETHER_CONVERSION.USD = data.USD;
            console.log("Value of ether now " + Cryptopunks.ETHER_CONVERSION.USD);
        })
    }

    if (typeof cryptopunksContractLoadedCallback !== 'undefined') {
        cryptopunksContractLoadedCallback();
    }
};

Cryptopunks.updateAccounts = () => {
    web3.eth.getAccounts((error, accounts) => {
        if (accounts.length === 0) {
            Cryptopunks.disconnect();
        } else if (accounts[0] !== Cryptopunks.PunkState.account) {
            console.log("Connected wallet address changed: " + accounts[0]);
            Cryptopunks.PunkState.account = accounts[0];
            web3.eth.defaultAccount = accounts[0];
            Cryptopunks.punkContract.defaultAccount = accounts[0];
            if (Cryptopunks.PunkState.account === undefined) {
                Cryptopunks.PunkState.accountUnlocked = false;
            } else {
                Cryptopunks.refreshPendingWidthdrawals();
                Cryptopunks.PunkState.accountUnlocked = true;
            }

            if (typeof cryptopunksContractLoadedCallback !== 'undefined') {
                cryptopunksContractLoadedCallback();
            }
        }
        Cryptopunks.PunkState.accountQueried = true;
    })
}

Cryptopunks.updateProvider = (provider) => {
    window.web3 = new Web3(provider);
    var contractAddress = "0xb47e3cd837dDF8e4c57F05d70Ab865de6e193BBB";
    var MyContract = web3.eth.contract(Cryptopunks.ABI);
    Cryptopunks.punkContract =
        MyContract.at(contractAddress);
    Cryptopunks.updateAccounts()

    // Subscribe to chainId change
    provider.on("accountsChanged", (accounts) => {
        console.log("accountsChanged", accounts);
        Cryptopunks.updateAccounts()
    });

    // Subscribe to chainId change
    provider.on("chainChanged", (chainId) => {
        //todo handle chain id change
        console.log("chainChanged", chainId);
    });

    // Subscribe to session disconnection
    // metamask does not fire this event, instead an accountsChanged with 0 accounts
    provider.on("disconnect", (code, reason) => {
        console.log("disconnect", code, reason);
        Cryptopunks.disconnect();
    });
}

Cryptopunks.disconnect = () => {
    Cryptopunks.web3Modal.clearCachedProvider();
    Cryptopunks.account = undefined;
    Cryptopunks.PunkState.accountUnlocked = false;
}

Cryptopunks.connectModal = async () => {
    const web3Modal = Cryptopunks.web3Modal;
    web3Modal.clearCachedProvider();

    const provider = await web3Modal.connect();

    Cryptopunks.updateProvider(provider)
}

var allEventsContainsEvent = function(item) {
    for (var i = 0; i < Cryptopunks.PunkState.events.allSorted.length; i++) {
        var obj = Cryptopunks.PunkState.events.allSorted[i];
        if (obj.transactionHash === item.transactionHash) {
            return true;
        }
        if (item.blockNumber > obj.blockNumber) {
            // No need to lok any further
            return false;
        }
    }
    return false;
};

Cryptopunks.addToAllEvents = function(event) {
    if (!allEventsContainsEvent(event)) {
        Cryptopunks.PunkState.events.allSorted.push(event);
        Cryptopunks.PunkState.events.allSorted.sort(function (a, b) {
            return b.blockNumber - a.blockNumber;
        })
    }
};

Cryptopunks.loadPunkData = function(index) {
    console.log("In show punk actions.");
    Cryptopunks.currentPunkIndex = index;
    Cryptopunks.PunkState.punkData.punkIndex = index;
    // var index = Cryptopunks.currentPunkIndex;
    var address = Cryptopunks.PunkState.account;
    console.log("Local address='" + address + "'");
    Cryptopunks.punkContract.punkIndexToAddress(index, function(error, result){
        if(!error) {
            console.log("Owner: '" + result + "'");
            Cryptopunks.PunkState.punkData.owner = result;
            if (address == result) {
                console.log(" - Is owner!");
                Cryptopunks.PunkState.isOwner = true;
            } else {
                Cryptopunks.PunkState.isOwner = false;
                console.log(" - Is not owner.");
            }

            Cryptopunks.PunkState.loadingDone.owner = true;
        } else {
            console.log(error);
        }
    });

    Cryptopunks.punkContract.punksOfferedForSale(index, function (error, result) {
        if (!error) {
            Cryptopunks.PunkState.forSale = result[0];
            if (result[0]) {
                Cryptopunks.PunkState.punkData.offerValue = result[3];
                Cryptopunks.PunkState.punkData.onlySellTo = result[4];
                console.log("Punk for sale for " + Cryptopunks.PunkState.punkData.offerValue + " to " + Cryptopunks.PunkState.punkData.onlySellTo);
            }
            if (Cryptopunks.NULL_ADDRESS == result[4] || result[4] == address) {
                Cryptopunks.PunkState.canBuy = true;
            } else {
                Cryptopunks.PunkState.canBuy = false;
            }
            console.log(result);

            Cryptopunks.PunkState.loadingDone.offer = true;
        } else {
            console.log(error);
        }
    });

    Cryptopunks.punkContract.punkBids(index, function(error, result){
        if(!error) {
            Cryptopunks.PunkState.hasBid = result[0];
            if (Cryptopunks.PunkState.hasBid) {
                Cryptopunks.PunkState.punkData.bidder = result[2];
                Cryptopunks.PunkState.punkData.bidValue = result[3];
                Cryptopunks.PunkState.ownsBid = result[2].toLowerCase() === address?.toLowerCase();
            } else {
                Cryptopunks.PunkState.ownsBid = false;
            }
            console.log(result);
            Cryptopunks.PunkState.loadingDone.bid = true;
        } else {
            console.log(error);
        }
    });

    if (!Cryptopunks.PunkState.web3UsingInfura) {
        // Transfer events don't filter properly because punkIndex isn't indexed in the event, so just get em all :/
        var transferEvents = Cryptopunks.punkContract.PunkTransfer({punkIndex: Cryptopunks.currentPunkIndex},
            {fromBlock: Cryptopunks.EVENT_START_BLOCK, toBlock: 'latest'},
            function (error, log) {
                // console.log("Transfer event for punk index: " + log.args.punkIndex);
                if (log.args.punkIndex == Cryptopunks.currentPunkIndex) {
                    console.log("Found transfer event for this punk.")
                    Cryptopunks.PunkState.events.transfers.push(log);
                    Cryptopunks.addToAllEvents(log);
                }
            });

        var bidEvent = Cryptopunks.punkContract.PunkBidEntered({punkIndex: Cryptopunks.currentPunkIndex},
            {fromBlock: Cryptopunks.EVENT_START_BLOCK, toBlock: 'latest'});
        var allBidEvents = bidEvent.get(function (error, logs) {
            for (var i = 0; i < logs.length; i++) {
                var log = logs[i];
                if (log.args.punkIndex == Cryptopunks.currentPunkIndex) {
                    console.log("Loaded bid event for this punk: " + log.args.value);
                    Cryptopunks.PunkState.events.bids.push(log);
                    Cryptopunks.addToAllEvents(log);
                }
            }

            // Now that we have bid events, can load punk bought events and correct values
            var soldEvents = Cryptopunks.punkContract.PunkBought({punkIndex: Cryptopunks.currentPunkIndex},
                {fromBlock: Cryptopunks.EVENT_START_BLOCK, toBlock: 'latest'},
                function (error, log) {
                    // console.log("Transfer event for punk index: " + log.args.punkIndex);
                    if (log.args.punkIndex == Cryptopunks.currentPunkIndex) {
                        console.log("Found bought for punk " + log.args.punkIndex);
                        if (log.args.value.isZero()) {
                            console.log("  Incorrect value, need to correct.");
                            var thisBlockNum = log.blockNumber;
                            for (var i = Cryptopunks.PunkState.events.bids.length - 1; i >= 0; i--) {
                                var bid = Cryptopunks.PunkState.events.bids[i];
                                if (bid.blockNumber < thisBlockNum) {
                                    console.log("  Found bid for event.");
                                    log.args.value = bid.args.value;
                                    log.args.toAddress = bid.args.fromAddress;
                                    break;
                                }
                            }
                        }
                        Cryptopunks.PunkState.events.bought.push(log);
                        Cryptopunks.addToAllEvents(log);
                    }
                });

        });
        var bidEvents = Cryptopunks.punkContract.PunkBidEntered().watch(
            function (error, log) {
                if (log.args.punkIndex == Cryptopunks.currentPunkIndex) {
                    console.log("Found new bid event for this punk.");
                    Cryptopunks.PunkState.events.bids.push(log);
                    Cryptopunks.addToAllEvents(log);
                }
            });

        var bidWidthdrawnEvents = Cryptopunks.punkContract.PunkBidWithdrawn({punkIndex: Cryptopunks.currentPunkIndex},
            {fromBlock: Cryptopunks.EVENT_START_BLOCK, toBlock: 'latest'},
            function (error, log) {
                if (log.args.punkIndex == Cryptopunks.currentPunkIndex) {
                    console.log("Found bid withdrawn event for this punk.")
                    Cryptopunks.PunkState.events.bidsWithdrawn.push(log);
                    Cryptopunks.addToAllEvents(log);
                }
            });

        var offeredForSaleEvents = Cryptopunks.punkContract.PunkOffered({punkIndex: Cryptopunks.currentPunkIndex},
            {fromBlock: Cryptopunks.EVENT_START_BLOCK, toBlock: 'latest'},
            function (error, log) {
                if (log.args.punkIndex == Cryptopunks.currentPunkIndex) {
                    console.log("Found punk offer event for this punk.");
                    Cryptopunks.PunkState.events.offeredForSale.push(log);
                    Cryptopunks.addToAllEvents(log);
                }
            });

        var claimEvents = Cryptopunks.punkContract.Assign({punkIndex: Cryptopunks.currentPunkIndex},
            {fromBlock: Cryptopunks.EVENT_START_BLOCK, toBlock: 'latest'},
            function (error, log) {
                if (log.args.punkIndex == Cryptopunks.currentPunkIndex) {
                    console.log("Found claimed event for this punk.");
                    Cryptopunks.PunkState.events.claimed.push(log);
                    Cryptopunks.addToAllEvents(log);
                }

                Cryptopunks.PunkState.loadingDone.eventsClaimed = true;
            });

    } else {
        console.log("Not loading punk events because current web3 doesn't support it.")
        Cryptopunks.PunkState.loadingDone.eventsClaimed = true;
    }
};

Cryptopunks.refreshPendingWidthdrawals = function() {
    Cryptopunks.punkContract.pendingWithdrawals(Cryptopunks.PunkState.account, function(error, result) {
        if (!error) {
            Cryptopunks.PunkState.accountBalanceInWei = result;
            Cryptopunks.PunkState.accountBalanceInEther = web3.fromWei(result, 'ether').toNumber();
            if (!result.isZero()) {
                Cryptopunks.PunkState.accountHasBalance = true;
            } else {
                Cryptopunks.PunkState.accountHasBalance = false;
            }
            console.log("Pending balance: " + result);
        } else {
            console.log(error);
        }
    });
};

Cryptopunks.restoreTransactions = function() {
    var storedData = localStorage.getItem(Cryptopunks.TX_HASHES);
    var items = [];
    if (storedData) {
        items = JSON.parse(storedData);
    }
    console.log("Restored transactions from local storage, length: "+items.length);
    Cryptopunks.PunkState.transactions = items;

    // Clear content
/*
    for (i = 0; i < items.length; i++) {
        var item = items[i];
        Cryptopunks.showTransaction(item);
    }
*/
};

Cryptopunks.showTransaction = function(transaction) {
    var div = $(Cryptopunks.TX_DIV_ID);
    if (transaction.failed) {
        div.append('<p id="' + transaction.hash + '">' + transaction.name + ' <i>failed</i>.</p>');
    } else {
        div.append('<p id="' + transaction.hash + '"><a href="https://etherscan.io/tx/' + transaction.hash + '">' + transaction.name + '</a> <i>pending</i>.</p>');
    }

};

Cryptopunks.trackTransaction = function(name, index, hash) {
    var storedData = localStorage.getItem(Cryptopunks.TX_HASHES);
    var hashes = [];
    if (storedData) {
        hashes = JSON.parse(storedData);
    }
    var transaction = {
        'name' : name,
        'hash' : hash,
        'index' : index,
        'pending' : true
    };
    hashes.push(transaction);
    localStorage.setItem(Cryptopunks.TX_HASHES, JSON.stringify(hashes));
    Cryptopunks.PunkState.transactions = hashes;
    // Cryptopunks.showTransaction(transaction);
};

Cryptopunks.showFailure = function(name, index) {
    var transaction = {
        'name' : name,
        'hash' : '0x0',
        'index' : index,
        'pending' : false,
        'failed' : true
    };
    Cryptopunks.PunkState.transactions.push(transaction);
    // Cryptopunks.showTransaction(transaction);
};

Cryptopunks.checkTransactions = function() {
    // console.log("Checking transactions...");
    var storedData = localStorage.getItem(Cryptopunks.TX_HASHES);
    var items = [];
    if (storedData) {
        items = JSON.parse(storedData);
    }
    Cryptopunks.PunkState.transactions = items;
    // Clear content
    for (i = 0; i < items.length; i++) {
        var item = items[i];
        if (item.pending) {
            web3.eth.getTransaction(item.hash, function (error, result) {
                if (!error) {
                    if (result) {
                        // console.log(result);
                        if (result.blockNumber) {
                            // Completed.
                            // $('#' + item.hash + ' i').text("completed");
                            item.pending = false;
                            if (item.index >= 0) {
                                console.log("Reloading pending withdrawals...");
                                Cryptopunks.refreshPendingWidthdrawals();
                                if (Cryptopunks.currentPunkIndex == item.index) {
                                    console.log("Reloading punk data...");
                                    Cryptopunks.loadPunkData(Cryptopunks.currentPunkIndex);
                                }
                            }
                            localStorage.setItem(Cryptopunks.TX_HASHES, JSON.stringify(items));
                        }
                    }
                } else {
                    console.log(error);
                    console.log("Failure.");
                }
            });
        } else {
            // items.splice(i, 1);
            // i--;
        }
    }
    localStorage.setItem(Cryptopunks.TX_HASHES, JSON.stringify(items));
};

Cryptopunks.testAjax = function() {
    console.log("About to reload.");
    $.ajax({

        url : "/cryptopunks/reloadpunk?punkIndex=" + 2000 + "&sinceBlockNum=" + 4009295,
        type : 'GET',
        data : {
        },
        dataType:'text',
        success : function(data) {
            console.log("Reloaded.");
            location.reload(true);
        },
        error : function(request,error)
        {
            console.log("Reload error.");
        }
    });

}

Cryptopunks.buyPunk = function(index, price) {
    Cryptopunks.punkContract.buyPunk(index, {gas: 200000, value: price}, function(error, result) {
        if(!error) {
            console.log(result);
            console.log("Success!");
            Cryptopunks.trackTransaction("Buy " + index, index, result);
        } else {
            console.log(error);
            console.log("Failure.");
        }
    });
    return true;
};

Cryptopunks.offerPunkForSale = function(index, amount) {
    console.log("Offering to sale to anyone");
    if (!amount || amount == 0) {
        return false;
    }
    Cryptopunks.punkContract.offerPunkForSale(index, amount, {gas: 200000}, function(error, result) {
        if(!error) {
            console.log(result);
            console.log("Success!");
            Cryptopunks.trackTransaction("Offer " + index, index, result);
        } else {
            console.log(error);
            console.log("Failure.");
            Cryptopunks.showFailure("Offer " + index, index);
        }
    });
    return true;
};

Cryptopunks.offerPunkForSaleToAddress = function(index, amount, address) {
    if (!amount || amount == 0) {
        return false;
    }
    if (address) {
        console.log("Offering to sale to address '" + address + "'");
        Cryptopunks.punkContract.offerPunkForSaleToAddress(index, amount, address, {
            gas: 200000
        }, function (error, result) {
            if (!error) {
                console.log(result);
                console.log("Success!");
                Cryptopunks.trackTransaction("Offer " + index, index, result);
            } else {
                console.log(error);
                console.log("Failure.");
                Cryptopunks.showFailure("Offer " + index, index);
            }
        });
    } else {
        Cryptopunks.offerPunkForSale(index, amount);
    }
    return true;
};

Cryptopunks.punkNoLongerForSale = function(index) {
    Cryptopunks.punkContract.punkNoLongerForSale(index, {gas: 200000}, function(error, result) {
        if(!error) {
            console.log(result);
            console.log("Success!");
            Cryptopunks.trackTransaction("Remove Offer for " + index, index, result);
        } else {
            console.log(error);
            console.log("Failure.");
            Cryptopunks.showFailure("Remove Offer for " + index, index);
        }
    });
    return true;
};

Cryptopunks.transferPunk = function(index, address) {
    if (!address || !address.startsWith("0x")) {
        return false;
    }
    Cryptopunks.punkContract.transferPunk(address, index, {gas: 200000}, function(error, result) {
        if(!error) {
            console.log(result);
            console.log("Success!");
            Cryptopunks.trackTransaction("Transfer " + index, index, result);
        } else {
            console.log(error);
            console.log("Failure.");
            Cryptopunks.showFailure("Transfer " + index, index);
        }
    });
    return true;
};

Cryptopunks.enterBidForPunk = function(index, amount) {
    // todo - do data validation: do they own the punk, is the bid amount enough to beat an existing bid, etc.
    Cryptopunks.punkContract.enterBidForPunk(index, {gas: 200000, value: amount}, function(error, result) {
        if(!error) {
            console.log(result);
            console.log("Success!");
            Cryptopunks.trackTransaction("Bid on " + index, index, result);
        } else {
            console.log(error);
            console.log("Failure.");
            Cryptopunks.showFailure("Bid on " + index, index);
        }
    });
    return true;
};

Cryptopunks.acceptBidForPunk = function(index, amount) {
    if (amount.isZero()) {
        console.log("Error: Amount too low for accept bid.");
        return false;
    }
    console.log("Accepting bid for " + index + " for " + amount);
    Cryptopunks.punkContract.acceptBidForPunk(index, amount.toString(), {gas: 200000}, function(error, result) {
        if(!error) {
            console.log(result);
            console.log("Success!");
            Cryptopunks.trackTransaction("Accept bid for " + index, index, result);
        } else {
            console.log(error);
            console.log("Failure.");
            Cryptopunks.showFailure("Accept bid for " + index, index);
        }
    });
    return true;
};

Cryptopunks.withdrawBidForPunk = function(index) {
    Cryptopunks.punkContract.withdrawBidForPunk(index, {gas: 200000}, function(error, result) {
        if(!error) {
            console.log(result);
            console.log("Success!");
            Cryptopunks.trackTransaction("Withdraw bid on " + index, index, result);
        } else {
            console.log(error);
            console.log("Failure.");
            Cryptopunks.showFailure("Withdraw bid on " + index, index);
        }
    });
    return true;
};

Cryptopunks.withdraw = function() {
    Cryptopunks.punkContract.withdraw({gas: 200000}, function(error, result) {
        if(!error) {
            console.log(result);
            console.log("Success!");
            Cryptopunks.trackTransaction("Withdraw ETH", -1, result);
        } else {
            console.log(error);
            console.log("Failure.");
            Cryptopunks.showFailure("Withdraw ETH", -1);
        }
        Cryptopunks.refreshPendingWidthdrawals();
    });
    return true;
};

Cryptopunks.createTestTransaction = function () {
    Cryptopunks.trackTransaction("Withdraw ETH", -1, "0x62d2e282e26ab1ade314d06a2b835ba227a78d75cf3ca5de77ed15843d05aafa");
}

Cryptopunks.signMessage = function(msg) {
    signMsgPersonal(msg, Cryptopunks.PunkState.account);
    // signMsg(msgParams, Cryptopunks.PunkState.account);
}

function signMsgPersonal(msg, from) {
    web3.currentProvider.request({
        method: 'personal_sign',
        params: [msg, from],
        from: from,
    })
    .then(result => {
        const signedMessage = result;
        console.log("Signed message: " + signedMessage);
        window.location.href = "/cryptopunks/verifySignature?signedMessage="+signedMessage+"&origMessage="+msg;
    })
    .catch(error => {
        console.error('error signing message:');
        console.error(error);
    });
}

function signMsgTyped(msgParams, from) {
    web3.currentProvider.sendAsync({
        method: 'eth_signTypedData',
        params: [msgParams, from],
        from: from,
    }, function (err, result) {
        if (err) return console.error(err)
        if (result.error) {
            return console.error(result.error.message)
        }
        console.log("Signed message: "+result.result);
        window.location.href = "/cryptopunks/verifySignature?signedMessage="+result.result+"&origMessage="+JSON.stringify(msgParams);
    })
}