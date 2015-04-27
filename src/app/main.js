/** 
 * Licenca GPLv3
 */
define([
    'marionette',
    'app/nav/View/SidebarMenu',
    'app/nav/View/OrodnaVrsticaView',
    'app/nav/Module/NavModel',
    'app/produkcija/Module/Produkcija',
    'app/poziv/Module/Poziv',
    'app/koledar/Module/Koledar',
    'app/arhiv/Module/Arhiv',
    'app/seznami/Module/Seznami',
    'app/nastavitve/Module/Nastavitve',
    'app/aaa/Module/Aaa',
    'app/aaa/View/UporabnikView',
    'bootstrap'
], function (
        Marionette,
        SidebarMenu,
        OrodnaVrsticaView,
        navInit,
        produkcijaInit,
        pozivInit,
        koledarInit,
        arhivInit,
        seznamiInit,
        nastavitveInit,
        aaaInit,
        UporabnikView
        ) {

    var app = new Marionette.Application();

    
    app.module('nav', navInit);
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

        this.addRegions({
            orodnaVrstica: "#orodna-vrstica",
            glavniContainer: '#main'
        });

        var uv = new UporabnikView();
        var ovv = new OrodnaVrsticaView({
            crumbsColl: app.nav.crumbs
        });

        this.glavniContainer.show(uv);
        this.orodnaVrstica.show(ovv);

        var menu = new SidebarMenu({
            model: this.nav.navigation
        });
        menu.render().$el.insertBefore("#orodna-vrstica");
    });

    return app;
});
