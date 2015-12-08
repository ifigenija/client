/* 
 * Licenca GPLv3
 */
define([
    'radio',
    'i18next',
    'backbone',
    'underscore',
    'app/bars',
    'marionette',
    'jquery',
    'app/Max/View/Toolbar',
    'template!../tpl/planiranje.tpl',
    './KoledarViewN',
    './DogodekModal',
    '../Model/Dogodki',
    './VajaView',
    'formSchema!vaja',
    'jquery.jsonrpc'
], function (
        Radio,
        i18next,
        Backbone,
        _,
        Handlebars,
        Marionette,
        $,
        Toolbar,
        tpl,
        KoledarView,
        DogodekModal,
        Collection,
        VajaView,
        schemaVaja
        ) {

    var PlaniranjeView = Marionette.LayoutView.extend({
        template: tpl,
        regions: {
            dogodekR: '.planiranje-region-dogodek',
            koledarR: '.planiranje-region-koledar',
            toolbarR: '.planiranje-region-toolbar'
        }
    });

    PlaniranjeView.prototype.initialize = function (options) {
        this.template = options.template || this.template;
    };

    PlaniranjeView.prototype.onRender = function () {
        this.renderKoledar();
        this.renderToolbar();
    };
    /**
     * izris koledarja
     * @returns {undefined}
     */
    PlaniranjeView.prototype.renderKoledar = function () {
        var coll = new Collection();

        var view = this.koledarView = new KoledarView({
            collection: coll
        });

        view.on('select', this.onDodaj, this);

        this.koledarR.show(view);
    };

    PlaniranjeView.prototype.renderToolbar = function () {
        var groups = [[
                {
                    id: 'planiranje-dodaj',
                    label: i18next.t('std.dodaj'),
                    element: 'button-trigger',
                    trigger: 'dodaj'
                }
            ]];

        var toolbarView = new Toolbar({
            buttonGroups: groups,
            listener: this
        });

        this.toolbarR.show(toolbarView);
    };

    PlaniranjeView.prototype.renderDogodek = function (model) {
        var razred = model.get('model');

        if (razred === 'vaja') {
            this.onVaja(model);
        }
    };

    /**
     * Klik na gumb Dodaj
     * @returns {undefined}
     */
    PlaniranjeView.prototype.onDodaj = function (array) {
//        var self = this;
//
//        DogodekModal({
//            zacetek: array[0] ? array[0].format() : moment(),
//            konec: array[1] ? array[1].format() : moment(),
//            cb: function () {
//                 self.renderDogodek.apply(self, arguments);
//            }
//        });
    };

    PlaniranjeView.prototype.onVaja = function (model) {
        var View = VajaView.extend({
            posodobiUrlNaslov: function () {
            }
        });
        var view = new View({
            model: model,
            schema: schemaVaja.toFormSchema().schema
        });

        view.on('save:success', function () {
            this.koledarView.ui.koledar.fullCalendar('refetchEvents');
        }, this);

        view.on('skrij', function () {
            this.koledarView.dogodekR.empty();
        }, this);
        
        this.dogodekR.show(view);
    };

    return PlaniranjeView;
});
