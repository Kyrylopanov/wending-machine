import angular from 'angular';

import '../style/app.css';

let app = () => {
  return {
    template: require('./app.html'),
    controller: 'vendingMachineController',
    controllerAs: 'app'
  }
};

class AppCtrl {
  constructor() {

  }
}

const vendingMachineIO = 'app';

angular.module(vendingMachineIO, ['ngMaterial'])
  .directive('app', app)
  .factory('vendingMachineIO', function() {
	return {

	};
})

.controller('vendingMachineController', ['$scope', '$timeout', '$filter', 'vendingMachineIO', function($scope, $timeout, $filter, vendingMachineIO) {

	$scope.credit = 0;
	$scope.status = '';
  $scope.fiftyCents = 0;
  $scope.quarter = 0;
  $scope.tenCents = 0;
  $scope.fiveCents = 0;
  $scope.oneCent = 0;

  $scope.drinks = [
    {
    name: 'Cola',
    price: 0.53
  },
  {
    name: 'Fanta',
    price: 0.21
  },
  {
    name: 'Vytautas',
    price: 0.15
  }
]

	// called when the user enters a selection on the keypad
	$scope.selectSlot = function(slot) {
		var price = getSlotPrice();
		if (!hasSufficientCredit(price)) return;
		decrementCredit(price);
	}

	function getSlotPrice() {
		return $scope.item.price;
	}

	function hasSufficientCredit(price) {
		if ($scope.credit >= price) return true;
	}

	function decrementCredit(value) {
		$scope.credit -= value;
		roundTwoDecimals();
    coinCounter($scope.credit)
    //console.log($scope.credit)
	}

	function roundTwoDecimals() {
		// Round to two decimal places to avoid floating point weirdness.
		$scope.credit = Math.round($scope.credit * 100) / 100
	}


//Calculate what types of coins should be return to the client
function coinCounter(el) {
	let denomination = el.toString().split('.');
	let euro = Number(denomination[0] * 100);
	//console.log('euro: '+euro);
	let cents = Number(denomination[1]);
	//console.log('cents: '+cents);
  let total = Number(euro + cents);
  //console.log('total: '+total);
	let modF, modQ, modD, modN;

  if(total >= 50){
		$scope.fiftyCents = Math.floor(total / 50);
	}
  modF = total % 50;


	if(total >= 20){
		$scope.quarter = Math.floor(modF / 20);
	}
	modQ = total % 20;

	if(modQ >= 10){
		$scope.tenCents = Math.floor(modQ / 10);
	}
	modD = modQ % 10;

	if(modD >= 5){
		$scope.fiveCents = Math.floor(modD / 5);
	}
	modN = modD %  5;

	if(modN){
		$scope.oneCent = Math.floor(modN);
	}
	else {
		modN = 0;
	}
  return false;
}

}]);

export default vendingMachineIO;
