(function () {
    'use strict';

    angular.module('mainApp')
        .factory('StepsDataService', StepsDataService);

    function StepsDataService() {
        var _deliveryData = null;
        var _paymentData = null;
        var _currentStep = null;
        var factory = {
            setDeliveryStepData: setDeliveryStepData,
            getDeliveryStepData: getDeliveryStepData,
            setPaymentStepData: setPaymentStepData,
            getPaymentStepData: getPaymentStepData,
            setCurrentStep: setCurrentStep,
            getCurrentStep: getCurrentStep,
        };
        return factory;

        function setDeliveryStepData(data) {
            _deliveryData = data;
        };

        function getDeliveryStepData() {
            return _deliveryData;
        };

        function setPaymentStepData(data) {
            _paymentData = data;
        };

        function getPaymentStepData() {
            return _paymentData;
        };

        function setCurrentStep(step) {
            _currentStep = step;
        };

        function getCurrentStep() {
            return _currentStep;
        };
    }
})()