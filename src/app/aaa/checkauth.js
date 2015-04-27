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
    return checkLoginStatus = function (next) {
        var authService = new $.JsonRpcClient({ajaxUrl: '/rpc/aaa/auth'});
        var self = this;
        authService.call(
                'checkLogin', [],
                function (result) {
                    if (result.roles && result.email) {
                        next(result);
                    } else {
                        window.location.href = "/";
                    }
                },
                function (error) {
                    window.location.href = "/";
                }
        );
    };

});