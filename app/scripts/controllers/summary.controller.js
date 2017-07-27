(function () {
    'use strict';

    angular.module('mainApp')
        .controller('SummaryController', SummaryController);

    SummaryController.$inject = ['StepsDataService'];

    function SummaryController(StepsDataService) {
        var self = this;

        var COUNT_STARS_PER_BLOCK = 4;
        self.deliveryData = null;
        self.paymentData = null;

        init();

        function init() {
            self.deliveryData = StepsDataService.getDeliveryStepData();
            self.paymentData = preparePaymentData(StepsDataService.getPaymentStepData());
        }

        function preparePaymentData(data) {
            if (data) {
                var cardScheme = data.cardScheme ? data.cardScheme.toUpperCase() : '-';
                var cardNumber = '';
                var counter = 0;
                for (var i = 0; i < data.cardNumberLength - 4; i++) {
                    if (counter === COUNT_STARS_PER_BLOCK - 1) {
                        cardNumber += '* ';
                        counter = 0;
                    } else {
                        cardNumber += '*';
                        counter++;
                    }
                }
                cardNumber += data.last4CardNumbers;
                return {
                    cardScheme: cardScheme,
                    cardNumber: cardNumber
                }
            } else {
                return null;
            }
        }
    }
})()