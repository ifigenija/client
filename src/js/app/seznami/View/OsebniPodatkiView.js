/* 
 * Licenca GPLv3
 */


/* 
 * Licenca GPLv3
 */
define([
    'formSchema!oseba/osebni',
    'marionette',
    'template!../tpl/osebniPodatki-form.tpl',
    'template!../tpl/osebnipodatki.tpl',
    'i18next',
    'app/Dokument/View/FormView'
], function (
        schema,
        Marionette,
        formTpl,
        tpl,
        i18next,
        FormView
        ) {


    /**
     * 
     * @type @exp;Marionette@pro;LayoutView@call;extend
     */
    var OsebniPodatkiView = Marionette.LayoutView.extend({
        template: tpl,
        className: 'row',
        schema: schema.toFormSchema().schema,
        regions: {
            regionForm: '.region-form',
            regionTrrji: '.region-trrji',
            regionNaslovi: '.region-naslovi',
            regionTelefonske: '.region-telefonske'
        }
    });

    OsebniPodatkiView.prototype.onBeforeRender = function () {
        this.listenToOnce(this.model, 'sync', function (coll) {
            this.renderForm();
            this.renderTrrji();
            this.renderNaslovi();
            this.renderTelefonske();
        });
    };

    OsebniPodatkiView.prototype.onRender = function () {
        // če model še ni naložen, ga bomo rederirali kasneje
        // v sync event handlerju. Če pa je naložen, pa 
        // ga narišemo takoj
        if (this.model.get('ime')) {
            this.renderForm();
            this.renderTrrji();
            this.renderNaslovi();
            this.renderTelefonske();
        }
    };

    /**
     * Izris forme
     * @returns {undefined}
     */
    OsebniPodatkiView.prototype.renderForm = function () {
        var Fv = FormView.extend({
            formTitle: this.model.get('polnoIme'),
            buttons: FormView.prototype.defaultButtons,
            schema: schema.toFormSchema().schema,
            formTemplate: formTpl,
            onFormChange: function (form) {
                var tb = this.getToolbarModel();
                var but = tb.getButton('doc-shrani');
                if (but.get('disabled')) {
                    but.set({
                        disabled: false
                    });
                }
            },
            prepareToolbar: function () {
                return  this.model ?
                        [[this.buttons.shrani, this.buttons.nasvet]] : [[]];

            }
        });

        var view = new Fv({
            model: this.model
        });

        this.regionForm.show(view);
        return view;
    };

    /**
     * Izris TRR
     * @returns {undefined}
     */
    OsebniPodatkiView.prototype.renderTrrji = function () {
        var self = this;
        require(['app/seznami/View/TrrView'], function (View) {
            var view = new View({
                collection: self.model.trrjiCollection,
                dokument: self.model,
                zapirajFormo: true
            });
            self.regionTrrji.show(view);
            return view;
        });
    };
    
    /**
     * Izris telefonskih
     * @returns {undefined}
     */
    OsebniPodatkiView.prototype.renderTelefonske = function () {
        var self = this;
        
        require(['app/seznami/View/TelefonskaView'], function (View) {
            var view = new View({
                collection: self.model.telefonskeCollection,
                dokument: self.model,
                zapirajFormo: true
            });
            self.regionTelefonske.show(view);
            return view;
        });
    };

    /**
     * Izris naslovov
     * @returns {undefined}
     */
    OsebniPodatkiView.prototype.renderNaslovi = function () {
        var self = this;
        
        require(['app/seznami/View/PostniNaslovView'], function (View) {
            var view = new View({
                collection: self.model.nasloviCollection,
                dokument: self.model,
                zapirajFormo: true
            });
            self.regionNaslovi.show(view);
            return view;
        });
    };
    return OsebniPodatkiView;
});
