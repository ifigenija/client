/* 
 * Licenca GPLv3
 */
define([
    'marionette',
    'backbone',
    'radio',
    'i18next',
    'baseUrl',
    'app/Dokument/View/DokumentView',
    'template!../tpl/pd-dokument.tpl',
    'template!../tpl/pd-form.tpl',
    'formSchema!programDela'
], function (
        Marionette,
        Backbone,
        Radio,
        i18next,
        baseUrl,
        DokumentView,
        dokumentTpl,
        formTpl,
        formSchema
        ) {

    var ch = Radio.channel('layout');

    var PdDokumentView = DokumentView.extend({
        template: dokumentTpl,
        formTemplate: formTpl,
        schema: formSchema.toFormSchema().schema,
        regions: {
            premiereR: '.region-premiere',
            ponovitveR: '.region-ponovitve',
            gostovanjaR: '.region-gostovanja',
            gostujociR: '.region-gostujoci',
            izjemniR: '.region-izjemni',
            festivaliR: '.region-festivali'
        }
    });

    PdDokumentView.prototype.onRender = function () {
        if (this.model.get('id')) {
            this.onPremiera();
            this.onPonovitev();
            this.onGostovanje();
            this.onGostujoca();
            this.onIzjemna();
            this.onFestival();
        }
    };

    /**
     * Izris premier
     * @returns {undefined}
     */
    PdDokumentView.prototype.onPremiera = function () {
        var self = this;
        require(['app/programDela/View/PremieraView'], function (View) {
            var view = new View({
                collection: self.model.premiereCollection,
                dokument: self.model
            });
            self.premiereR.show(view);
            return view;
        });
    };
    /**
     * Izris ponovitev
     * @returns {undefined}
     */
    PdDokumentView.prototype.onPonovitev = function () {
        var self = this;
        require(['app/programDela/View/PonovitevView'], function (View) {
            var view = new View({
                collection: self.model.ponovitveCollection,
                dokument: self.model
            });
            self.ponovitveR.show(view);
            return view;
        });
    };
    /**
     * Izris gostovanj
     * @returns {undefined}
     */
    PdDokumentView.prototype.onGostovanje = function () {
        var self = this;
        require(['app/programDela/View/GostovanjeView'], function (View) {
            var view = new View({
                collection: self.model.gostovanjaCollection,
                dokument: self.model
            });
            self.gostovanjaR.show(view);
            return view;
        });
    };
    /**
     * Izris gostujoci
     * @returns {undefined}
     */
    PdDokumentView.prototype.onGostujoca = function () {
        var self = this;
        require(['app/programDela/View/GostujocaView'], function (View) {
            var view = new View({
                collection: self.model.gostujociCollection,
                dokument: self.model
            });
            self.gostujociR.show(view);
            return view;
        });
    };
    /**
     * Izris izjemnih uprizoritev
     * @returns {undefined}
     */
    PdDokumentView.prototype.onIzjemna = function () {
        var self = this;
        require(['app/programDela/View/IzjemnaView'], function (View) {
            var view = new View({
                collection: self.model.izjemniCollection,
                dokument: self.model
            });
            self.izjemniR.show(view);
            return view;
        });
    };
    /**
     * Izris izjemnih uprizoritev
     * @returns {undefined}
     */
    PdDokumentView.prototype.onFestival = function () {
        var self = this;
        require(['app/programDela/View/FestivalView'], function (View) {
            var view = new View({
                collection: self.model.festivaliCollection,
                dokument: self.model
            });
            self.festivaliR.show(view);
            return view;
        });
    };

    return PdDokumentView;
});