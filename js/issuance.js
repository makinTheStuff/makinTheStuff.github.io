function btcIssuanceForBlock(block_height) {
	return 50/(Math.pow(2, Math.floor(block_height/210000)));
}

function btcRevenueForBlock(block_height) {
	return getMarketShare() * btcIssuanceForBlock(block_height);
};

function btcRevenuePerNumberOfBlocksIntoTheFuture(block_height_start, block_height_end) {
	return btcRevenueForBlock(block_height_start) * (block_height_end - block_height_start);
};

function generateDataIssuance(i1, i2, step = 1) {
	var xValuesIssuance = [];
	var yValuesIssuance = [];
	var yValuesRevenue = [];
	var yValuesProfit = [];
	var yValuesFixedCost = [];

	var totalRevenue = 0;
	var totalElectricityExpense = 0;
	var electricityExpense = electricityCostPerNumberOfBlocksIntoTheFuture(step);
	var fixedCostBTC = (totalFixedCost()+solarCost())/getBtcStartPriceUSD();
	for (let x = i1; x <= i2; x += step) {
		usdPriceAtCurrentStep = calculateCost(i1, i2, x, getBtcStartPriceUSD(), getBtcEndPriceUSD())
		totalElectricityExpense += electricityExpense;
		totalRevenue += btcRevenuePerNumberOfBlocksIntoTheFuture(x-step, x);
		yValuesIssuance.push(btcIssuanceForBlock(x));
		yValuesRevenue.push(totalRevenue);
		totalElectricityExpense += electricityExpense;
		yValuesProfit.push(totalRevenue - totalElectricityExpense/usdPriceAtCurrentStep);
		yValuesFixedCost.push(fixedCostBTC);
		xValuesIssuance.push((x-i1)/step);
	}

	return new Chart("issuance", {
		type: "line",
		data: {
			labels: xValuesIssuance,
			datasets: [{
			  label: 'btc block reward',
			  fill: false,
			  pointRadius: 1,
			  borderColor: "rgba(255,0,0,0.5)",
			  data: yValuesIssuance
			}, {
			  label: 'fixed cost (btc)',
			  fill: false,
			  pointRadius: 1,
			  borderColor: "rgba(255,0,0,0.5)",
			  data: yValuesFixedCost
			}, {
			  label: 'btc mined',
			  fill: false,
			  pointRadius: 1,
			  borderColor: "rgba(0,200,0,0.5)",
			  data: yValuesRevenue
			}, {
			  label: 'btc aft full electricity cos',
			  fill: false,
			  pointRadius: 1,
			  borderColor: "rgba(0,200,0,0.5)",
			  data: yValuesProfit
			}]
		  },    
		  options: {
			legend: {display: true},
			title: {
			  display: true,
			  text: "Btc block issuance",
			  fontSize: 16
			}
		}
	});
}
