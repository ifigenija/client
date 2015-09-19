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
    'app/programDela/Module/ProgramDela',
    'app/koledar/Module/Koledar',
    'app/arhiv/Module/Arhiv',
    'app/seznami/Module/Seznami',
    'app/nastavitve/Module/Nastavitve',
    'app/aaa/Module/Aaa',
    'app/Zapisi/Module/Filemanager',
    'app/JobManager/Module/JobManager',
    'app/Max/View/Buttons',
        'app/JobManager/View/PrintDokumentButton',
    'bootstrap'
], function (
        Marionette,
        Radio,
        $,
        fmInit,
        navInit,
        ifiLayoutInit,
        produkcijaInit,
        programDelaInit,
        koledarInit,
        arhivInit,
        seznamiInit,
        nastavitveInit,
        aaaInit,
        zapisiInit,
        jobManagerInit,
        buttons,
        buttonPrint
        ) {

    var app = new Marionette.Application();

    app.module('nav', navInit);
    app.module('flashManager', fmInit);
    app.module('ifiLayout', ifiLayoutInit);
    app.module('jobManager', jobManagerInit);
    app.module('uprizoritve', produkcijaInit);
    app.module('koledar', koledarInit);
    app.module('arhiv', arhivInit);
    app.module('programDela', programDelaInit);
    app.module('seznami', seznamiInit);
    app.module('nastavitve', nastavitveInit);
    app.module('aaa', aaaInit);
    app.module('zapisi', zapisiInit);


    /**
     * Regije in navigacija  
     */
    app.on('start', function (options) {

        // to je tukaj zato, da su gumbi lahko razširljivi, da jih lahko vsaka aplikacija posebej dodaja 
        // ne da bi se spreminjali osvnovni gumbi v Buttons.js
        Radio.channel('global').reply('buttons', function () {
            buttons['button-print'] = buttonPrint;
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
