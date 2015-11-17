/* 
 * Licenca GPLv3
 * 
 * @author Lovro Rojko
 * 
 * Vhodni podatki:
 *      - vrsta filtra
 *      - collection
 *
 * Izbira kriterijev filtra
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
    'backgrid',
    'backgrid-filter'
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
        Backgrid
        ) {

    var ToggleListView = DualListView.extend({
        template: toggleListTpl
    });

    /**
     * Kaj se zgodi ob izrisu Viewja
     * @returns {undefined}
     */
    ToggleListView.prototype.onRender = function () {
        this.leviSeznam = this.renderLeviSeznam();
        this.filter = this.renderFilter();
    };
    /**
     * Izris filtra
     * @returns {undefined}
     */
    ToggleListView.prototype.renderFilter = function () {
        var filterView = this.filterView = new Backgrid.Extension.ClientSideFilter({
            collection: this.izbiraView.collection
        });

        this.filterR.show(filterView);
    };

    /**
     * Osvežimo tabele in izbrane modele pri posameznih 
     * @returns {undefined}
     */
    ToggleListView.prototype.refresh = function () {
        this.izbiraView.render();
        this.izbiraView.resetSelection();
    };
    
    /**
     * Zapri View, ga uničimo
     * Se kliče ko stisnemo izven Viewja
     * @returns {undefined}
     */
    DualListView.prototype.onClose = function () {
        $(window).off('resize', jQuery.proxy(this, "resize"));
        this.onIzbraneDesno();
        this.destroy();
    };

    return ToggleListView;
});


