(function () {
    'use strict';

    angular.module('mainApp')
        .controller('MainController', MainController);

    MainController.$inject = ['$scope', 'StepsDataService', 'ProductsDataService', 'toastr'];

    function MainController($scope, StepsDataService, ProductsDataService, toastr) {
        var self = this;

        self.currentStep = 'delivery';
        self.productsTotalCost = ProductsDataService.getTotalCost();

        self.setCurrentStep = setCurrentStep;

        $scope.$watch(function () {
            return StepsDataService.getCurrentStep();
        }, function (newValue, oldValue) {
            if (newValue !== oldValue) {
                self.currentStep = newValue;
            }
        });

        $scope.$watch(function () {
            return ProductsDataService.getTotalCost();
        }, function (newValue, oldValue) {
            if (newValue !== oldValue) {
                self.productsTotalCost = newValue;
            }
        });

        function setCurrentStep(step) {
            if (self.currentStep !== step) {
                switch (step) {
                    case 'delivery':
                        {
                            StepsDataService.setCurrentStep(step);
                            break;
                        }
                    case 'payment':
                        {
                            if (!StepsDataService.getDeliveryStepData()) {
                                toastr.warning('Please submit delivery form');
                            } else {
                                StepsDataService.setCurrentStep(step);
                            }
                            break;
                        }
                    case 'summary':
                        {
                            if (!StepsDataService.getPaymentStepData()) {
                                toastr.warning('Please submit payment');
                            } else {
                                StepsDataService.setCurrentStep(step);
                            }
                            break;
                        }
                }
            }
        }
    }
})()