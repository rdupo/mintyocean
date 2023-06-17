// Setup: npm install alchemy-sdk
const { Network, Alchemy } = require("alchemy-sdk");

// Optional Config object, but defaults to demo api-key and eth-mainnet.
const settings = {
  apiKey: "Xq9-5SRgOVU_UxK6uHdIk-oNvvO_n1iZ", // Replace with your Alchemy API Key.
  network: Network.ETH_GOERLI, // Replace with your network.
};

const alchemy = new Alchemy(settings);
let slist = [];
const main = async () => {    
    let owner  = "0xE67B73e657B02816487b2D99D399C88ca6EB9C85";
    let contractAddress = "0x169b1CE420F585d8cB02f3b23240a5b90BA54C92";
    const nfts = await alchemy.nft.getNftsForOwner(owner, {
      contractAddresses: [contractAddress],
    });

    let q = nfts.ownedNfts[1].tokenId;
    slist.push(q);

    //Logging the response to the console
    console.log(slist, nfts.ownedNfts.length);
};

main();