/* 
 * Licenca GPLv3
 */

define([
    'marionette',
    'backbone',
    'moment',
    '../Model/Dogodki',
    '../Model/PlanerTeden',
    './PlanerTedenView',
    './PlanerIzbiraDatumaView',
    'app/Max/View/Toolbar',
    'template!../tpl/planer-layout.tpl',
    'moment',
    'i18next',
    'options!dogodek.barve'
], function (
        Marionette,
        Backbone,
        moment,
        Dogodki,
        PlanerTeden,
        PlanerTedenView,
        PlanerIzbiraDatumaView,
        Toolbar,
        tpl,
        moment,
        i18next,
        barve
        ) {

    /**
     * Layout za planer, ima regije za vnosno form termina in 
     * prikaz dogodkov tedna
     * 
     * @type @exp;Marionette@pro;LayoutView@call;extend
     */
    var PlanerView = Marionette.LayoutView.extend({
        className: 'planer',
        template: tpl,
        regions: {
            terminR: '.region-termin',
            konfliktiR: '.region-konflikti',
            tedenR: '.region-teden',
            toolbarR: '.region-toolbar'
        },
        serializeData: function () {
            return {
                barve: barve
            };
        }
    });
    /*
     * 
     * @param {Object} options
     * @param {DateString} options.datum        V kolikor želimo odpreti planer na določen datum v nasprotnem primeru se vzame današnji dan
     * @returns {undefined}
     */
    PlanerView.prototype.initialize = function (options) {
        this.datum = options.datum || moment();
    };
    //izrišemo PlanerIzbiraDatumaView, ko proži view change se naložijo še dogodki
    PlanerView.prototype.onRender = function () {
        this.form = new PlanerIzbiraDatumaView({
            model: new Backbone.Model({
                datum: moment(this.datum).toISOString()
            })
        });

        this.renderToolbar();

        this.form.on('change', this.naloziDogodke, this);

        this.terminR.show(this.form);
    };

    PlanerView.prototype.renderToolbar = function (options) {
        var groups = [[
                {
                    id: 'planer-natisni',
                    label: i18next.t('std.tiskanje'),
                    element: 'button-trigger',
                    trigger: 'natisni'
                }
            ]];

        var toolbarView = new Toolbar({
            buttonGroups: groups,
            listener: this
        });

        this.toolbarR.show(toolbarView);
    };

    /**
     * Funkcija naloži evente v fullcalendar
     * V kolikor želimo druge evente vstavit v PlanerView extendamo to funkcijo
     * @returns {undefined}
     */
    PlanerView.prototype.naloziDogodke = function () {
        var datum = moment(this.form.getEditor('teden').getValue());

        var planerTeden = new PlanerTeden();
        planerTeden.initTeden(moment(datum));

        var zacetek = moment(datum).startOf('week');
        var konec = moment(datum).endOf('week');

        this.collection = new Dogodki();
        this.collection.queryParams.zacetek = zacetek.toISOString();
        this.collection.queryParams.konec = konec.toISOString();

        var self = this;
        this.collection.fetch({
            success: function () {
                planerTeden.vnesiDogodke(self.collection);
                var tedenView = new PlanerTedenView({
                    collection: planerTeden
                });

                self.tedenR.show(tedenView);
                this.$('#tedenVDnevu').html(i18next.t('koledar.teden') + ' #' + moment(datum).format('w'));
            }
        });

        this.collection.on('change', function () {
            planerTeden.vnesiDogodke(self.collection);
        }, this);
    };
    
    PlanerView.prototype.onNatisni = function () {

    };

    return PlanerView;
});