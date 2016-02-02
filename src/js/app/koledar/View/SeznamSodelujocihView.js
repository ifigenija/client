/*
 * Licenca GPLv3
 */

define([
    'backbone',
    'underscore',
    'app/bars',
    'marionette',
    'app/Max/View/Toolbar',
    'template!../tpl/seznamSodelujoci.tpl',
    'bootstrap'
], function (
        Backbone,
        _,
        Handlebars,
        Marionette,
        Toolbar,
        sodelujociTpl
        ) {

    var Popover = Marionette.LayoutView.extend({
        template: Handlebars.compile('<a class="btn btn-default gumb-razdeli">{{t "std.razdeli" }}</a><a class="btn btn-default gumb-brisi">{{t "std.brisi" }}</a>'),
        triggers:{
            'click .gumb-brisi' : 'brisi',
            'click .gumb-razdeli' : 'razdeli'
        },
        initialize: function(options){
            this.model = options.model;
        },
        onBrisi: function(){
            this.model.destroy();
            console.log('brisi');
        },
        onRazdeli: function(){
            console.log('razdeli');
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

            this.ui.sodelujoc.popover({
                html: true,
                title: 'this.Header',
                content: popover.el || "",
                placement: 'bottom' || "bottom",
                trigger: this.Trigger || "click",
                delay: this.Delay || 0
            });
        }
    });

    var SodelujociView = Marionette.CollectionView.extend({
        className: 'sodelujoci',
        childView: SodelujocView,
        initialize: function (options) {
            this.childView = options.childView || this.childView;
        }
    });
    var SeznamSodelujocihView = Marionette.LayoutView.extend({
        className: '',
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
            childView: this.childView
        });

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