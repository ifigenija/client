/*
 * Licenca GPLv3
 */


define([
    'radio',
    'i18next',
    '../../Model/Dogodki',
    './WizardView',
    './IzbiraCasDeltaCasView',
    './IzbiraProstoraView',
    './IzbiraUprizoritveView'
], function (
        Radio,
        i18next,
        Dogodki,
        WizardView,
        IzbiraCasDeltaCasView,
        IzbiraProstoraView,
        IzbiraUprizoritveView
        ) {

    var WizardPredstavaView = WizardView.extend({
        views: [
            IzbiraCasDeltaCasView,
            IzbiraUprizoritveView,
            IzbiraProstoraView
        ],
        title: i18next.t('dogodek.dodajPredstavo'),
        callback: function (model) {
            var self = this;
            model.save({}, {
                success: function () {
                    Radio.channel('error').command('flash', {message: 'Uspešno shranjeno', code: 0, severity: 'success'});
                    var Dogodek = Dogodki.prototype.model.extend({});
                    self.trigger('save:success', new Dogodek(model.get('dogodek')));
                },
                error: Radio.channel('error').request('handler', 'xhr')
            });
        }
    });

    return WizardPredstavaView;
});