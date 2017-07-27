(function () {
    'use strict';

    angular.module('mainApp')
        .config(ToastrConfig)
        .constant('paydockConfig', {
            publicKey: '9ed2cce74983c307a7d5c98a6c1972c056601f77',
            gatewayId: '5976d8f737cce574c8d021bf'
        });

    ToastrConfig.$inject = ['toastrConfig'];

    function ToastrConfig(toastrConfig) {
        angular.extend(toastrConfig, {
            timeOut: 3000,
            maxOpened: 1,
            preventOpenDuplicates: true,
            positionClass: 'toast-bottom-right',
        });
    }

})()