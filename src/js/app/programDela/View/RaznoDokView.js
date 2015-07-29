/* 
 * Licenca GPLv3
 */
define([
    'app/Dokument/View/DokumentView',
    'app/programDela/View/PESklopaView',
    'template!../tpl/razno-dokument.tpl',
    'template!../tpl/razno-form.tpl',
    'formSchema!programRazno',
    'i18next'
], function (
        DokumentView,
        PESView,
        tpl,
        formTpl,
        schema,
        i18next
        ) {

    var RaznoView = DokumentView.extend({
        template: tpl,
        formTemplate: formTpl,
        schema: schema.toFormSchema().schema,
        regions: {
            pesR: '.region-pes'
        }
    });

    /**
     * ob izrisu forme se izvede še izris postavk
     * @returns {undefined}
     */
    RaznoView.prototype.onRenderForm = function () {
        if (!this.model.isNew()) {
            this.renderPES();
        }
    };

    /**
     * izris postavke programskaEnotaSklopa
     * @returns {undefined}
     */
    RaznoView.prototype.renderPES = function () {
        var view = new PESView({
            collection: this.model.peSklopiCollection,
            dokument: this.model
        });

        this.pesR.show(view);
    };


    return RaznoView;
});