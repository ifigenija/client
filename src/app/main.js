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
    'app/programDela/Module/ProgramDela',
    'app/koledar/Module/Koledar',
    'app/arhiv/Module/Arhiv',
    'app/seznami/Module/Seznami',
    'app/nastavitve/Module/Nastavitve',
    'app/aaa/Module/Aaa',
    'app/Max/View/Buttons',
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
        programDelaInit,
        koledarInit,
        arhivInit,
        seznamiInit,
        nastavitveInit,
        aaaInit,
        buttons
        ) {

    var app = new Marionette.Application();

    app.module('nav', navInit);
    app.module('flashManager', fmInit);
    app.module('ifiLayout', ifiLayoutInit);
    app.module('uprizoritve', produkcijaInit);
    app.module('koledar', koledarInit);
    app.module('arhiv', arhivInit);
    app.module('poziv', pozivInit);
    app.module('programDela', programDelaInit);
    app.module('seznami', seznamiInit);
    app.module('nastavitve', nastavitveInit);
    app.module('aaa', aaaInit);


    /**
     * Regije in navigacija  
     */
    app.on('start', function (options) {

        // to je tukaj zato, da su gumbi lahko razširljivi, da jih lahko vsaka aplikacija posebej dodaja 
        // ne da bi se spreminjali osvnovni gumbi v Buttons.js
        Radio.channel('global').reply('buttons', function () {
            return buttons;
        });

        var layout = this.ifiLayout.layout = new this.ifiLayout.Layout({
            el: $("body"),
            user: options.user
        });

        layout.render();

    });

    return app;
});
