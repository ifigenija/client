define([
    'app/Dokument/View/DokumentView',
    'app/Max/Module/Backgrid',
    './OsebaTrrView',
    'template!../tpl/oseba-form.tpl',
    'template!../tpl/oseba-tab.tpl'
], function (
        DokumentView,
        Backgrid,
        OsebaTrrView,
        osebaFormTpl,
        osebaTabTpl
        ) {

    var OsebaTabView = DokumentView.extend({
        template: osebaTabTpl,
        formTemplate: osebaFormTpl,
        regions: {
            ttrR: '.region-trr',
            postniNasloviR: '.region-postniNaslovi',
            telefonskeR: '.region-telefonske'
        }
    });


    OsebaTabView.prototype.getNaslov = function () {
        return this.isNew() ?
                'Nova oseba' : 'Oseba ' + this.getStevilka();
    };

    OsebaTabView.prototype.onRenderForm = function () {

        if (!this.isNew()) {
            this.renderTrr();
        }
    };

    /**
     * Render materialov
     */
    OsebaTabView.prototype.renderTrr = function () {
        var trr = new OsebaTrrView({
            collection: this.model.trrCollection,
            dokument: this.model
        });

        this.regionTrr.show(trr);
        return trr;
    };



    return OsebaTabView;
});