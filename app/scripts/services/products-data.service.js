(function () {
    'use strict';

    angular.module('mainApp')
        .factory('ProductsDataService', ProductsDataService);

    function ProductsDataService() {
        var _totalCost = null;
        var factory = {
            setTotalCost: setTotalCost,
            getTotalCost: getTotalCost
        };
        return factory;

        function setTotalCost(cost) {
            _totalCost = cost;
        };

        function getTotalCost() {
            return _totalCost;
        };
    }
})()