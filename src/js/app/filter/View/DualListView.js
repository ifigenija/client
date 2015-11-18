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
    'template!../tpl/dualList.tpl',
    './SelectListView',
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
        dualListTpl,
        SelectListView,
        Backgrid
        ) {

    var DualListView = Marionette.LayoutView.extend({
        template: dualListTpl,
        className: 'selectlist',
        regions: {
            filterR: '.selectlist-filter',
            leviSeznamR: '.selectlist-seznam-levi',
            gumbiR: '.selectlist-gumbi',
            desniSeznamR: '.selectlist-seznam-desni'
        },
        triggers: {
            'click .vsiDesno': 'vseDesno',
            'click .izbraniDesno': 'izbraneDesno',
            'click .izbraniLevo': 'izbraneLevo',
            'click .vsiLevo': 'vseLevo',
            'click .selectlist-backdrop': 'close'
        }
    });

    /**
     * Poskrbeli bomo da lahko nastavljamo različne viewje kot optione
     * 
     * @param Array options
     *      - template : templeta za DualListView
     *      - collIzbrani: collection izbranih modelov (na začetku prazen collection)
     *      - collIzbira: collection modelov med katerimi lahko izbiramo
     *      - IzbiraView: deklaracija IzbiraView, namenjen izrisu collIzbira(default SelectListView)
     *      - IzbraniView: deklaracija IzbraniView, collIzbrani(default SelectListView)
     *      - title: kakšen naslov se naj izpiše DualListView-ja
     *      - ItemView: ItemView je namenjen izrisu modelov collectionov v IzbiraView in IzbraniView(dafault null)
     *      - itemTemplate: v primeru da želimo spremeniti samo template ItemViewja mu podamo samo template(default null)
     *      - $anchor: namenjen je pozicioniranju viewja(default null)
     * @returns {undefined}
     */
    DualListView.prototype.initialize = function (options) {
        this.template = options.tempalte || this.template;
        this.collIzbrani = options.collIzbrani || new Backbone.Collection();
        this.collIzbira = options.collIzbira || new Backbone.Collection();
        this.IzbiraView = options.IzbiraView || SelectListView;
        this.IzbraniView = options.IzbraniView || SelectListView;
        this.title = options.title || "Izberi";
        this.ItemView = options.ItemView || null;
        this.itemTemplate = options.itemTemplate || null;
        this.$anchor = options.$anchor || null;

        //poslušamo resize event od windowa in naredimo proxy, da se uporabi pravi konteks pri klicanju funkcije
        $(window).on('resize', jQuery.proxy(this, "resize"));
    };

    DualListView.prototype.serializeData = function () {
        return {
            title: this.title
        };
    };

    DualListView.prototype.resize = function () {
        var $anchor = this.$anchor;

        if ($anchor) {
            var position = $anchor.offset();
            var left = position.left;
            var top = position.top + $anchor.outerHeight();

            var sirinaOkno = $(window).width();
            var visinaOkno = $(window).height();

            var sirinaView = this.$el.width();
            var visinaView = this.$el.height();

            if (left + sirinaView > sirinaOkno && (sirinaView + sirinaView * 0.2) <= sirinaOkno) {
                left = left - (sirinaView - $anchor.outerWidth());
            }

            if (top + visinaView > visinaOkno && (visinaView + visinaView * 0.2) <= visinaOkno) {
                top = top - visinaView - 2 * $anchor.outerHeight();
            }

            this.$el.css('left', left);
            this.$el.css('top', top);
        }
    };

    /**
     * Kaj se zgodi ob izrisu Viewja
     * @returns {undefined}
     */
    DualListView.prototype.onRender = function () {
        this.renderLeviSeznam();
        this.renderDesniSeznam();
        this.renderFilter();
        this.filtrirajIzbrane();
    };

    /**
     * Ko je view- v celoti narisan se pokliče resize
     * @returns {undefined}
     */
    DualListView.prototype.onShow = function () {
        $(window).trigger('resize');
    };

    /**
     * Izris filtra
     * @returns {undefined}
     */
    DualListView.prototype.renderFilter = function () {
        var filterView = this.filterView = new Backgrid.Extension.ServerSideFilter({
            collection: this.izbiraView.collection
        });

        this.filterR.show(filterView);
    };

    /**
     * Levi seznam je namenjen prikazu vseh elementov, ki jih lahko izberemo
     * Poizbiri elementa bi bilo dobro da se postavijo na prvo mesto, da uporabnik vidi kaj je vse izbral
     * @returns {DualListView_L24.Backgrid.Grid|DualListView_L24.Marionette.LayoutView.extend.prototype.renderLeviSeznam.grid}
     */
    DualListView.prototype.renderLeviSeznam = function () {
        var view = this.izbiraView = new this.IzbiraView({
            collection: this.collIzbira,
            ItemView: this.ItemView,
            itemTemplate: this.itemTemplate
        });

        this.leviSeznamR.show(view);
        return view;
    };

    /**
     * Desni seznam je namenjen Prikazu že izbranih elementov
     * @returns {DualListView_L24.Backgrid.Grid|DualListView_L24.Marionette.LayoutView.extend.prototype.renderDesniSeznam.grid}
     */
    DualListView.prototype.renderDesniSeznam = function () {
        var view = this.izbraniView = new this.IzbraniView({
            collection: this.collIzbrani,
            ItemView: this.ItemView,
            itemTemplate: this.itemTemplate
        });

        this.desniSeznamR.show(view);
        return view;
    };

    /**
     * Premaknemo vse elemente iz levega stolpca v desnega
     * @returns {undefined}
     */
    DualListView.prototype.onVseDesno = function () {
        var models = this.izbiraView.getAllModels();

        this.izbraniView.collection.add(models);

        this.filtrirajIzbrane();
        this.refresh();
    };

    /**
     * Premaknemo izbrane elemente iz levega stolpca v desnega
     * @returns {undefined}
     */
    DualListView.prototype.onIzbraneDesno = function () {
        var models = this.izbiraView.getSelectedModels();

        this.izbraniView.collection.add(models);

        this.filtrirajIzbrane();
        this.refresh();
    };

    /**
     * Premaknemo izbrane elemente iz desnega stolpca v levega
     * @returns {undefined}
     */
    DualListView.prototype.onIzbraneLevo = function () {
        var models = this.izbraniView.getSelectedModels();

        this.izbraniView.collection.remove(models);

        this.filtrirajIzbrane();
        this.refresh();
    };

    /**
     * Premaknemo vse elemente iz desnega stolpca v levega
     * @returns {undefined}
     */
    DualListView.prototype.onVseLevo = function () {
        var models = this.izbraniView.getAllModels();

        this.izbraniView.collection.remove(models);

        this.filtrirajIzbrane();
        this.refresh();
    };

    /*
     * Nastavimo filter za prikaz modelov v levems eznamu, ki niso v med izbranimi modeli
     * @returns {undefined}
     */
    DualListView.prototype.filtrirajIzbrane = function () {
        this.izbiraView.search(this.izbraniView.collection);
    };

    /**
     * Osvežimo tabele in izbrane modele pri posameznih 
     * @returns {undefined}
     */
    DualListView.prototype.refresh = function () {
        this.izbraniView.render();
        this.izbiraView.render();

        this.izbraniView.resetSelection();
        this.izbiraView.resetSelection();
    };

    /**
     * Zapri View, ga uničimo
     * Se kliče ko stisnemo izven Viewja
     * @returns {undefined}
     */
    DualListView.prototype.onClose = function () {
        $(window).off('resize', jQuery.proxy(this, "resize"));
        this.destroy();
    };

    return DualListView;
});


