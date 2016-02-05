/*
 * Licenca GPLv3
 */

define([
    'i18next',
    'backbone',
    'moment',
    'underscore',
    'app/bars',
    'marionette',
    'app/Max/View/Toolbar',
    'template!../tpl/seznamSodelujoci.tpl',
    'bootstrap'
], function (
        i18next,
        Backbone,
        moment,
        _,
        Handlebars,
        Marionette,
        Toolbar,
        sodelujociTpl
        ) {

    var Popover = Marionette.LayoutView.extend({
        template: Handlebars.compile('<a class="btn btn-default gumb-razdeli">{{t "std.razdeli" }}</a><a class="btn btn-default gumb-brisi">{{t "std.brisi" }}</a>'),
        triggers: {
            'click .gumb-brisi': 'brisi',
            'click .gumb-razdeli': 'razdeli'
        },
        initialize: function (options) {
            this.model = options.model;
        }
    });

    var SodelujocView = Marionette.ItemView.extend({
        tagName: 'label',
        className: 'sodelujoc',
        template: Handlebars.compile('<a class="sodelujoc-polnoime">{{ime}}</a>'),
        serializeData: function () {
            return{
                ime: this.model.get('oseba').label
            };
        },
        ui: {
            'sodelujoc': '.sodelujoc-polnoime'
        },
        onRender: function () {
            var popover = new Popover({
                model: this.options.model
            });
            popover.render();

            popover.on('brisi', function () {
                this.trigger('brisi');
            }, this);
            popover.on('razdeli', function () {
                this.trigger('razdeli');
            }, this);

            this.ui.sodelujoc.popover({
                html: true,
                title: i18next.t('std.uredi'),
                content: popover.el,
                placement: 'bottom',
                trigger: "click"
            });
        }
    });

    var SodelujociView = Marionette.CollectionView.extend({
        className: 'sodelujoci',
        childView: SodelujocView,
        initialize: function (options) {
            this.childView = options.childView || this.childView;
            this.podrocja = options.podrocja;
        },
        onChildviewBrisi: function (child) {
            child.model.destroy();
        },
        onChildviewRazdeli: function (child) {
            var model = child.model;
            var novModel = model.clone();

            var zacetek = moment(model.get('planiranZacetek'));
            var konec = moment(model.get('planiranKonec'));
            var uk = konec.unix();
            var uz = zacetek.unix();
            var pol = (uk - uz) / 2;
            var polovica = moment(zacetek).add(pol, 'second').toISOString();

            model.set('planiranKonec', polovica);
            novModel.set('planiranZacetek', polovica);
            novModel.set('planiranKonec', konec.toISOString());
            novModel.set('id', null);

            this.collection.add(novModel);
            this.collection.add(model);

            this.trigger('razdeljen:TS');
        },
        addChild: function (child, ChildView, index) {
            var podrocje = child.get('alternacija.funkcija.tipFunkcije.podrocje');

            for (var key in this.podrocja) {
                if (this.podrocja[key] === podrocje) {
                    Marionette.CollectionView.prototype.addChild.apply(this, arguments);
                    break;
                } else if (child.get('sodelujoc') && this.podrocja[key] === 'sodelujoc') {
                    Marionette.CollectionView.prototype.addChild.apply(this, arguments);
                    break;
                } else if (child.get('gost') && this.podrocja[key] === 'gost') {
                    Marionette.CollectionView.prototype.addChild.apply(this, arguments);
                    break;
                } else if (child.get('dezurni') && this.podrocja[key] === 'dezurni') {
                    Marionette.CollectionView.prototype.addChild.apply(this, arguments);
                    break;
                }
            }
        }
    });
    var SeznamSodelujocihView = Marionette.LayoutView.extend({
        className: 'seznam-sodelujocih',
        template: sodelujociTpl,
        naslov: 'Naslov',
        regions: {
            toolbarR: '.region-toolbar',
            sodelujociR: '.region-sodelujoci'
        }
    });

    /**
     * 
     * @param {Object} options
     * @param {Collection} options.collection  collection modelov za prikaz v seznamu
     * @returns {undefined}
     */
    SeznamSodelujocihView.prototype.serializeData = function () {
        return {
            naslov: this.naslov
        };
    };
    SeznamSodelujocihView.prototype.initialize = function (options) {
        this.collection = options.collection || new Backbone.Collection();
        this.naslov = options.naslov || this.naslov;
        this.childView = options.childView || this.childView;
        this.podrocja = options.podrocja || this.podrocja;
    };
    /**
     * 
     * @returns {undefined}
     */
    SeznamSodelujocihView.prototype.onRender = function () {
        this.renderToolbar();
        this.renderSodelujoci();
    };

    SeznamSodelujocihView.prototype.renderToolbar = function () {
        var groups = [[
                {
                    id: 'sodelujoci-uredi',
                    icon: 'fa fa-pencil-square-o',
                    element: 'button-trigger',
                    trigger: 'uredi'
                },
                {
                    id: 'sodelujoci-termin',
                    icon: 'fa fa-calendar',
                    element: 'button-trigger',
                    trigger: 'uredi:termin'
                }
            ]];

        var toolbarView = new Toolbar({
            buttonGroups: groups,
            listener: this
        });

        this.toolbarR.show(toolbarView);

    };
    SeznamSodelujocihView.prototype.renderSodelujoci = function () {
        var sodelujociView = new SodelujociView({
            collection: this.collection,
            childView: this.childView,
            podrocja: this.podrocja
        });

        sodelujociView.on('razdeljen:TS', function () {
            this.trigger('razdeljen:TS');
        }, this);

        this.sodelujociR.show(sodelujociView);
    };

    /**
     * Sprožimo uredi in pošljemo jquery element gumba kot parameter
     * @returns {undefined}
     */
    SeznamSodelujocihView.prototype.onUredi = function () {
        this.trigger('uredi:seznam', this.$('.btn-toolbar'));
    };

    /**
     * Podatke v seznamu prikažemo na bolj podroben način
     * @returns {undefined}
     */
    SeznamSodelujocihView.prototype.onUrediTermin = function () {
        this.trigger('uredi:TS', this.collection);
    };

    return SeznamSodelujocihView;
});