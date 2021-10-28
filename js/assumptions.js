function getNumberById(id) {return document.getElementById(id).valueAsNumber;}

function machineCost() {return getNumberById("machineCost")}
function immersionCoolingCost() {return getNumberById("immersionCoolingCost")}
function totalFixedCost()  {return machineCost() + immersionCoolingCost();}

function solarCapacityPctProduced() {return getNumberById("solarCapacityPctProduced")/100;}
function solarCost() {return getNumberById("solarCost");}
function kwhConsumed() {return getNumberById("kwhConsumed");}
function costPerKWH() {return getNumberById("costPerKWH");}

function getBtcStartPriceUSD() {return getNumberById("btcStartPriceUSD");}
function getBtcEndPriceUSD() {return getNumberById("btcEndPriceUSD");}

function numberOfYears() {return getNumberById("numberOfYears");}
function currentDifficulty() {return getNumberById("currentDifficulty");}
function currentBlockHeight() {return getNumberById("currentBlockHeight");}
function hashRate() {return getNumberById("hashRate");}

function electricityCostPerBlock() {
	return (costPerKWH()/6)*kwhConsumed();
};

function electricityCostPerNumberOfBlocksIntoTheFuture(blocks) {
	return electricityCostPerBlock() * blocks;
};

function getMarketShare() {
	btcNetworkThs = (2**32/600) *  (currentDifficulty() / hashPerTh);
	marketShare = (hashRate())/btcNetworkThs;
	return marketShare;
}

function calculateCost(startBlock, endBlock, currentBlock, startPrice, endPrice) {
	slope = (endPrice-startPrice)/(endBlock-startBlock)

	// y = mx + b <==> b = y_i - m*x_i (pick a point you know to find intercept)
	// y = mx - m*x_i + y_i = m(x-x_i) + y_i
	return slope*(currentBlock - startBlock) + startPrice;
}
