/* 
 * Licenca GPLv3
 */
define([
    'radio',
    'i18next',
    'marionette',
    'moment',
    'app/Max/View/Toolbar',
    'template!../tpl/planiranje.tpl',
    './KoledarView',
    './DogodekModal',
    '../Model/Dogodki',
    './VajaView',
    'formSchema!vaja',
    'jquery.jsonrpc'
], function (
        Radio,
        i18next,
        Marionette,
        moment,
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

        view.on('prikazi:dogodek', this.onUredi, this);

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

    PlaniranjeView.prototype.onUredi = function (model) {
        var razred = model.get('view');

        if (razred === 'vaja') {
            this.onVaja(model);
        }
        
        this.dogodekView.on('skrij', this.onPreklici, this);
    };
    PlaniranjeView.prototype.onPreklici = function () {
        this.dogodekR.empty();
    };    

    /**
     * Klik na gumb Dodaj
     * @returns {undefined}
     */
    PlaniranjeView.prototype.onDodaj = function () {
        var self = this;

        DogodekModal({
            zacetek: moment(),
            konec: moment(),
            cb: function () {
                 self.onUredi.apply(self, arguments);
            }
        });
    };

    PlaniranjeView.prototype.onVaja = function (model) {
        var View = VajaView.extend({
            posodobiUrlNaslov: function () {
            }
        });
        var view = this.dogodekView = new View({
            model: model,
            schema: schemaVaja.toFormSchema().schema
        });

        view.on('save:success', function () {
            this.koledarView.ui.koledar.fullCalendar('refetchEvents');
        }, this);
        
        this.dogodekR.show(view);
    };

    return PlaniranjeView;
});
