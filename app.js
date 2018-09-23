(function () {
'use strict';

angular.module('ShoppingListCheckOff', [])
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService);

ToBuyController.$inject = ['ShoppingListCheckOffService'];
function ToBuyController(ShoppingListCheckOffService) {
  var toBuyList = this;

  toBuyList.checkAsBought = function (itemIndex) {
    var removedItem = ShoppingListCheckOffService.removeItem(itemIndex);
    ShoppingListCheckOffService.addItem(removedItem);
  }

   toBuyList.items = ShoppingListCheckOffService.getToBuyItems();


   toBuyList.isEmpty = function () {
     var amount = ShoppingListCheckOffService.getToBuyItems().length;
     if (amount == 0) return true;
     return false;
   }
}


AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtController(ShoppingListCheckOffService) {
  var alreadyBoughtList = this;

  alreadyBoughtList.items = ShoppingListCheckOffService.getAlreadyBoughtItems();

  alreadyBoughtList.isEmpty = function () {
    var amount = ShoppingListCheckOffService.getAlreadyBoughtItems().length;
    if (amount == 0) return true;
    return false;
  }

}

function ShoppingListCheckOffService() {
  var service = this;
  //list of items to buy
  var toBuyItems = [
    {
      name: "cookies",
      quantity: 10
    },
    {
      name: "chocolates",
      quantity: 2
    },
    {
      name: "bananas",
      quantity: 5
    },
    {
      name: "oranges",
      quantity: 7

    },
    {
      name: "apples",
      quantity: 2
    }
  ];
  //list of items already bought
  var alreadyBoughtItems = [];

  service.removeItem = function (itemIndex) {
    var checkedItem = toBuyItems.splice(itemIndex, 1)[0];
    return checkedItem;

  };

  service.addItem = function (checkedItem) {
    alreadyBoughtItems.push(checkedItem);
  };

  service.getAlreadyBoughtItems = function () {
    return alreadyBoughtItems;
  };

  service.getToBuyItems = function () {
    return toBuyItems;
  };

}

})();
