/* 
 * Licenca GPLv3
 * 
 * @author Lovro Rojko
 * 
 * Vhodni podatki:
 *      - vrsta filtra
 *      - collection
 *
 * Mozni kriterijev filtra
 *
 * Izhodni podatki:
 *      - collection izbranih kriterijev
 */
define([
    'jquery',
    'radio',
    'i18next',
    'app/bars',
    'backbone',
    'underscore',
    'marionette',
    'template!../tpl/toggleList.tpl',
    './ToggleListView',
    './DualListView',
    'app/Max/View/Toolbar'
], function (
        $,
        Radio,
        i18next,
        Handlebars,
        Backbone,
        _,
        Marionette,
        toggleListTpl,
        ToggleListView,
        DualListView,
        Toolbar
        ) {

    var ToggleListView = DualListView.extend({
        template: toggleListTpl,
        triggers: {
            'click .togglelist-gumb': 'izberiVse',
            'click .selectlist-backdrop': 'close',
            'click .selectlist-zapri': 'close'
        }
    });

    ToggleListView.prototype.initialize = function () {
        DualListView.prototype.initialize.apply(this, arguments);
        this.addRegions({toolbarR: '.selectlist-toolbar'});
    };

    /**
     * Kaj se zgodi ob izrisu Viewja
     * @returns {undefined}
     */
    ToggleListView.prototype.onRender = function () {
        this.renderLeviSeznam();
        this.renderToolbar();
        this.triggerMethod('show');
    };

    ToggleListView.prototype.renderToolbar = function () {
        var models = this.mozni.models;
        //preverimo ali so vsi modeli označeni
        var label = i18next.t('std.odkljukaj');

        for (var id in models) {
            if (!models[id].get('selected')) {
                label = i18next.t('std.obkljukaj');
                break;
            }
        }
        var tool = [[
                {
                    id: 'doc-izberi',
                    label: label,
                    element: 'button-trigger',
                    trigger: 'izberiVse'
                }
            ]];

        var tb = this.toolbar = new Toolbar({
            buttonGroups: tool,
            listener: this
        });

        this.toolbarR.show(tb);
    };

    ToggleListView.prototype.onShow = function () {
        DualListView.prototype.onShow.apply(this, arguments);
        this.oznaciIzbrane();
    };
    /**
     * Oznacimo modele, ki so bili že prej označeni
     * @returns {undefined}
     */
    ToggleListView.prototype.oznaciIzbrane = function () {
        this.mozniView.oznaciModele(this.izbrani);
    };

    /**
     * Osvežimo tabele in izbrane modele pri posameznih 
     * @returns {undefined}
     */
    ToggleListView.prototype.refresh = function () {
        this.mozniView.resetSelection();
        this.mozniView.render();
    };

    /**
     * Zapri View, ga uničimo
     * Se kliče ko stisnemo izven Viewja
     * @returns {undefined}
     */
    ToggleListView.prototype.onClose = function () {
        $(window).off('resize', jQuery.proxy(this, "resize"));
        this.getIzbraniModeli();
        this.destroy();
    };

    /**
     * Premaknemo izbrane elemente iz levega stolpca v desnega
     * @returns {undefined}
     */
    ToggleListView.prototype.getIzbraniModeli = function () {
        var models = this.mozniView.getSelectedModels();
        this.izbrani.reset(models);
    };

    /**
     * Premaknemo izbrane elemente iz levega stolpca v desnega
     * @returns {undefined}
     */
    ToggleListView.prototype.onIzberiVse = function () {
        var tb = this.toolbarR.currentView.collection;

        var but = tb.getButton('doc-izberi');
        if (but) {
            var text = but.get('label');
            //preverimo ali izberemo vse ali prekličemo izbor vseh
            if (text === i18next.t('std.obkljukaj')) {
                but.set({
                    label: i18next.t('std.odkljukaj')
                });

                this.mozniView.oznaciModele(this.mozni);
            } else {
                but.set({
                    label: i18next.t('std.obkljukaj')
                });
                this.mozniView.resetSelection();
                this.getIzbraniModeli();
                this.render();
            }
        }
    };

    return ToggleListView;
});


