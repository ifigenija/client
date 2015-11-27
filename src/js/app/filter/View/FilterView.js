/* 
 * Licenca GPLv3
 * 
 * @author Lovro Rojko
 * 
 * Vhnodni podatki:
 *      vrste filtrov
 *      prednastavljeni filter
 *      {
 *      vrsta1:{ids:{}},
 *      vrsta2:{ids:{}}
 *      }
 *
 * Prikaz vrst filtrov
 * toolbar z gumboma dodaj vrsto filtra in ponastavi filtre
 * 
 * Izhodni podatki:
 *      {
 *      vrsta1:{ids:{}},
 *      vrsta2:{ids:{}}
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
            vrsteR: '.region-vrste-filtra'
        },
        triggers: {
            'click .vrsta-filtra-dodaj': 'dodaj',
            'click .vrsta-filtra-reset': 'ponastavi'
        }
    });

    FilterView.prototype.initialize = function (options) {
        this.template = options.template || this.template;

        this.vrsteFiltrov = new Vrsta(null, {
            vrsteFiltrov: options.vrsteFiltrov
        });

        this.aktivneVrste = new AktivnaVrsta(null, {
            aktivneVrste: options.aktivneVrste,
            vrsteFiltrov: this.vrsteFiltrov
        });

        //še inicializiramo ponastavitev, ker backboneclone ni deep operacija
        this.ponastavitev = new AktivnaVrsta(null, {
            aktivneVrste: options.aktivneVrste,
            vrsteFiltrov: this.vrsteFiltrov
        });
    };

    FilterView.prototype.onRender = function () {
        this.renderAktivniSeznam();
    };

    FilterView.prototype.renderAktivniSeznam = function () {
        var view = new AktivniFiltriCollectionView({
            vrsteFiltrov: this.vrsteFiltrov,
            aktivneVrste: this.aktivneVrste
        });

        view.on('change:vrednosti', function () {
            console.log('change:vrednosti');
        }, this);
        
        view.on('changed:vrednosti', function () {
            console.log('changed:vrednosti');
        }, this);

        this.vrsteR.show(view);
    };

    /**
     * Ob kliku na gumb dodaj odpremo view za izbiranje filtra
     * @returns {undefined}
     */
    FilterView.prototype.onDodaj = function () {
        this.renderIzbiraFiltra();
    };

    FilterView.prototype.renderIzbiraFiltra = function () {

        var groups = [];
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
                    element: 'button-trigger',
                    trigger: 'dodajAktivnoVrsto',
                    data: vMmodel
                };
                buttons.push(obj);
            }
        });

        if (buttons.length) {
            var obj = {
                id: 'filter-preklici',
                label: i18next.t('std.preklici'),
                element: 'button-trigger',
                trigger: 'preklici'
            };
            buttons.push(obj);

            groups.push(buttons);

            var toolbarView = new Toolbar({
                buttonGroups: groups,
                listener: this,
                size: 'md'
            });

            this.vrsteR.show(toolbarView);
        } else {
            Radio.channel('error').command('flash', {
                message: i18next.t('std.filterIzbira'),
                code: 100200,
                severity: 'warning'
            });
        }
    };

    FilterView.prototype.onPreklici = function () {
        this.render();
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
     * @param {type} child
     * @returns {FilterView_L34.FilterView.prototype@pro;aktivneVrste@call;getVrednostiFiltrov}
     */
    FilterView.prototype.getVrednostiAktivnihFiltrov = function (child) {
        return this.aktivneVrste.getVrednostiFiltrov();
    };

    /**
     * zamenjamo collection viewja s podatki ki smo jih dobili ob inicializaciji
     * @returns {undefined}
     */
    FilterView.prototype.onPonastavi = function () {
        //ker backbone clone ni deep operacija
        var vrsteFiltrov = new Vrsta(null, {
            vrsteFiltrov: this.options.vrsteFiltrov
        });

        this.aktivneVrste = new AktivnaVrsta(null, {
            aktivneVrste: this.options.aktivneVrste,
            vrsteFiltrov: this.vrsteFiltrov
        });
        this.render();
    };

    return FilterView;
});