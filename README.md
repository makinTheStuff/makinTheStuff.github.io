<!DOCTYPE html>
<html>
<head>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.5.0/Chart.min.js"></script>
	<script src="js/constants.js"></script>
	<script src="js/assumptions.js"></script>
	<script src="js/issuance.js"></script>
	<script src="js/expenses.js"></script>
	<script src="js/profit.js"></script>
	<style>
		* {
		  box-sizing: border-box;
		}
		body {
			margin: 0;
			padding: 0;
			height: 100%;
			max-height: 100%;
			float: left;
			width: 100%;
		}
		.column-25 {
			float: left;
			width: 25%;
			padding: 10px;
		}
		.column-75 {
			float: left;
			width: 75%;
			padding: 10px;
		}

		.column-half {
		  float: left;
		  width: 50%;
		  padding: 10px;
		}

		.row:after {
		  content: "";
		  display: table;
		  clear: both;
		}

		@media screen and (max-width: 600px) {
		  .column {
			width: 100%;
		  }
		}
		.form {
		  background: #e6e6e6;
		  border-radius: 8px;
		  box-shadow: 0 0 40px -10px #000;
		  margin: 30px;
		  padding: 20px 30px;
		  max-width: 80%;
		  box-sizing: border-box;
		  font-family: "Montserrat", sans-serif;
		  position: relative;
		}
		input {
		  width: 100%;
		  padding: 10px;
		  box-sizing: border-box;
		  background: none;
		  outline: none;
		  resize: none;
		  border: 0;
		  font-family: "Montserrat", sans-serif;
		  transition: all 0.3s;
		  border-bottom: 2px solid #bebed2;
		}
		input:focus {
		  border-bottom: 2px solid #78788c;
		}
		p:before {
		  content: attr(type);
		  display: block;
		  margin: 28px 0 0;
		  font-size: 14px;
		  color: #5a5a5a;
		}
		button {
		  float: right;
		  padding: 8px 12px;
		  margin: 8px 0 0;
		  font-family: "Montserrat", sans-serif;
		  border: 2px solid #78788c;
		  background: 0;
		  color: #5a5a6e;
		  cursor: pointer;
		  transition: all 0.3s;
		}
		button:hover {
		  background: #78788c;
		  color: #fff;
		}
	</style>
</head>
<body>
<div class="row">
	<div class="column-25">
		<form class="form">
			<button id="redraw">calculate</button><br><br>
			<p type="BTC Starting USD Price"><input id="btcStartPriceUSD" type="number" value=60000 placeholder="btcStartPriceUSD"></p>
			<p type="BTC  End USD Price"><input id="btcEndPriceUSD" type="number" value=100000 placeholder="btcEndPriceUSD"></p>
			<p type="KWH Consumed"><input id="kwhConsumed" type="number" value=3.3 placeholder="kwhConsumed"></p>
			<p type="Cost per kwh"><input id="costPerKWH" type="number" value=.1043 placeholder="costPerKWH" step="0.0001"></p>
			<p type="Solar Cost"><input id="solarCost" type="number" value=3300 placeholder="solarCost"></p>
			<p type="% Energy Consumption Covered by Solar"><input id="solarCapacityPctProduced" type="number" value=60 placeholder="solarCapacityPctProduced"></p>
			<p type="Time Elaped in Years"><input id="numberOfYears" type="number" value=5 placeholder="numberOfYears"></p>
			<p type="Current Difficulty"><input id="currentDifficulty" type="number" value=20082460130830 placeholder="currentDifficulty"></p>
			<p type="Hash Rate"><input id="hashRate" type="number" value=90 placeholder="hashRate"></p>
			<p type="Current Block Height"><input id="currentBlockHeight" type="number" value=706129 placeholder="currentBlockHeight"></p>
			<p type="Machine Cost"><input id="machineCost" type="number" value=12000 placeholder="currentDifficulty"></p>
			<p type="Immersion Cooling Cost"><input id="immersionCoolingCost" type="number" value=3000 placeholder="immersionCoolingCost"></p>
		</form>
	</div>
	<div class="column-75">
		<canvas id="profit usd" style="width:100%;max-width:100%"></canvas>
		<div class="column-75">
			<canvas id="issuance" style="width:100%;max-width:100%"></canvas>
		</div>
		<div class="column-25">
			<br><br><br><canvas id="fixedCost" style="width:100%;max-width:100%"></canvas>
		</div>
	</div>
</div>
<script>
var issuanceChart = null;
var usdProfitChart = null;
var fixedOverheadChart = null;
function redraw (event) {
	if (issuanceChart) {
		issuanceChart.destroy();
		usdProfitChart.destroy();
		fixedOverheadChart.destroy();
	}

	interval = btcBlocksPerDay * 30;
	tillBlock = currentBlockHeight() + btcBlocksPerDay * 365 * numberOfYears();
	issuanceChart = generateDataIssuance(currentBlockHeight(), tillBlock, interval);
	usdProfitChart = generateDataProfit(currentBlockHeight(), tillBlock, interval);
	fixedOverheadChart = generateDataFixedOverheadExpense();
}

redraw()

document.getElementById("redraw").addEventListener("click", function(event) {
	redraw();
	event.preventDefault();
});
</script>

</body>
</html>
