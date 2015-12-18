/* 
 * Licenca GPLv3
 */

define([
    'marionette',
    'backbone',
    'moment',
    'underscore',
    'jquery',
    '../Model/Dogodki',
    '../Model/PlanerTeden',
    './PlanerTedenView',
    './PlanerTerminView',
    'template!../tpl/planer-layout.tpl'
], function (
        Marionette,
        Backbone,
        moment,
        _,
        $,
        Dogodki,
        PlanerTeden,
        PlanerTedenView,
        PlanerTerminView,
        tpl
        ) {

    /**
     * Layout za planer, ima regije za vnosno form termina in 
     * prikaz dogodkov tedna
     * 
     * @type @exp;Marionette@pro;LayoutView@call;extend
     */
    var PlanerView = Marionette.LayoutView.extend({
        template: tpl,
        regions: {
            tedenR: '.region-teden',
            terminR: '.region-termin'
        },
        initialize: function(options){
            this.datum = options.datum || moment();
        },
        onRender: function () {
            this.form = new PlanerTerminView({
                model: new Backbone.Model({
                    datum: moment(this.datum).toISOString()
                })
            });

            this.form.on('change', this.naloziDogodke, this);

            this.terminR.show(this.form);
        },
        naloziDogodke: function () {
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
                    self.collection.pretvoriVPlanerTeden(planerTeden);
                    var tedenView = new PlanerTedenView({
                        collection: planerTeden
                    });

                    self.tedenR.show(tedenView);
                }
            });
        }

    });

    return PlanerView;
});