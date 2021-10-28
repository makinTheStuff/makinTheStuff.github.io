function btcIssuanceForBlock(block_height) {
	return 50/(Math.pow(2, Math.floor(block_height/210000)));
}

function btcRevenueForBlock(block_height) {
	return getMarketShare() * btcIssuanceForBlock(block_height);
};

function btcRevenuePerNumberOfBlocksIntoTheFuture(block_height_start, block_height_end) {
	return btcRevenueForBlock(block_height_start) * (block_height_end - block_height_start);
};

function generateDataFixedOverheadExpense() {
	return new Chart("fixedCost", {
		type: "pie",
		data: {
			labels: ["Machine Cost", "Immersion Cooling", "Solar Cost"],
			datasets: [{
				label: 'btc block reward',
				fill: false,
				pointRadius: 1,
				borderColor: "rgba(255,0,0,0.5)",
				backgroundColor: [
					"#2ecc71", "#3498db", "#95a5a6" // "#9b59b6", "#f1c40f", "#e74c3c", "#34495e"
				],
				data: [machineCost(), immersionCoolingCost(), solarCost()]
			}]
		  },    
		  options: {
			legend: {display: true},
			title: {
			  display: true,
			  text: "Fixed Overhead Cost",
			  fontSize: 16
			}
		}
	});
}
