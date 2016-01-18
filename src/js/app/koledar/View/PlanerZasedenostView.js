/* 
 * Licenca GPLv3
 */

define([
    'backbone',
    'marionette',
    'moment',
    'underscore',
    'jquery',
    './PlanerView',
    '../Model/PlanerTeden',
    './PlanerTedenView'
], function (
        Backbone,
        Marionette,
        moment,
        _,
        $,
        PlanerView,
        TerminiStoritve,
        PlanerTeden,
        PlanerTedenView
        ) {

//WIP
    var PlanerZasedenostView = PlanerView.extend({});

    PlanerZasedenostView.prototype.naloziDogodke = function () {
        var datum = moment(this.form.getEditor('teden').getValue());

        var planerTeden = new PlanerTeden();
        planerTeden.initTeden(moment(datum));

        var zacetek = moment(datum).startOf('week');
        var konec = moment(datum).endOf('week');

        this.collection = new TerminiStoritve();
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

    };

    return PlanerZasedenostView;
});