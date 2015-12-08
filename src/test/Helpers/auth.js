/* 
 * Licenca GPLv3
 */
define([
    'jquery'
], function (
        $
        ) {

    var auth = function (options) {
        var url = options.url || 'http://localhost:8889/';
        var user = options.user || 'admin@ifigenija.si';
        var password = options.password || 'Admin1234';

        var ajax = $.ajax({
            dataType: 'html',
            url: url,
            headers: {
                'Authorization': "Basic " + btoa(user + ":" + password)
            }
        });
    };
});

