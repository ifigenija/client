/** 
 * Licenca GPLv3
 */
define([
    'marionette',
    'radio',
    'jquery',
    'app/Max/Module/FlashManager',
    'app/nav/Module/NavModel',
    'app/nav/Module/IfiLayout',
    'app/produkcija/Module/Produkcija',
    'app/poziv/Module/Poziv',
    'app/koledar/Module/Koledar',
    'app/arhiv/Module/Arhiv',
    'app/seznami/Module/Seznami',
    'app/nastavitve/Module/Nastavitve',
    'app/aaa/Module/Aaa',
    'bootstrap'
], function (
        Marionette,
        Radio,
        $,
        fmInit,
        navInit,
        ifiLayoutInit,
        produkcijaInit,
        pozivInit,
        koledarInit,
        arhivInit,
        seznamiInit,
        nastavitveInit,
        aaaInit

        ) {

    var app = new Marionette.Application();


    app.module('nav', navInit);
    app.module('ifiLayout', ifiLayoutInit);
    app.module('flashManager', fmInit);
    app.module('uprizoritve', produkcijaInit);
    app.module('koledar', koledarInit);
    app.module('arhiv', arhivInit);
    app.module('poziv', pozivInit);
    app.module('seznami', seznamiInit);
    app.module('nastavitve', nastavitveInit);
    app.module('aaa', aaaInit);


    /**
     * Regije in navigacija  
     */
    app.on('start', function (options) {


        var layout = this.ifiLayout.layout  = new this.ifiLayout.Layout({
            el: $("body")            
        });
        
        layout.render();
    });

    return app;
});
