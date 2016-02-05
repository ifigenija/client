/* 
 * Licenca GPLv3
 */
define([
    'i18next',
    'backbone',
    'marionette',
    'moment',
    'app/bars',
    '../../Model/OptionsProstorTipVaje',
    './WizardVajaView',
    './WizardTehnicniView',
    './WizardSplosniView',
    './WizardPredstavaView',
    './WizardGostovanjeView',
    './IzbiraRazredDogodkaView'
], function (
        i18next,
        Backbone,
        Marionette,
        moment,
        Handlebars,
        optionsProstorTipVaje,
        WizardVajaView,
        WizardTehnicniView,
        WizardSplosniView,
        WizardPredstavaView,
        WizardGostovanjeView,
        IzbiraRazredDogodkaView
        ) {
    var DodajDogodekWizardView = Marionette.LayoutView.extend({
        className: 'dodaj-dogodek',
        template: Handlebars.compile('<div class="dodaj-dogodek-vsebina"></div>'),
        regions: {
            contentR: '.dodaj-dogodek-vsebina'
        }
    });

    DodajDogodekWizardView.prototype.initialize = function (options) {
        this.model = new Backbone.Model();
        this.model.set('zacetek', moment(options.zacetek).toISOString());
        this.model.set('konec', moment(options.konec).toISOString());
    };

    DodajDogodekWizardView.prototype.onRender = function () {
        this.renderIzbiraRazredaDogodka();
    };
    DodajDogodekWizardView.prototype.renderWizardView = function (model) {
        var self = this;

        //views options so option za vsak korakView posebaj določene
        optionsProstorTipVaje(function (prostori, tipiVaj) {
            var wizardView;
            var razred = model.get('razred');
            switch (razred) {
                case '100s':
                    wizardView = new WizardPredstavaView({
                        model: model,
                        viewsOptions: [
                            {},
                            {},
                            {schemaOptions: prostori}
                        ]
                    });
                    break;
                case '200s':
                    wizardView = new WizardVajaView({
                        model: model,
                        viewsOptions: [
                            {},
                            {},
                            {schemaOptions: tipiVaj},
                            {schemaOptions: prostori}
                        ]
                    });
                    break;
                case '300s':
                    wizardView = new WizardGostovanjeView({
                        model: model,
                        viewsOptions: [
                            {},
                            {},
                            {}
                        ]
                    });
                    break;
                case '400s':
                    wizardView = new WizardSplosniView({
                        model: model,
                        title: i18next.t('dogodek.dodajSplosni'),
                        viewsOptions: [
                            {},
                            {schemaOptions: prostori},
                            {izberiOsebe: false}
                        ]
                    });
                    break;
                case '600s':
                    wizardView = new WizardTehnicniView({
                        model: model,
                        title: i18next.t('dogodek.dodajTehnicni'),
                        viewsOptions: [
                            {},
                            {
                                schemaOptions: prostori,
                                izberiProstor: false
                            },
                            {}
                        ]
                    });
                    break;
            }

            wizardView.on('close', function () {
                self.contentR.empty();
            }, self);

            wizardView.on('preklici', function () {
                self.contentR.empty();
            }, self);
            wizardView.on('save:success', function (model) {
                this.options.collection.add(model);
                this.trigger('save:success');
            }, self);

            self.contentR.show(wizardView);
        });
    };

    DodajDogodekWizardView.prototype.renderIzbiraRazredaDogodka = function () {
        var izbiraView = new IzbiraRazredDogodkaView({model: this.model});
        izbiraView.on('preklici', function () {
            this.contentR.empty();
        }, this);

        izbiraView.on('izbrano', this.renderWizardView, this);
        this.contentR.show(izbiraView);
    };

    return DodajDogodekWizardView;
});