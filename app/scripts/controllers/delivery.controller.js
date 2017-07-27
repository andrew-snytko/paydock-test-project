(function () {
    'use strict';

    angular.module('mainApp')
        .controller('DeliveryController', DeliveryController);

    DeliveryController.$inject = ['StepsDataService', 'toastr'];

    function DeliveryController(StepsDataService, toastr) {
        var self = this;

        self.deliveryData;

        self.next = next;

        var storedData = StepsDataService.getDeliveryStepData();
        if (storedData) {
            self.deliveryData = storedData;
        }

        function next() {
            StepsDataService.setDeliveryStepData(self.deliveryData);
            StepsDataService.setCurrentStep('payment');
        }
    }
})()