/**
 * entry point za public dostop do ifigenije
 * 
 * Licenca GPLv3
 */
define(['marionette',
    'jquery',
    'app/public/Module/Public',
    'jquery.jsonrpc'
], function (
        Marionette,
        $,
        publicInit
        ) {


    var app = new Marionette.Application();

    app.module('public', publicInit);

    app.on('start', function (options) {
        this.addRegions({
            glavniContainer: '#glavni-container',
            navContainer: '#nav'
        });
//        var nav = new Navbar();
//        this.navContainer.show(nav);

        this.submodules.public.login();
    });

    return app;
});

