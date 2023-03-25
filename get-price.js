async function getPrice(x) {
	try{
		const a = await contract.phunksOfferedForSale(x).then(new Response);
		const pri = ethers.utils.formatEther(parseInt(a.minValue._hex));
		pdiv = document.createElement('div');
		pdiv.classList.add('pprice');
		pdiv.innerHTML = pri + 'Ξ'
		document.getElementById(i).appendChild(pdiv);
	} catch() {}
}

var interval = setInterval(function() {
    // get elem
    if (typeof contract == 'undefined') return;
    clearInterval(interval);

    // the rest of the code
	for(let i = 0; i < 10000; i++) { 
		try { getPrice(i) } 
		catch(e) { }
	} 
}, 10);