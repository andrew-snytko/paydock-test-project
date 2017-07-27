(function () {
    'use strict';

    angular.module('mainApp')
        .controller('ProductsController', ProductsController);

    ProductsController.$inject = ['ProductsDataService'];

    function ProductsController(ProductsDataService) {
        var self = this;

        self.productsList = [{
                title: 'Product 1',
                desc: 'some desc for product 1',
                amount: 1,
                cost: 100,
                image: 'assets/images/default-product-image.png'
            },
            {
                title: 'Product 2',
                desc: 'some desc for product 2',
                amount: 1,
                cost: 90,
                image: 'assets/images/default-product-image.png'
            },
            {
                title: 'Product 3',
                desc: 'some desc for product 3',
                amount: 1,
                cost: 150,
                image: 'assets/images/default-product-image.png'
            }
        ];

        init();

        function init() {
            var totalCost = self.productsList.reduce(function (prev, curr) {
                return prev + curr.cost;
            }, 0);
            ProductsDataService.setTotalCost(totalCost);
        }
    }
})()