(function () {
    'use strict';

    angular.module('mainApp')
        .controller('PaymentController', PaymentController);

    PaymentController.$inject = ['$scope', 'StepsDataService', 'paydockConfig', 'toastr', '$timeout'];

    function PaymentController($scope, StepsDataService, paydockConfig, toastr, $timeout) {
        var self = this;

        self.paymentData = {
            cardScheme: null,
            last4CardNumbers: null,
            cardNumberLength: null
        }
        self.disabledNextBtn = true;

        init();

        function init() {
            var widget = new paydock.HtmlMultiWidget('#paydockWidget',
                paydockConfig.publicKey,
                new paydock.Configuration(paydockConfig.gatewayId, 'card', 'payment_source'));
            widget.setStyles({
                background_color: '#fff'
            });
            widget.setHiddenElements(['submit_button']);
            widget.interceptSubmitForm('#paydockForm');
            widget.on('afterLoad', function () {
                StepsDataService.setPaymentStepData(null);
                self.disabledNextBtn = false;
                $scope.$apply();
            });
            widget.on('finish', function (data) {
                if (self.paymentData.cardScheme) {
                    StepsDataService.setPaymentStepData(self.paymentData);
                    StepsDataService.setCurrentStep('summary');
                    $scope.$apply();
                } else if (!self.paymentData.cardNumberLength) {
                    toastr.error('Not all required fields are filled out');
                }
            });
            widget.on('metaChange', function (data) {
                if (data.card_scheme) {
                    self.paymentData.cardScheme = data.card_scheme;
                    self.paymentData.last4CardNumbers = data.card_number_last4;
                    self.paymentData.cardNumberLength = data.card_number_length;
                    $scope.$apply();
                }
            });
            widget.load();
        }
    }
})()