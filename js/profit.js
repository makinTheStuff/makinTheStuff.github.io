function generateDataProfit(i1, i2, step = 1) {
	var xValues = [];
	var yValuesProfit = [];
	var yValuesSolarProfit = [];
	var yValuesRevenue = [];
	var yValuesExpense = [];
	var yValuesSolarExpense = [];
	var yValuesBtcPrices = [];

	var totalRevenue = 0;
	var totalElectricityExpense = 0;
	var electricityExpense = electricityCostPerNumberOfBlocksIntoTheFuture(step);
	for (let x = i1; x <= i2; x += step) {
		usdPriceAtCurrentStep = calculateCost(i1, i2, x, getBtcStartPriceUSD(), getBtcEndPriceUSD());
		yValuesBtcPrices.push(usdPriceAtCurrentStep);
		revenueForStep = btcRevenuePerNumberOfBlocksIntoTheFuture(x-step, x) * usdPriceAtCurrentStep;
		totalRevenue += revenueForStep;
		yValuesRevenue.push(totalRevenue);

		totalElectricityExpense += electricityExpense;
		yValuesExpense.push(totalElectricityExpense);
		yValuesSolarExpense.push(totalElectricityExpense*solarCapacityPctProduced());

		profit = totalRevenue - totalFixedCost() - totalElectricityExpense * 1.2;
		yValuesProfit.push(profit);

		solarProfit = totalRevenue - totalFixedCost() - solarCost() - totalElectricityExpense * (
			1 - solarCapacityPctProduced()
		) * 1.2;
		yValuesSolarProfit.push(solarProfit);

		xValues.push((x-i1)/step);
	}
	
	return new Chart("profit usd", {
		type: "line",
		data: {
			labels: xValues,
			datasets: [{
				fill: false,
				label: 'profit',
				pointRadius: 1,
				borderColor: "green", //rgba(255,100,100,0)",
				data: yValuesProfit
			}, {
				fill: false,
				label: 'profit with solar',
				pointRadius: 1,
				borderColor: "rgba(0,250,0,0.5)",
				data: yValuesSolarProfit
			}, {
				fill: false,
				label: 'expense',
				pointRadius: 1,
				borderColor: "rgba(255,0,0,0.5)",
				data: yValuesExpense
			}, {
				fill: false,
				label: 'monthly expense after solar',
				pointRadius: 1,
				borderColor: "rgba(155,0,0,0.5)",
				data: yValuesSolarExpense
			}, {
				fill: false,
				label: 'revenue',
				pointRadius: 1,
				borderColor: "green",
				data: yValuesRevenue
			}, {
				fill: false,
				label: 'btc price assumption',
				pointRadius: 1,
				borderColor: "green",
				data: yValuesBtcPrices
			}]
		},    
		options: {
			legend: {display: true},
			title: {
				display: true,
				text: "Btc monthly profit",
				fontSize: 16
			}
		}
	});
}
