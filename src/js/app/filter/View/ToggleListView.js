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
    './DualListView'
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
        DualListView
        ) {

    var ToggleListView = DualListView.extend({
        template: toggleListTpl,
        triggers: {
            'click .togglelist-gumb': 'izberiVse',
            'click .selectlist-backdrop': 'close',
            'click .selectlist-zapri': 'close',
            'click .oznacivse': 'izberiVse'
        }
    });

    /**
     * Kaj se zgodi ob izrisu Viewja
     * @returns {undefined}
     */
    ToggleListView.prototype.onRender = function () {
        this.renderLeviSeznam();
        this.renameGumb();
        this.triggerMethod('show');
    };

    ToggleListView.prototype.renameGumb = function () {
        var models = this.mozni.models;
        //preverimo ali so vsi modeli označeni
        var label = i18next.t('std.odkljukaj');

        for (var id in models) {
            if (!models[id].get('selected')) {
                label = i18next.t('std.obkljukaj');
                break;
            }
        }
        this.$('.oznacivse').html(label);
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
        this.getIzbraniModeli();
        DualListView.prototype.onClose.apply(this, arguments);
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

        var text = this.$('.oznacivse').html();
        //preverimo ali izberemo vse ali prekličemo izbor vseh
        if (text === i18next.t('std.obkljukaj')) {
            var label = i18next.t('std.odkljukaj');
            this.$('.oznacivse').html(label);

            this.mozniView.oznaciModele(this.mozni);
        } else {

            var label = i18next.t('std.obkljukaj');
            this.$('.oznacivse').html(label);

            this.mozniView.resetSelection();
        }
        this.getIzbraniModeli();
        this.render();
    };

    return ToggleListView;
});


