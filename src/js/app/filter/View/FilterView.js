/* 
 * Licenca GPLv3
 * 
 * @author Lovro Rojko
 * 
 * Vhnodni podatki:
 *      vrste filtrov
 *      prednastavljeni filter
 *      {
 *      vrsta1:{[ids]},
 *      vrsta2:{[ids]}
 *      }
 *
 * Prikaz vrst filtrov
 * toolbar z gumboma dodaj vrsto filtra in ponastavi filtre
 * 
 * Izhodni podatki:
 *      {
 *      vrsta1:{[ids]},
 *      vrsta2:{[ids]}
 *      }
 */

define([
    'radio',
    'i18next',
    'backbone',
    'underscore',
    'marionette',
    'jquery',
    'template!../tpl/filter.tpl',
    '../Model/VrstaCollection',
    '../Model/AktivnaVrstaCollection',
    '../View/AktivniFiltriCollectionView',
    'app/Max/View/Toolbar'
], function (
        Radio,
        i18next,
        Backbone,
        _,
        Marionette,
        $,
        tpl,
        Vrsta,
        AktivnaVrsta,
        AktivniFiltriCollectionView,
        Toolbar
        ) {

    var FilterView = Marionette.LayoutView.extend({
        template: tpl,
        className: 'filter-select',
        regions: {
            vrsteR: '.region-vrste-filtra',
            toolbarLR: '.region-toolbar-left',
            toolbarDR: '.region-toolbar-right'
        }
    });

    FilterView.prototype.initialize = function (options) {
        this.template = options.template || this.template;
        this.vrsteFiltrovData = options.vrsteFiltrov || this.vrsteFiltrovData;
        this.aktivneVrsteData = options.aktivneVrste || this.aktivneVrsteData;
        
        this.vrsteFiltrov = new Vrsta(null, {
            vrsteFiltrov: this.vrsteFiltrovData
        });

        this.aktivneVrste = new AktivnaVrsta(null, {
            aktivneVrste: this.aktivneVrsteData,
            vrsteFiltrov: this.vrsteFiltrov
        });

        //še inicializiramo ponastavitev, ker backboneclone ni deep operacija
        this.ponastavitev = new AktivnaVrsta(null, {
            aktivneVrste: this.aktivneVrsteData,
            vrsteFiltrov: this.vrsteFiltrov
        });
    };

    FilterView.prototype.onRender = function () {
        this.renderToolbarLevo();
        this.renderToolbarDesno();
        this.renderAktivniSeznam();
    };

    FilterView.prototype.renderToolbarLevo = function () {
        var buttons = this.getButtons();
        var groups = [[
                {
                    id: 'filter-dodaj',
                    icon: 'fa fa-plus',
                    element: 'button-dropdown',
                    trigger: 'dodaj',
                    dropdown: buttons
                }
            ]];

        var toolbarView = this.toolbarLView = new Toolbar({
            buttonGroups: groups,
            listener: this,
            size: 'md'
        });

        if (buttons.length === 0) {
            toolbarView.disableButtons(['filter-dodaj']);
        }else{
            toolbarView.enable(['filter-dodaj']);
        }

        this.toolbarLR.show(toolbarView);
        return toolbarView;
    };

    FilterView.prototype.renderToolbarDesno = function () {
        var groups = [[
                {
                    id: 'filter-reset',
                    icon: 'fa fa-undo',
                    element: 'button-trigger',
                    trigger: 'ponastavi'
                }
            ]];

        var toolbarView = new Toolbar({
            buttonGroups: groups,
            listener: this,
            size: 'md'
        });

        this.toolbarDR.show(toolbarView);
    };

    FilterView.prototype.renderAktivniSeznam = function () {
        var view = new AktivniFiltriCollectionView({
            vrsteFiltrov: this.vrsteFiltrov,
            aktivneVrste: this.aktivneVrste
        });

        //se proži ob vsaki spremembi vrednosti aktivnega filtra
        view.on('change:vrednosti', function () {
            this.trigger('change');
        }, this);

        //se proži ko smo dodali ali odstranili aktivni filter, ter če smo zaključili z urejanjem vrednosti aktivnega filtra
        view.on('changed:vrednosti', function () {
            this.trigger('changed');
            this.renderToolbarLevo();
        }, this);

        this.vrsteR.show(view);
    };

    FilterView.prototype.getButtons = function () {

        var buttons = [];
        var self = this;

        this.vrsteFiltrov.each(function (vMmodel) {
            var obstaja = false;
            self.aktivneVrste.each(function (aModel) {
                if (aModel.get('vrsta') === vMmodel.get('id')) {
                    obstaja = true;
                }
            });

            if (!obstaja) {
                var obj = {
                    id: 'filter-' + vMmodel.get('id'),
                    label: vMmodel.get('label'),
                    icon: vMmodel.get('icon'),
                    trigger: 'dodajAktivnoVrsto',
                    data: vMmodel
                };
                buttons.push(obj);
            }
        });

        return buttons;
    };

    /**
     * Ko dodajamo nov aktivni model podamo še model definicij vrste filtra
     * @param Model model
     * @returns {undefined}
     */
    FilterView.prototype.onDodajAktivnoVrsto = function (model) {
        this.aktivneVrste.add({
            izbrani: new Backbone.Collection(),
            vrstaModel: model,
            vrsta: model.get('id')
        });
        this.render();
    };

    /**
     * Vrne Vse nastavljene vrednosti aktivnih vrst filtrov
     * @returns {FilterView_L34.FilterView.prototype@pro;aktivneVrste@call;getVrednostiFiltrov}
     */
    FilterView.prototype.getVrednostiAktivnihFiltrov = function () {
        return this.aktivneVrste.getVrednostiFiltrov();
    };

    /**
     * zamenjamo collection viewja s podatki ki smo jih dobili ob inicializaciji
     * @returns {undefined}
     */
    FilterView.prototype.onPonastavi = function () {
        //ker backbone clone ni deep operacija
        this.aktivneVrste = new AktivnaVrsta(null, {
            aktivneVrste: this.aktivneVrsteData,
            vrsteFiltrov: this.vrsteFiltrov
        });
        this.render();
    };

    return FilterView;
});