/* 
 * Licenca GPLv3
 */
define([
    'jquery',
    'jquery.jsonrpc'
], function (
        $
        ) {

    /**
     * Prevri ali je uporabnik že prijavljen. Če ni prijavljen 
     * 
     * @param {type} callback
     * @returns {undefined}
     */
    return {
        check: function (next) {
            var authService = new $.JsonRpcClient({ajaxUrl: '/rpc/aaa/auth'});
            var self = this;
            authService.call(
                    'checkLogin', [],
                    function (result) {
                        if (result.roles && result.username) {
                            next(result);
                        } else {
                            window.location.href = "/";
                        }
                    },
                    function (error) {
                        window.location.href = "/";
                    }
            );
        },
        passPolicy: function (text) {
            var maliText = text.toLowerCase();
            var velikiText = text.toUpperCase();

            var pogoji = 0;
            if (text !== maliText) {
                pogoji++;
            }
            if (text !== velikiText) {
                pogoji++;
            }
            if (text.match(/\d/)) {
                pogoji++;
            }
            if (text.match(/\W/)) {
                pogoji++;
            }

            return pogoji >= 3;
        }
    };


});