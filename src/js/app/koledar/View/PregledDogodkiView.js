/* 
 * Licenca GPLv3
 */
define([
    'i18next',
    'moment',
    './Wizard/DodajDogodekWizardView',
    './DogodekView',
    './DogodekPredstavaView',
    './DogodekGostovanjeView',
    'template!../tpl/vaja-form.tpl',
    'template!../tpl/predstava-form.tpl',
    'template!../tpl/tehnicni-form.tpl',
    'template!../tpl/splosni-form.tpl',
    'template!../tpl/gostovanje-form.tpl',
    'formSchema!vaja',
    'formSchema!predstava',
    'formSchema!dogodekTehnicni',
    'formSchema!dogodekSplosni',
    'formSchema!gostovanje',
    './PregledView'
], function (
        i18next,
        moment,
        DodajDogodekWizardView,
        DogodekView,
        DogodekPredstavaView,
        DogodekGostovanjeView,
        vajaTpl,
        predstavaTpl,
        tehnicniTpl,
        splosniTpl,
        gostovanjeTpl,
        vajaSch,
        predstavaSch,
        tehnicniSch,
        splosniSch,
        gostovanjeSch,
        PregledView
        ) {

    var PregledDogodkiView = PregledView.extend({
        title: i18next.t('koledar.pregled')
    });

    PregledDogodkiView.prototype.urediEvent = function (model) {
        this.koledarView.ui.koledar.fullCalendar('refetchEvents');
        this.onUredi(model);
    };

    /**
     * Vhodni parameter model je razredDogodka
     * @param {type} model
     * @returns {undefined}
     */
    PregledDogodkiView.prototype.onUredi = function (model) {
        var razred = model.get('dogodek').razred;

        switch (razred) {
            case '100s':
                this.renderRazredDogodek(model, DogodekPredstavaView, predstavaSch, predstavaTpl);
                break;
            case '200s':
                this.renderRazredDogodek(model, DogodekView, vajaSch, vajaTpl);
                break;
            case '300s':
                this.renderRazredDogodek(model, DogodekGostovanjeView, gostovanjeSch, gostovanjeTpl);
                break;
            case '400s':
                this.renderRazredDogodek(model, DogodekView, splosniSch, splosniTpl);
                break;
            case '600s':
                this.renderRazredDogodek(model, DogodekView, tehnicniSch, tehnicniTpl);
                break;
        }
    };

    PregledDogodkiView.prototype.onPreklici = function () {
        this.contentR.empty();
    };

    /**
     * Klik na gumb Dodaj
     * @returns {undefined}
     */
    PregledDogodkiView.prototype.dodajEvent = function (zacetek, konec) {
        var dodajDogodekView = new DodajDogodekWizardView({
            zacetek: zacetek,
            konec: konec,
            collection: this.collection
        });

        dodajDogodekView.on('save:success', function () {
            this.renderKoledar();
        }, this);

        this.contentR.show(dodajDogodekView);
    };

    PregledDogodkiView.prototype.onDodaj = function () {
        this.dodajEvent(moment(), moment().add('hours', 1));
    };

    PregledDogodkiView.prototype.renderRazredDogodek = function (razredModel, TipDogView, schema, tpl) {
        var self = this;
        var view = new TipDogView({
            model: razredModel,
            schema: schema.toFormSchema().schema,
            formTemplate: tpl
        });

        view.on('save:success', function () {
            self.koledarView.ui.koledar.fullCalendar('refetchEvents');
        }, self);

        view.on('destroy:success', function () {
            self.koledarView.ui.koledar.fullCalendar('refetchEvents');
        }, self);
        view.on('skrij', self.onPreklici, self);
        self.contentR.show(view);

    };

    return PregledDogodkiView;
});
