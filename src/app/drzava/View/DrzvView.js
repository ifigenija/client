define([
    'underscore',
    'app/Dokument/View/DokumentView',
    './PostavkaDrzavaView',
    'text!../tpl/drzv-form.tpl',
    'text!../tpl/drzv.tpl'
], function (
        _,
        DokumentView,
        PostavkaDrzavaView,
        formTpl,
        tpl
        ) {

    var DrzvView = DokumentView.extend({
        template: _.template(tpl),
        formTemplate: _.template(formTpl),
        regions: {
            regionMateriali: '.region-drzave'
        }
    });


    DrzvView.prototype.getNaslov = function () {
        return this.isNew() ?
                'Nova Drzava' : 'Drzava ' + this.getStevilka();
    };

    DrzvView.prototype.onRenderForm = function () {
        if (!this.isNew()) {
            this.renderDrzave();
        }
    };

    /**
     * Render materialov
     */
    DrzvView.prototype.renderDrzave = function () {
        var drzave = new PostavkaDrzavaView({
            collection: this.model.drzaveCollection,
            dokument: this.model
        });

        this.regionDrzave.show(drzave);
        return drzave;
    };

    DrzvView.prototype.onDrzave = function () {
    };



    return DrzvView;
});